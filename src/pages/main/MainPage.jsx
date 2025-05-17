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
import { useNavigate } from "react-router";

import { useSelector, useDispatch } from 'react-redux';
import { setData as setAppInfo } from '../../store/impl/appInfo';

import { Box, Stack, Typography, Button } from '@mui/material';
import { HomeRepairService, OpenInNew } from '@mui/icons-material';

import {
    useEffectSingleTimeout,
    DataImages,
    AppUtils,
    StateLoading,
    ActionRefreshState,
} from '../../base';

import { Methods } from '../../modules';
import { AppConf } from '../../conf/AppConf';
import { AppBarLayout } from '../../layouts';

export function MainPage(props) {
    // components
    const navigate = useNavigate();
    const { t } = useTranslation();
    const dispatch = useDispatch();
    // redux
    const appInfo = useSelector((state) => state.appInfo.value);
    // fun
    const updateStates = async () => {
        await AppUtils.asyncJoin(
            async () => {
                await new Promise(r => setTimeout(r, 800)); // animation delay
                try {
                    dispatch(setAppInfo(await Methods.app_info()));
                } catch(e) {
                    dispatch(setAppInfo(null));
                }
            },
        )
    };
    // init
    useEffectSingleTimeout(async () => {
        await updateStates();
    });
    // page
    return (
        <AppBarLayout actions={(
            <Stack direction={'row'} spacing={1}>
                <ActionRefreshState
                    animate={appInfo === undefined}
                    onClick={async () => {
                        dispatch(setAppInfo(undefined));
                        await updateStates();
                    }}
                />
            </Stack>
        )} >
            {appInfo === undefined ? (<StateLoading />) : (
                <Stack
                    direction="column"
                    spacing={2}
                    height={1}
                    sx={{
                        justifyContent: "space-between",
                        alignItems: "stretch",
                    }}
                >
                    <Box />
                    <Box sx={{ textAlign: 'center' }}>
                        <img
                            style={{ width: '100%', maxWidth: '180px', maxHeight: '180px' }}
                            src={DataImages.icon}
                            alt='Icon' />
                    </Box>
                    <Typography
                        variant={'h5'}
                        sx={{
                            maxWidth: 375,
                            margin: '0 auto !important',
                            fontWeight: 'bold',
                            color: 'primary.main',
                            textAlign: "center"
                        }}
                    >
                        {t('main.t_hello')}
                    </Typography>
                    {appInfo ? (
                        <>
                            <Stack spacing={1}>
                                <Typography
                                    color='success'
                                    sx={{ textAlign: 'center' }}
                                >
                                    {t('main.t_connect_success')}
                                </Typography>
                                <Typography
                                    variant={'caption'}
                                    color='inherit'
                                    sx={{ textAlign: 'center' }}
                                >
                                    {window.isTauri ?
                                        t('main.t_connect_success_info_t', { version: appInfo.api_version }) :
                                        t('main.t_connect_success_info_w', { version: appInfo.version })}
                                </Typography>
                            </Stack>
                            <Box sx={{ textAlign: 'center' }}>
                                <Button
                                    startIcon={<HomeRepairService color="default" />}
                                    variant="outlined"
                                    onClick={async () => {
                                        AppUtils.openPageDelay(navigate, "/features")
                                    }}
                                >
                                    {t('main.t_connect_btn_start')}
                                </Button>
                            </Box>
                        </>
                    ) : (
                        <>
                            <Stack spacing={1}>
                                <Typography
                                    color='error'
                                    sx={{ textAlign: 'center' }}
                                >
                                    {t('main.t_connect_error')}
                                </Typography>

                                {window.isTauri ? (
                                    <Typography
                                        variant={'caption'}
                                        color='inherit'
                                        sx={{ textAlign: 'center' }}
                                    >
                                        {t('main.t_connect_error_info_t')}
                                    </Typography>
                                ) : (
                                    <Typography
                                        variant={'caption'}
                                        color='inherit'
                                        sx={{ textAlign: 'center' }}
                                    >
                                        {t('main.t_connect_error_info_w')}
                                    </Typography>
                                )}
                            </Stack>

                            <Box sx={{ textAlign: 'center' }}>
                                <Button
                                    endIcon={<OpenInNew color="default" />}
                                    variant="outlined"
                                    onClick={async () => {
                                        await AppUtils.openUrl(AppConf.docUrl)
                                    }}
                                >
                                    {t('main.t_connect_btn_doc')}
                                </Button>
                            </Box>
                        </>
                    )}
                    <Box />
                </Stack>
            )}
        </AppBarLayout>
    );
}

MainPage.propTypes = {};
