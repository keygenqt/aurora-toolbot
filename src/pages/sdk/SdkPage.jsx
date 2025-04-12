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
import { useLocation } from "react-router";
import { useTranslation } from "react-i18next";

import { useSelector, useDispatch } from 'react-redux';
import { setData as setSdkInstalled } from '../../store/impl/sdkInstalled';
import { keysStateBool } from '../../store/impl/stateBool';

import { useTheme, Stack, Typography, CardContent } from '@mui/material';

import { setEffectStateBool, LottieComingSoon, CardGradient } from '../../base';
import { ListLayout } from '../../layouts';
import { Methods } from '../../modules';

export function SdkPage(props) {
    // components
    const { t } = useTranslation();
    const { state } = useLocation();
    const dispatch = useDispatch();
    const theme = useTheme();
    // data
    const color = theme.palette.primarySdk.main;
    const reduxKey = keysStateBool.psdksUpdate;
    const [isUpdateItem, setIsUpdateItem] = React.useState(false);
    // redux
    const sdkInstalled = useSelector((state) => state.sdkInstalled.value);
    // fun
    const updateStatesSilent = async () => {
        dispatch(setSdkInstalled(await Methods.sdkInstalled()));
    };
    const updateStates = async () => {
        setEffectStateBool(dispatch, reduxKey, true);
        await updateStatesSilent();
        await new Promise(r => setTimeout(r, 400)); // animation delay
        setEffectStateBool(dispatch, reduxKey, false);
    };
    // page
    return (
        <ListLayout
            disable={isUpdateItem}
            models={sdkInstalled}
            updateStates={updateStates}
            reduxKey={reduxKey}
            itemList={(model) => {
                return model.id !== state.id ? null : (
                    <CardGradient color={color}>
                        <CardContent sx={{ '&:last-child': { padding: 2 } }} >
                            <Stack
                                height={1}
                                sx={{ justifyContent: "center", alignItems: "center" }}
                            >
                                <Stack
                                    spacing={5}
                                    sx={{ alignItems: "center" }}
                                >
                                    <LottieComingSoon />
                                    <Typography
                                        variant={'body1'}
                                        color={'text.primary'}
                                        textAlign={'center'}
                                    >
                                        {t('common.t_coming_soon')}
                                    </Typography>
                                </Stack>
                            </Stack>
                        </CardContent>
                    </CardGradient>
                )
            }}
        />
    );
}

SdkPage.propTypes = {};
