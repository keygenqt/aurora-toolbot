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

import { CloudOff, CloudQueue, InsertLink, OpenInNew, Done } from '@mui/icons-material';

import { setEffectStateBool, AppUtils, CardGradient } from '../../base';
import { Methods } from '../../modules';
import { ListLayout } from '../../layouts';

export function SdksAvailablePage(props) {
    // components
    const theme = useTheme();
    const { t } = useTranslation();
    const dispatch = useDispatch();
    // data
    const reduxKey = keysStateBool.psdksUpdate;
    // redux
    const sdkInstalled = useSelector((state) => state.sdkInstalled.value);
    const sdkAvailable = useSelector((state) => state.sdkAvailable.value);
    // fun
    const updateStates = async () => {
        setEffectStateBool(dispatch, reduxKey, true);
        dispatch(setSdkAvailable(await Methods.sdkAvailable()));
        await new Promise(r => setTimeout(r, 400)); // animation delay
        setEffectStateBool(dispatch, reduxKey, false);
    };
    // page
    return (
        <ListLayout
            models={sdkAvailable}
            updateStates={updateStates}
            reduxKey={reduxKey}
            itemList={(model) => {
                const isInstall = AppUtils.isInstall(sdkInstalled, model, (i, a) => {
                    return i.versionFull == a.versionFull && i.buildType == a.buildType;
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
                            title={`Аврора SDK (${model.buildType})`}
                            subheader={`v${model.versionFull}`}
                            sx={{
                                paddingBottom: 0,
                                '& .MuiCardHeader-title': {
                                    paddingBottom: 0.5,
                                }
                            }}
                        />
                        <CardContent>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                {model.buildType === 'MB2' ? t('sdksAvailable.t_item_mb2') : t('sdksAvailable.t_item_bt')}
                            </Typography>
                        </CardContent>
                        <CardActions sx={{
                            p: 2,
                            paddingTop: 0
                        }}>
                            <Chip
                                icon={model.installType === 'Online' ? (<CloudQueue color='info' />) : (<CloudOff color='primary' />)}
                                label={`${model.installType} installer`}
                            />
                            <Box sx={{ flexGrow: 1 }} />

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
    );
}

SdksAvailablePage.propTypes = {};
