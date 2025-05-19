/**
 * Copyright 2025 Vitaliy Zarubin
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import * as React from 'react';
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useSelector, useDispatch } from 'react-redux';
import { setData as setFlutterInstalled } from '../../store/impl/flutterInstalled';
import { setData as setFlutterAvailable } from '../../store/impl/flutterAvailable';
import { keysStateBool } from '../../store/impl/stateBool';

import {
    useTheme,
    Typography,
    CardContent,
    CardHeader,
    CardActions,
    Chip,
    Box,
    Tooltip,
    IconButton,
    Avatar,
} from '@mui/material';

import { OpenInNew, Done, InsertLink, Download, InstallDesktop } from '@mui/icons-material';

import {
    setEffectStateBool,
    AppUtils,
    CardGradient,
    AlertDialog,
    ProgressDialog,
} from '../../base';
import { Methods } from '../../modules';
import { ListLayout } from '../../layouts';

export function FluttersAvailablePage(props) {
    // components
    const theme = useTheme();
    const { t } = useTranslation();
    const dispatch = useDispatch();
    // data
    const reduxKey = keysStateBool.fluttersUpdate;
    // states
    const [downloadProgress, setDownloadProgress] = React.useState(null);
    const [downloadDone, setDownloadDone] = React.useState(false);
    const [downloadError, setDownloadError] = React.useState(false);
    const [downloadCancel, setDownloadCancel] = React.useState(false);
    const [installProgress, setInstallProgress] = React.useState(null);
    const [installProgressState, setInstallProgressState] = React.useState(null);
    const [installError, setInstallError] = React.useState(false);
    const [installCancel, setInstallCancel] = React.useState(false);
    // redux
    const flutterInstalled = useSelector((state) => state.flutterInstalled.value);
    const flutterAvailable = useSelector((state) => state.flutterAvailable.value);
    // fun
    const updateStates = async () => {
        setEffectStateBool(dispatch, reduxKey, true);
        dispatch(setFlutterInstalled(await Methods.flutter_info()));
        dispatch(setFlutterAvailable(await Methods.flutter_available()));
        setEffectStateBool(dispatch, reduxKey, false);
    };
    // page
    return (
        <>
            {/* Download */}
            <AlertDialog
                title={t('fluttersAvailable.t_download_dialog_title')}
                body={t('fluttersAvailable.t_download_dialog_success_body')}
                agreeText={'Ok'}
                agree={() => { }}
                open={downloadDone}
                onClose={() => {
                    setDownloadDone(false)
                }}
            />
            <AlertDialog
                title={t('fluttersAvailable.t_download_dialog_title')}
                body={t('fluttersAvailable.t_download_dialog_error_body')}
                agreeText={'Ok'}
                agree={() => { }}
                open={downloadError && !downloadCancel}
                onClose={() => {
                    setDownloadError(false)
                }}
            />
            <ProgressDialog
                title={t('fluttersAvailable.t_download_dialog_title')}
                body={t('fluttersAvailable.t_download_dialog_progress_body')}
                progress={downloadProgress}
                open={downloadProgress !== null}
                onClose={async () => {
                    setDownloadCancel(true);
                    await Methods.restart_dbus();
                    setDownloadError(false);
                    setDownloadCancel(false);
                }}
            />
            {/* Install */}
            <AlertDialog
                title={t('fluttersAvailable.t_install_dialog_title')}
                body={t('fluttersAvailable.t_install_dialog_error_body')}
                agreeText={'Ok'}
                agree={() => { }}
                open={installError && !installCancel}
                onClose={() => {
                    setInstallError(false)
                }}
            />
            <ProgressDialog
                title={t('fluttersAvailable.t_install_dialog_title')}
                body={installProgressState}
                progress={installProgress}
                open={installProgress !== null}
                onClose={installProgress === 100 ? null : async () => {
                    setInstallCancel(true);
                    await Methods.restart_dbus();
                    setInstallError(false);
                    setInstallCancel(false);
                }}
            />
            <ListLayout
                models={flutterAvailable}
                updateStates={updateStates}
                reduxKey={reduxKey}
                itemList={(model) => {
                    const isInstall = AppUtils.isInstall(flutterInstalled, model, (i, a) => {
                        return i.flutter_version == a.version;
                    });
                    const color = isInstall ? theme.palette.primary.main : theme.palette.primaryFlutter.main;
                    return (
                        <CardGradient color={color}>
                            <CardHeader
                                avatar={isInstall && (
                                    <Avatar sx={{ bgcolor: color }} aria-label="recipe">
                                        <Done color={'white'} />
                                    </Avatar>
                                )}
                                title={`Flutter SDK`}
                                subheader={`v${model.version}`}
                                sx={{
                                    paddingBottom: 0,
                                    '& .MuiCardHeader-title': {
                                        paddingBottom: 0.5,
                                    }
                                }}
                            />
                            <CardContent>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    {t('fluttersAvailable.t_text')}
                                </Typography>
                            </CardContent>
                            <CardActions sx={{
                                p: 2,
                                paddingTop: 0
                            }}>
                                <Chip
                                    icon={<FontAwesomeIcon icon="fa-solid fa-tag" />}
                                    label={model.tag}
                                />
                                <Box sx={{ flexGrow: 1 }} />

                                {!isInstall && (
                                    <Tooltip title={t('common.t_install')} placement="left-start">
                                        <IconButton
                                            onClick={async () => {
                                                const unlisten = await Methods.dbus_state_listen((state) => {
                                                    if (state.state == 'Progress') {
                                                        setInstallProgress(parseInt(state.message));
                                                        return;
                                                    }
                                                    if (state.state == 'Info') {
                                                        setInstallProgress(100)
                                                        return;
                                                    }
                                                    setInstallProgressState(AppUtils.formatMessage(state.message));
                                                })
                                                if (unlisten) {
                                                    try {
                                                        setInstallProgress(0)
                                                        await Methods.flutter_install_by_id(model.id);
                                                        await unlisten();
                                                        setInstallProgress(null);
                                                        setInstallProgressState(null);
                                                        await updateStates();
                                                    } catch (e) {
                                                        await unlisten();
                                                        setInstallProgress(null);
                                                        setInstallProgressState(null);
                                                        setInstallError(true);
                                                    }
                                                } else {
                                                    setInstallError(true);
                                                }
                                            }}
                                        >
                                            <InstallDesktop />
                                        </IconButton>
                                    </Tooltip>
                                )}

                                <Tooltip title={t('common.t_download')} placement="left-start">
                                    <IconButton
                                        onClick={async () => {
                                            const unlisten = await Methods.dbus_state_listen((state) => {
                                                if (state.state == 'Progress') {
                                                    setDownloadProgress(parseInt(state.message));
                                                }
                                            })
                                            if (unlisten) {
                                                try {
                                                    setDownloadProgress(0)
                                                    await Methods.flutter_download_by_id(model.id);
                                                    await unlisten();
                                                    setDownloadProgress(null);
                                                    setDownloadDone(true);
                                                } catch (e) {
                                                    await unlisten();
                                                    setDownloadProgress(null);
                                                    setDownloadError(true);
                                                }
                                            } else {
                                                setDownloadError(true);
                                            }
                                        }}
                                    >
                                        <Download />
                                    </IconButton>
                                </Tooltip>

                                <Tooltip title={t('common.t_link_to_file')} placement="left-start">
                                    <IconButton
                                        onClick={async () => {
                                            if (model.urlRepo) {
                                                await AppUtils.openUrl(model.url_repo);
                                            } else {
                                                await AppUtils.openUrl(model.url_zip);
                                            }
                                        }}
                                    >
                                        <InsertLink />
                                    </IconButton>
                                </Tooltip>

                                <Tooltip title={t('common.t_open_repo')} placement="left-start">
                                    <IconButton
                                        onClick={async () => {
                                            await AppUtils.openUrl(model.url_gitlab);
                                        }}
                                    >
                                        <OpenInNew />
                                    </IconButton>
                                </Tooltip>

                            </CardActions>
                        </CardGradient>
                    )
                }}
            />
        </>
    );
}

FluttersAvailablePage.propTypes = {};
