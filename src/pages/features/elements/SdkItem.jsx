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
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import PropTypes from 'prop-types';

import { useDispatch } from 'react-redux';
import { keysStateBool } from '../../../store/impl/stateBool';
import { setData as setSdkInstalled } from '../../../store/impl/sdkInstalled';

import {
    useTheme,
    Typography,
    ListItem,
    Card,
    CardContent,
    CardActions,
    IconButton,
    Tooltip,
    Stack,
    Box,
    Button,
    CircularProgress,
} from '@mui/material';

import { FormatListBulleted, KeyboardArrowRight, NewReleases, Error } from '@mui/icons-material';

import { Methods } from '../../../modules';
import { SdkAvailableModel } from '../../../models';
import {
    useEffectStateBool,
    setEffectStateBool,
    DataImages,
    AppUtils,
    StateListIcon,
    IconButtonLoading,
} from '../../../base';


export function SdkItem(props) {
    // components
    const { t } = useTranslation();
    const theme = useTheme();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // data
    const color = theme.palette.primarySdk.main;
    const { sdkInstalled, sdkAvailable } = props;
    const isNew = SdkAvailableModel.hasNew(sdkAvailable, sdkInstalled);
    const isSync = useEffectStateBool(keysStateBool.sdksSync);
    // item
    return (
        <ListItem>
            <Card
                sx={{
                    border: `1px solid ${color}5e`,
                    background: `linear-gradient(to right, transparent 0%, ${color}1c 100%)`
                }}
            >
                <CardContent sx={{ paddingBottom: 1 }}>
                    <Stack
                        direction="row"
                        spacing={1}
                        sx={{ paddingBottom: 1, alignItems: "center" }}
                    >
                        <img
                            style={{ width: '16px', height: '16px' }}
                            src={DataImages.iconSdk}
                            alt='Icon' />
                        <Typography variant="subtitle2" color={color} >
                            {t('features.sdk.t_title')}
                        </Typography>
                    </Stack>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {t('features.sdk.t_text')}
                    </Typography>
                </CardContent>
                <CardActions sx={{
                    p: 2,
                    paddingTop: 0
                }}>
                    {isNew && (
                        <StateListIcon title={t('common.t_new_version')}>
                            <NewReleases color={'info'} />
                        </StateListIcon>
                    )}

                    <IconButtonLoading
                        tooltip={t('common.t_sync')}
                        animate={!Array.isArray(sdkInstalled) || isSync}
                        onClick={async () => {
                            setEffectStateBool(dispatch, keysStateBool.sdksSync, true);
                            try {
                                await Methods.sdkSync();
                                dispatch(setSdkInstalled(await Methods.sdkInstalled()));
                            } catch (e) {}
                            setEffectStateBool(dispatch, keysStateBool.sdksSync, false);
                        }}
                    />

                    {Array.isArray(sdkAvailable) && sdkAvailable.length ? (
                        <Tooltip title={t('common.t_available')} placement="left-start">
                            <IconButton
                                onClick={() => {
                                    AppUtils.openPage(navigate, 'sdksAvailable');
                                }}
                            >
                                <FormatListBulleted />
                            </IconButton>
                        </Tooltip>
                    ) : sdkAvailable === null || Array.isArray(sdkAvailable) && sdkAvailable.length == 0 ? (
                        <StateListIcon title={t('common.t_error')}>
                            <Error color={'error'} />
                        </StateListIcon>
                    ) : (
                        <IconButtonLoading animate={true} />
                    )}

                    <Box sx={{ flexGrow: 1 }} />

                    <Button
                        disabled={(!Array.isArray(sdkInstalled) || sdkInstalled.length == 0 || isSync)}
                        size={'small'}
                        color={'primarySdk'}
                        endIcon={(!Array.isArray(sdkInstalled) || isSync) ? (
                            <CircularProgress color="default" />
                        ) : (
                            <KeyboardArrowRight color="default" />
                        )}
                        variant="contained"
                        sx={{ opacity: 0.8 }}
                        onClick={() => {
                            AppUtils.openPage(navigate, 'sdksInstalled');
                        }}
                    >
                        {t('common.t_open')}
                    </Button>
                </CardActions>
            </Card>
        </ListItem >
    );
}

SdkItem.propTypes = {
    sdkInstalled: PropTypes.array,
    sdkAvailable: PropTypes.array,
};
