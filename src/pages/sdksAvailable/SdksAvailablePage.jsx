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

import { useSelector, useDispatch } from 'react-redux';
import { setData as setEmulators } from '../../store/impl/emulators';
import { setData as setSdkInstalled } from '../../store/impl/sdkInstalled';
import { setData as setSdkAvailable } from '../../store/impl/sdkAvailable';
import { keysStateBool } from '../../store/impl/stateBool';

import {
    useTheme,
    Typography,
    Box,
    CardHeader,
    CardContent,
    IconButton,
    CardActions,
    Tooltip,
    Chip,
    Avatar,
} from '@mui/material';

import {
    CloudOff,
    CloudQueue,
    InsertLink,
    OpenInNew,
    Done,
    Download,
    InstallDesktop,
} from '@mui/icons-material';

import {
    setEffectStateBool,
    AppUtils,
    CardGradient,
    AlertDialog,
    ProgressDialog,
} from '../../base';
import { Methods } from '../../modules';
import { ListLayout } from '../../layouts';

export function SdksAvailablePage(props) {
    // components
    const theme = useTheme();
    const { t } = useTranslation();
    const dispatch = useDispatch();
    // data
    const reduxKey = keysStateBool.psdksUpdate;
    // states
    const [hasInstalled, setHasInstalled] = React.useState(true);
    const [downloadProgress, setDownloadProgress] = React.useState(null);
    const [downloadDone, setDownloadDone] = React.useState(false);
    const [downloadError, setDownloadError] = React.useState(false);
    const [downloadCancel, setDownloadCancel] = React.useState(false);
    const [installProgress, setInstallProgress] = React.useState(null);
    const [installProgressState, setInstallProgressState] = React.useState(null);
    const [installError, setInstallError] = React.useState(false);
    const [installCancel, setInstallCancel] = React.useState(false);
    // redux
    const sdkInstalled = useSelector((state) => state.sdkInstalled.value);
    const sdkAvailable = useSelector((state) => state.sdkAvailable.value);
    // fun
    const updateStates = async () => {
        setEffectStateBool(dispatch, reduxKey, true);
        dispatch(setSdkInstalled(await Methods.sdk_info()));
        dispatch(setEmulators(await Methods.emulator_info()));
        dispatch(setSdkAvailable(await Methods.sdk_available()));
        setEffectStateBool(dispatch, reduxKey, false);
    };
    // update states
    React.useLayoutEffect(() => {
        let isInstall = false
        for (const modelAvailable of sdkAvailable) {
            if (AppUtils.isInstall(sdkInstalled, modelAvailable, (i, a) => {
                return i.version.split('-')[0] == a.version_full && i.version.includes(a.build_type.toLowerCase());
            })) {
                isInstall = true
                break
            }
        }
        setHasInstalled(isInstall);
    }, [sdkInstalled, sdkAvailable]);
    // page
    return (
        <>
            {/* Download */}
            <AlertDialog
                title={t('sdksAvailable.t_download_dialog_title')}
                body={t('sdksAvailable.t_download_dialog_success_body')}
                agreeText={'Ok'}
                agree={() => { }}
                open={downloadDone}
                onClose={() => {
                    setDownloadDone(false)
                }}
            />
            <AlertDialog
                title={t('sdksAvailable.t_download_dialog_title')}
                body={t('sdksAvailable.t_download_dialog_error_body')}
                agreeText={'Ok'}
                agree={() => { }}
                open={downloadError && !downloadCancel}
                onClose={() => {
                    setDownloadError(false)
                }}
            />
            <ProgressDialog
                title={t('sdksAvailable.t_download_dialog_title')}
                body={t('sdksAvailable.t_download_dialog_progress_body')}
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
                title={t('sdksAvailable.t_install_dialog_title')}
                body={t('sdksAvailable.t_install_dialog_error_body')}
                agreeText={'Ok'}
                agree={() => { }}
                open={installError && !installCancel}
                onClose={() => {
                    setInstallError(false)
                }}
            />
            <ProgressDialog
                title={t('sdksAvailable.t_install_dialog_title')}
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
                models={sdkAvailable}
                updateStates={updateStates}
                reduxKey={reduxKey}
                itemList={(model) => {
                    const isInstall = AppUtils.isInstall(sdkInstalled, model, (i, a) => {
                        return i.version.split('-')[0] == a.version_full && i.version.includes(a.build_type.toLowerCase());
                    });
                    let color = isInstall ? theme.palette.primary.main : theme.palette.primarySdk.main;
                    return (
                        <CardGradient color={color}>
                            <CardHeader
                                avatar={isInstall && (
                                    <Avatar sx={{ bgcolor: color }} aria-label="recipe">
                                        <Done color={'white'} />
                                    </Avatar>
                                )}
                                title={`Аврора SDK (${model.build_type})`}
                                subheader={`v${model.version_full}`}
                                sx={{
                                    paddingBottom: 0,
                                    '& .MuiCardHeader-title': {
                                        paddingBottom: 0.5,
                                    }
                                }}
                            />
                            <CardContent>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    {model.build_type === 'MB2' ? t('sdksAvailable.t_item_mb2') : t('sdksAvailable.t_item_bt')}
                                </Typography>
                            </CardContent>
                            <CardActions sx={{
                                p: 2,
                                paddingTop: 0
                            }}>
                                <Chip
                                    icon={model.install_type === 'Online' ? (<CloudQueue color='info' />) : (<CloudOff color='primary' />)}
                                    label={`${model.install_type} installer`}
                                />
                                <Box sx={{ flexGrow: 1 }} />
                                {!hasInstalled && (
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
                                                        await Methods.sdk_install_by_id(model.id);
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
                                                    await Methods.sdk_download_by_id(model.id);
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
                                            await AppUtils.openUrl(model.url);
                                        }}
                                    >
                                        <InsertLink />
                                    </IconButton>
                                </Tooltip>

                                <Tooltip title={t('common.t_open_repo')} placement="left-start">
                                    <IconButton
                                        onClick={async () => {
                                            await AppUtils.openUrl(model.url.split('/').slice(0, -1).join('/'));
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

SdksAvailablePage.propTypes = {};
