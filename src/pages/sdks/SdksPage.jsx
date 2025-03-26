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
import { setData } from '../../store/impl/sdkAvailable';

import {
    useTheme,
    Typography,
    ListItem,
    List,
    Box,
    Card,
    Stack,
    CardHeader,
    CardContent,
    IconButton,
    CardActions,
    Tooltip,
    Chip,
} from '@mui/material';

import { CloudOff, CloudQueue, Download } from '@mui/icons-material';

import { useEffectSingle, LottieLoading } from '../../base';
import { Methods } from '../../modules';

export function SdksPage(props) {
    // components
    const theme = useTheme();
    const { t } = useTranslation();
    // data
    const color = theme.palette.mode === 'dark' ? '#c19df2' : '#4c0ea1';
    const [sdkAvailableState, setSdkAvailableState] = React.useState(undefined);
    // redux
    const sdkAvailable = useSelector((state) => state.sdkAvailable.value);
    const dispatch = useDispatch();
    // data
    useEffectSingle(() => {
        (async function () {
            try {
                // Get available SDK
                const data = sdkAvailable ? sdkAvailable : await Methods.sdkAvailable();
                dispatch(setData(data));
                // Update state
                setSdkAvailableState(data);
            } catch (e) {
                setSdkAvailableState(null);
            }
        })();
    });
    // Loading
    if (sdkAvailableState === undefined) {
        return (
            <Stack
                height={1}
                sx={{ justifyContent: "center", alignItems: "center" }}
            >
                <LottieLoading />
            </Stack>
        );
    }
    if (sdkAvailableState === null) {
        return (
            <Stack
                height={1}
                sx={{ justifyContent: "center", alignItems: "center" }}
            >
                <Stack
                    spacing={5}
                    sx={{ alignItems: "center" }}
                >
                    <Typography
                        variant={'body1'}
                        color={'text.primary'}
                        textAlign={'center'}
                    >
                        {t('common.t_not_found')}
                    </Typography>
                </Stack>
            </Stack>
        );
    }
    // Page
    return (
        <List>
            {sdkAvailableState.map((e, index) => (
                <ListItem key={`key-${index}`}>
                    <Card
                        sx={{
                            border: `1px solid ${color}5e`,
                            background: `linear-gradient(to right, transparent 0%, ${color}1c 100%)`
                        }}
                    >
                        <CardHeader
                            title={`Aurora SDK (${e.buildType})`}
                            subheader={`v${e.versionFull}`}
                            sx={{
                                paddingBottom: 0,
                                '& .MuiCardHeader-title': {
                                    paddingBottom: 0.5,
                                }
                            }}
                        />
                        <CardContent>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                {e.buildType === 'MB2' ? t('sdks.t_item_mb2') : t('sdks.t_item_bt')}
                            </Typography>
                        </CardContent>
                        <CardActions sx={{
                            p: 2,
                            paddingTop: 0
                        }}>
                            <Chip icon={e.installType === 'Online' ? (<CloudQueue color='info' />) : (<CloudOff color='gray' />)} label={e.installType} />
                            <Box sx={{ flexGrow: 1 }} />
                            <Tooltip title={t('common.t_download')} placement="left-start">
                                <IconButton>
                                    <Download />
                                </IconButton>
                            </Tooltip>

                        </CardActions>
                    </Card>
                </ListItem>
            ))}
        </List>
    );
}

SdksPage.propTypes = {};
