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
import { useLocation } from "react-router";

import {
    useTheme,
    Box,
    CardHeader,
    Avatar,
    Button,
    Typography,
    Stack,
    CircularProgress,
} from '@mui/material';

import {
    CloudDownload,
} from '@mui/icons-material';

import {
    useEffectSingleTimeout,
    AppUtils,
    CardGradient,
    MainDialog,
} from '../../base';

import { Methods } from '../../modules';
import { ListLayout } from '../../layouts';

export function DemoAppsPage(props) {
    // components
    const { t } = useTranslation();
    const theme = useTheme();
    let { state } = useLocation();

    const stateModelId = state.id;
    const stateColor = state.color;
    const stateType = state.type;

    // data
    const color = theme.palette[stateColor].main;
    // states
    const [demoApps, setDemoApps] = React.useState(undefined);
    const [isDialogInstall, setIsDialogInstall] = React.useState(false);
    const [dialogProgress, setDialogProgress] = React.useState(undefined);
    const [dialogState, setDialogState] = React.useState('default');
    const [dialogBody, setDialogBody] = React.useState(undefined);
    // fun
    const updateStates = async () => {
        setDemoApps(undefined);
        await new Promise(r => setTimeout(r, 400)); // animation delay
        setDemoApps(await Methods.demo_app_info());
    };
    // init
    useEffectSingleTimeout(async () => {
        await updateStates();
    });
    // page
    return (
        <>
            <MainDialog
                icon={CloudDownload}
                color={stateColor}
                title={t('demoApps.t_dialog_install_title')}
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
                    // Clear
                    setDialogBody(undefined);
                    setDialogState('default');
                    setDialogProgress(undefined);
                }}
            />
            <ListLayout
                models={demoApps}
                updateStates={updateStates}
                itemList={(model) => (
                    <CardGradient color={color}>
                        <CardHeader
                            sx={{
                                alignItems: 'flex-start',
                                '& .MuiTypography-root': {
                                    paddingBottom: 0.8
                                }
                            }}
                            avatar={
                                <Box sx={{ position: 'relative' }}>
                                    <Avatar sx={{ position: 'absolute' }}>
                                        <CircularProgress color={'white'} size="20px" />
                                    </Avatar>
                                    <Avatar src={model.icon}>
                                        {model.name[0]}
                                    </Avatar>
                                </Box>
                            }
                            title={model.name}
                            subheader={
                                <Stack
                                    direction={'column'}
                                    spacing={0.8}
                                >
                                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                        {model.desc}
                                    </Typography>
                                    <Box>
                                        <Button
                                            size={'small'}
                                            color={stateColor}
                                            startIcon={<CloudDownload color="default" />}
                                            variant="contained"
                                            sx={{ opacity: 0.9 }}
                                            onClick={async () => {
                                                setDialogProgress(-1);
                                                setIsDialogInstall(true);
                                                setDialogBody(t('common.t_dialog_body_connection'));
                                                let level = 1;
                                                const unlisten = await Methods.dbus_state_listen((state) => {
                                                    if (state.state == 'Progress') {
                                                        let progress = parseInt(state.message);
                                                        let percent = (progress / 2) + (level == 1 ? 0 : 50);
                                                        if (percent >= 100) {
                                                            setDialogProgress(-1);
                                                        } else {
                                                            setDialogProgress(percent);
                                                        }
                                                        if (progress === 100) {
                                                            level = 2;
                                                        }
                                                    }
                                                    if (state.state == 'State') {
                                                        setDialogBody(AppUtils.formatMessage(state.message));
                                                    }
                                                })
                                                if (unlisten) {
                                                    try {
                                                        if (stateType === 'emulator') {
                                                            await Methods.emulator_package_install_url_by_id(model.url_x86_64, stateModelId);
                                                        } else {
                                                            await Methods.device_package_install_urls_by_id([model.url_aarch64, model.url_armv7hl], stateModelId);
                                                        }
                                                        await unlisten();
                                                        await new Promise(r => setTimeout(r, 500)); // animation delay
                                                        setDialogState('success');
                                                        setDialogBody(t('demoApps.t_dialog_install_success'));
                                                        setDialogProgress(100);
                                                    } catch (e) {
                                                        await unlisten();
                                                        setDialogProgress(undefined);
                                                        setDialogState('error');
                                                        setDialogBody(t('common.t_dialog_body_error'));
                                                    }
                                                }
                                            }}
                                        >
                                            {t('common.t_install')}
                                        </Button>
                                    </Box>
                                </Stack>
                            }
                        />
                    </CardGradient>
                )}
            />
        </>
    );
}

DemoAppsPage.propTypes = {};
