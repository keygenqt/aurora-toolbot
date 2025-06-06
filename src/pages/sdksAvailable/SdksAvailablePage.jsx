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

import { setEffectStateBool, AppUtils, CardGradient, MainDialog } from '../../base';
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
    const [isDialogDownload, setIsDialogDownload] = React.useState(false);
    const [isDialogInstall, setIsDialogInstall] = React.useState(false);
    const [dialogProgress, setDialogProgress] = React.useState(undefined);
    const [dialogState, setDialogState] = React.useState('default');
    const [dialogBody, setDialogBody] = React.useState(undefined);
    // redux
    const sdkInstalled = useSelector((state) => state.sdkInstalled.value);
    const sdkAvailable = useSelector((state) => state.sdkAvailable.value);
    // fun
    const updateStates = async () => {
        setEffectStateBool(dispatch, reduxKey, true);
        await new Promise(r => setTimeout(r, 400)); // animation delay
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
                return i.version == a.version_full && i.build_type == a.build_type;
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
            <MainDialog
                icon={InstallDesktop}
                color={'primarySdk'}
                title={t('sdksAvailable.t_dialog_install_title')}
                body={dialogBody}
                state={dialogState}
                open={isDialogInstall}
                progress={dialogProgress}
                onClickBtn={async () => {
                    setIsDialogInstall(false);
                    // Delay close
                    await new Promise(r => setTimeout(r, 200));
                    // Cancel if progress
                    if (Boolean(dialogProgress) && dialogProgress !== 100 && dialogProgress > 0) {
                        await Methods.restart_dbus();
                    }
                    // Update state
                    if (Boolean(dialogProgress) && dialogProgress === 100 && dialogProgress > 0) {
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
                color={'primarySdk'}
                title={t('sdksAvailable.t_dialog_download_title')}
                body={dialogBody}
                state={dialogState}
                open={isDialogDownload}
                progress={dialogProgress}
                onClickBtn={async () => {
                    // Hide dialog
                    setIsDialogDownload(false);
                    // Delay close
                    await new Promise(r => setTimeout(r, 200));
                    // Cancel if progress
                    if (Boolean(dialogProgress) && dialogProgress !== 100 && dialogProgress > 0) {
                        await Methods.restart_dbus();
                    }
                    // Clear
                    setDialogBody(undefined);
                    setDialogState('default');
                    setDialogProgress(undefined);
                }}
            />
            <ListLayout
                models={sdkAvailable}
                updateStates={updateStates}
                reduxKey={reduxKey}
                itemList={(model) => {
                    const isInstall = AppUtils.isInstall(sdkInstalled, model, (i, a) => {
                        return i.version == a.version_full && i.build_type == a.build_type;
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
                                                setDialogProgress(-1);
                                                setIsDialogInstall(true);
                                                setDialogBody(t('common.t_dialog_body_connection'));
                                                const unlisten = await Methods.dbus_state_listen((state) => {
                                                    if (state.state == 'Progress') {
                                                        setDialogProgress(parseInt(state.message));
                                                        return;
                                                    }
                                                    if (state.state == 'Info') {
                                                        setDialogProgress(-1);
                                                        return;
                                                    }
                                                    setDialogBody(AppUtils.formatMessage(state.message));
                                                })
                                                if (unlisten) {
                                                    try {
                                                        const result = await Methods.sdk_install_by_id(model.id);
                                                        await unlisten();
                                                        if (result.state == "Warning") {
                                                            setDialogState('error');
                                                            setDialogBody(AppUtils.formatMessage(result.message));
                                                            setDialogProgress(undefined);
                                                        } else {
                                                            setDialogState('success');
                                                            setDialogBody(t('common.t_dialog_body_install_success'));
                                                            setDialogProgress(100);
                                                        }
                                                    } catch (e) {
                                                        await unlisten();
                                                        setDialogState('error');
                                                        setDialogBody(t('common.t_dialog_body_error'));
                                                        setDialogProgress(undefined);
                                                    }
                                                } else {
                                                    setDialogState('error');
                                                    setDialogBody(t('common.t_dialog_body_error'));
                                                    setDialogProgress(undefined);
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
                                            setDialogProgress(-1);
                                            setIsDialogDownload(true);
                                            setDialogBody(t('common.t_dialog_body_connection'));
                                            const unlisten = await Methods.dbus_state_listen((state) => {
                                                if (state.state == 'Progress') {
                                                    setDialogProgress(parseInt(state.message));
                                                    return;
                                                }
                                                if (state.state == 'Info') {
                                                    setDialogProgress(-1);
                                                    return;
                                                }
                                                setDialogBody(AppUtils.formatMessage(state.message));
                                            })
                                            if (unlisten) {
                                                try {
                                                    await Methods.sdk_download_by_id(model.id);
                                                    await unlisten();
                                                    setDialogState('success');
                                                    setDialogBody(t('common.t_dialog_body_download_success'));
                                                    setDialogProgress(100);
                                                } catch (e) {
                                                    await unlisten();
                                                    setDialogState('error');
                                                    setDialogBody(t('common.t_dialog_body_error'));
                                                    setDialogProgress(undefined);
                                                }
                                            } else {
                                                setDialogState('error');
                                                setDialogBody(t('common.t_dialog_body_error'));
                                                setDialogProgress(undefined);
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
