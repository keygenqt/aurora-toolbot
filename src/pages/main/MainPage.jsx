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
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from 'react-redux'

import { Box, Stack, Typography, Button } from '@mui/material';
import { HomeRepairService, OpenInNew } from '@mui/icons-material';

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
    const [connect, setConnect] = React.useState(undefined);
    const [version, setVersion] = React.useState(undefined);
    // redux
    const appInfo = useSelector((state) => state.appInfo.value);
    const dispatch = useDispatch();
    // data
    useEffectSingle(() => {
        (async function () {
            try {
                // Get appInfo
                const data = appInfo ? appInfo : await Methods.appInfo();
                dispatch(setData(data));
                // Update state
                const model = AppInfoModel.parse(data);
                const connect = AppUtils.checkVersion(model);
                props.onStateConnect(connect);
                setConnect(connect);
                setVersion(window.isTauri ? model.apiVersion : model.appVersion)
            } catch (e) {
                props.onStateConnect(false);
                setConnect(false);
            }
        })();
    });
    // Loading
    if (connect == undefined) {
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
            {connect ? (
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
                                t('main.t_connect_success_info_t', { version: version }) :
                                t('main.t_connect_success_info_w', { version: version })}
                        </Typography>
                    </Stack>
                    <Box sx={{ textAlign: 'center' }}>
                        <Button
                            startIcon={<HomeRepairService color="default" />}
                            variant="outlined"
                            onClick={() => AppUtils.openPageDelay(navigate, "/features")}
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
    );
}

MainPage.propTypes = {
    onStateConnect: PropTypes.func.isRequired,
};
