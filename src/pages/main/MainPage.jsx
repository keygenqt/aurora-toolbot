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
import { useSelector, useDispatch } from 'react-redux'

import { Box, Stack, Typography, Button } from '@mui/material';

import { useEffectSingle, DataImages, AppUtils, LottieLoading } from '../../base';
import { Methods } from '../../modules';
import { AppConf } from '../../conf/AppConf'
import { AppInfoModel } from '../../models';

import { setData } from '../../store/impl/appInfo'

export function MainPage(props) {
    // components
    const navigate = useNavigate();
    const { t } = useTranslation();
    // states
    const [version, setVersion] = React.useState(undefined);
    // redux
    const appInfo = useSelector((state) => state.appInfo.value);
    const dispatch = useDispatch();
    // data
    useEffectSingle(() => {
        (async function () {
            // Get appInfo
            const data = appInfo ? appInfo.payload : await Methods.appInfo();
            dispatch(setData(data));
            // Update state
            const model = AppInfoModel.parse(data);
            setVersion(AppUtils.checkVersion(model));
        })();
    });
    // Loading
    if (version == undefined) {
        return (
            <Stack
                height={1}
                sx={{ justifyContent: "center", alignItems: "center" }}
            >
                <LottieLoading />
            </Stack>
        );
    }
    // Page
    return (
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
                    color: 'primary.light',
                    textAlign: "center"
                }}
            >
                {t('main.t_hello')}
            </Typography>
            {version ? (
                <>
                    <Typography
                        color='success'
                        sx={{ textAlign: 'center' }}
                    >
                        {t('main.t_connect_success')}
                    </Typography>

                    <Box sx={{ textAlign: 'center' }}>
                        <Button
                            variant="contained"
                            onClick={() => {
                                document.startViewTransition(() => {
                                    navigate("/features");
                                });
                            }}
                        >
                            {t('main.t_connect_btn_start')}
                        </Button>
                    </Box>
                </>
            ) : (
                <>
                    <Typography
                        color='error'
                        sx={{ textAlign: 'center' }}
                    >
                        {t('main.t_connect_error')}
                    </Typography>
                    <Stack
                        spacing={3}
                        sx={{ textAlign: 'center' }}
                    >
                        {window.isTauri ? (
                            <Typography
                                color={'text.primary'}
                                variant={'caption'}
                                sx={{
                                    textAlign: 'center',
                                    maxWidth: 300,
                                    margin: '0 auto !important',
                                }}
                            >
                                {t('main.t_connect_error_info_t')}
                            </Typography>
                        ) : (
                            <Typography
                                color={'text.primary'}
                                variant={'caption'}
                                sx={{
                                    textAlign: 'center',
                                    maxWidth: 360,
                                    margin: '0 auto !important',
                                }}
                            >
                                {t('main.t_connect_error_info_w')}
                            </Typography>
                        )}
                        <Box>
                            <Button
                                variant="contained"
                                onClick={async () => {
                                    await AppUtils.openUrl(AppConf.docUrl)
                                }}
                            >
                                {t('main.t_connect_btn_doc')}
                            </Button>
                        </Box>
                    </Stack>
                </>
            )}
            <Box />
        </Stack>
    );
}

MainPage.propTypes = {};
