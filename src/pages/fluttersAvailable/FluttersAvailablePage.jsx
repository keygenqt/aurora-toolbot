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

import { setEffectStateBool, AppUtils, CardGradient, MainDialog } from '../../base';
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
    const [isDialogDownload, setIsDialogDownload] = React.useState(false);
    const [isDialogInstall, setIsDialogInstall] = React.useState(false);
    const [dialogProgress, setDialogProgress] = React.useState(undefined);
    const [dialogState, setDialogState] = React.useState('default');
    const [dialogBody, setDialogBody] = React.useState(undefined);
    // redux
    const flutterInstalled = useSelector((state) => state.flutterInstalled.value);
    const flutterAvailable = useSelector((state) => state.flutterAvailable.value);
    // fun
    const updateStates = async () => {
        setEffectStateBool(dispatch, reduxKey, true);
        await new Promise(r => setTimeout(r, 400)); // animation delay
        dispatch(setFlutterInstalled(await Methods.flutter_info()));
        dispatch(setFlutterAvailable(await Methods.flutter_available()));
        setEffectStateBool(dispatch, reduxKey, false);
    };
    // page
    return (
        <>
            <MainDialog
                icon={InstallDesktop}
                color={'primaryFlutter'}
                title={t('fluttersAvailable.t_dialog_install_title')}
                body={dialogBody}
                state={dialogState}
                open={isDialogInstall}
                progress={dialogProgress}
                onClickBtn={async () => {
                    setIsDialogInstall(false);
                    // Delay close
                    await new Promise(r => setTimeout(r, 200));
                    // Cancel if progress
                    if (Boolean(dialogProgress) && dialogProgress !== 100) {
                        await Methods.restart_dbus();
                    }
                    // Update state
                    if (Boolean(dialogProgress) && dialogProgress === 100) {
                        await updateStates();
                    }
                    // Clear
                    setDialogBody(undefined);
                    setDialogState('default');
                    setDialogProgress(undefined);
                }}
            />
            <MainDialog
                icon={Download}
                color={'primaryFlutter'}
                title={t('fluttersAvailable.t_dialog_download_title')}
                body={dialogBody}
                state={dialogState}
                open={isDialogDownload}
                progress={dialogProgress}
                onClickBtn={async () => {
                    // Hide dialog
                    setIsDialogDownload(false);
                    // Cancel if progress
                    if (Boolean(dialogProgress) && dialogProgress !== 100) {
                        await Methods.restart_dbus();
                    }
                    // Delay before clear
                    await new Promise(r => setTimeout(r, 200));
                    // Clear
                    setDialogBody(undefined);
                    setDialogState('default');
                    setDialogProgress(undefined);
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
                                                setDialogProgress(0);
                                                setIsDialogInstall(true);
                                                setDialogBody(t('common.t_dialog_body_connection'));
                                                const unlisten = await Methods.dbus_state_listen((state) => {
                                                    if (state.state == 'Progress') {
                                                        setDialogProgress(parseInt(state.message));
                                                        return;
                                                    }
                                                    if (state.state == 'Info') {
                                                        setDialogProgress(100);
                                                        return;
                                                    }
                                                    setDialogBody(AppUtils.formatMessage(state.message));
                                                })
                                                if (unlisten) {
                                                    try {
                                                        await Methods.flutter_install_by_id(model.id);
                                                        await unlisten();
                                                        setDialogState('success');
                                                        setDialogBody(t('common.t_dialog_body_install_success'));
                                                    } catch (e) {
                                                        await unlisten();
                                                        setDialogState('error');
                                                        setDialogBody(t('common.t_dialog_body_error'));
                                                    }
                                                } else {
                                                    setDialogState('error');
                                                    setDialogBody(t('common.t_dialog_body_error'));
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
                                            setDialogProgress(0);
                                            setIsDialogDownload(true);
                                            setDialogBody(t('common.t_dialog_body_connection'));
                                            const unlisten = await Methods.dbus_state_listen((state) => {
                                                if (state.state == 'Progress') {
                                                    setDialogProgress(parseInt(state.message));
                                                    return;
                                                }
                                                if (state.state == 'Info') {
                                                    setDialogProgress(100);
                                                    return;
                                                }
                                                setDialogBody(AppUtils.formatMessage(state.message));
                                            })
                                            if (unlisten) {
                                                try {
                                                    await Methods.flutter_download_by_id(model.id);
                                                    await unlisten();
                                                    setDialogProgress(100);
                                                    setDialogState('success');
                                                    setDialogBody(t('common.t_dialog_body_download_success'));
                                                } catch (e) {
                                                    await unlisten();
                                                    setDialogState('error');
                                                    setDialogBody(t('common.t_dialog_body_error'));
                                                }
                                            } else {
                                                setDialogState('error');
                                                setDialogBody(t('common.t_dialog_body_error'));
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
