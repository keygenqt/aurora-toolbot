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
import { setData as setPsdkInstalled } from '../../store/impl/psdkInstalled';
import { setData as setPsdkAvailable } from '../../store/impl/psdkAvailable';
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

import { OpenInNew, Done, Download, InstallDesktop } from '@mui/icons-material';

import { setEffectStateBool, AppUtils, CardGradient, MainDialog } from '../../base';
import { Methods } from '../../modules';
import { ListLayout } from '../../layouts';

export function PsdksAvailablePage(props) {
    // components
    const theme = useTheme();
    const { t } = useTranslation();
    const dispatch = useDispatch();
    // data
    const reduxKey = keysStateBool.psdksUpdate;
    // states
    const [isDialogDownload, setIsDialogDownload] = React.useState(false);
    const [isDialogInstall, setIsDialogInstall] = React.useState(false);
    const [dialogProgress, setDialogProgress] = React.useState(undefined);
    const [dialogState, setDialogState] = React.useState('default');
    const [dialogBody, setDialogBody] = React.useState(undefined);
    // redux
    const psdkInstalled = useSelector((state) => state.psdkInstalled.value);
    const psdkAvailable = useSelector((state) => state.psdkAvailable.value);
    // fun
    const updateStates = async () => {
        setEffectStateBool(dispatch, reduxKey, true);
        await new Promise(r => setTimeout(r, 400)); // animation delay
        dispatch(setPsdkInstalled(await Methods.psdk_info()));
        dispatch(setPsdkAvailable(await Methods.psdk_available()));
        setEffectStateBool(dispatch, reduxKey, false);
    };
    // page
    return (
        <>
            <MainDialog
                icon={InstallDesktop}
                color={'primaryPsdk'}
                title={t('psdksAvailable.t_dialog_install_title')}
                body={dialogBody}
                state={dialogState}
                open={isDialogInstall}
                progress={dialogProgress}
                onClickBtn={async () => {
                    setIsDialogInstall(false);
                    // Delay close
                    await new Promise(r => setTimeout(r, 200));
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
                color={'primaryPsdk'}
                title={t('psdksAvailable.t_dialog_download_title')}
                body={dialogBody}
                state={dialogState}
                open={isDialogDownload}
                progress={dialogProgress}
                onClickBtn={async () => {
                    // Hide dialog
                    setIsDialogDownload(false);
                    // Delay before clear
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
                models={psdkAvailable}
                updateStates={updateStates}
                reduxKey={reduxKey}
                itemList={(model) => {
                    const isInstall = AppUtils.isInstall(psdkInstalled, model, (i, a) => {
                        return i.version_id == a.version_full;
                    });
                    const color = isInstall ? theme.palette.primary.main : theme.palette.primaryPsdk.main;
                    let urlRepo = model.urls[0].split('/').slice(0, -1).join('/');
                    let arches = []
                    for (const url of model.urls) {
                        if (url.includes('Target')) {
                            try {
                                arches.push(url.split('-').filter((e) => e.includes('tar'))[0].split('.')[0])
                            } catch (e) { }
                        }
                    }
                    return (
                        <CardGradient color={color}>
                            <CardHeader
                                avatar={isInstall && (
                                    <Avatar sx={{ bgcolor: color }} aria-label="recipe">
                                        <Done color={'white'} />
                                    </Avatar>
                                )}
                                title={`Platform SDK`}
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
                                    {t('psdksAvailable.t_text')}
                                </Typography>
                            </CardContent>
                            <CardActions sx={{
                                p: 2,
                                paddingTop: 0
                            }}>
                                <Chip
                                    icon={<FontAwesomeIcon icon="fa-solid fa-microchip" />}
                                    label={`${arches.join(", ")}`}
                                />
                                <Box sx={{ flexGrow: 1 }} />
                                {!isInstall && (
                                    <Tooltip title={t('common.t_install')} placement="left-start">
                                        <IconButton
                                            onClick={async () => {
                                                setDialogProgress(-1);
                                                setIsDialogInstall(true);
                                                setDialogBody(t('psdksAvailable.t_dialog_install_body'));
                                                try {
                                                    await Methods.psdk_install_by_id(model.id);
                                                    setDialogState('success');
                                                    setDialogBody(t('psdksAvailable.t_dialog_install_body_success'));
                                                    setDialogProgress(100);
                                                } catch (e) {
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
                                                    await Methods.psdk_download_by_id(model.id);
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

                                <Tooltip title={t('common.t_open_repo')} placement="left-start">
                                    <IconButton
                                        onClick={async () => {
                                            await AppUtils.openUrl(urlRepo);
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

PsdksAvailablePage.propTypes = {};
