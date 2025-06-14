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
import { setData as setPsdkInstalled } from '../../../store/impl/psdkInstalled';

import {
    useTheme,
    Typography,
    ListItem,
    CardContent,
    Stack,
    CardActions,
    Tooltip,
    IconButton,
    CircularProgress,
    Button,
    Box,
} from '@mui/material';

import { KeyboardArrowRight, FormatListBulleted, Error } from '@mui/icons-material';

import { Methods } from '../../../modules';
import {
    useEffectStateBool,
    setEffectStateBool,
    DataImages,
    AppUtils,
    StateListIcon,
    IconButtonLoading,
    CardGradient,
} from '../../../base';


export function PsdkItem(props) {
    // components
    const { t } = useTranslation();
    const theme = useTheme();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // data
    const color = theme.palette.primaryPsdk.main;
    const { psdkInstalled, psdkAvailable } = props;
    const isSync = useEffectStateBool(keysStateBool.psdksSync);
    // item
    return (
        <ListItem>
            <CardGradient color={color}>
                <CardContent sx={{ paddingBottom: 1 }}>
                    <Stack
                        direction="row"
                        spacing={1}
                        sx={{ paddingBottom: 1, alignItems: "center" }}
                    >
                        <img
                            style={{ width: '16px', height: '16px' }}
                            src={DataImages.iconPsdk}
                            alt='Icon' />
                        <Typography variant="subtitle2" color={color} >
                            {t('features.psdk.t_title')}
                        </Typography>
                    </Stack>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {t('features.psdk.t_text')}
                    </Typography>
                </CardContent>
                <CardActions sx={{
                    p: 2,
                    paddingTop: 0
                }}>
                    <IconButtonLoading
                        tooltip={t('common.t_sync')}
                        animate={psdkInstalled === undefined || isSync}
                        onClick={async () => {
                            setEffectStateBool(dispatch, keysStateBool.psdksSync, true);
                            try { await Methods.psdk_sync() } catch (e) { }
                            dispatch(setPsdkInstalled(await Methods.psdk_info()));
                            setEffectStateBool(dispatch, keysStateBool.psdksSync, false);
                        }}
                    />

                    {Array.isArray(psdkAvailable) && !(psdkInstalled === undefined || isSync) ? (
                        <Tooltip title={t('common.t_available')} placement="left-start">
                            <IconButton
                                onClick={() => {
                                    AppUtils.openPage(navigate, 'psdksAvailable');
                                }}
                            >
                                <FormatListBulleted />
                            </IconButton>
                        </Tooltip>
                    ) : psdkAvailable === null ? (
                        <StateListIcon title={t('common.t_error_data')}>
                            <Error color={'error'} />
                        </StateListIcon>
                    ) : (
                        <IconButtonLoading animate={true} />
                    )}

                    <Box sx={{ flexGrow: 1 }} />

                    <Button
                        disabled={(!Array.isArray(psdkInstalled) || psdkInstalled.length == 0 || isSync)}
                        size={'small'}
                        color={'primaryPsdk'}
                        endIcon={(psdkInstalled === undefined || isSync) ? (
                            <CircularProgress color="default" />
                        ) : (
                            <KeyboardArrowRight color="default" />
                        )}
                        variant="contained"
                        sx={{ opacity: 0.8 }}
                        onClick={() => {
                            if (psdkInstalled.length == 1) {
                                AppUtils.openPage(navigate, 'psdk', { state: { id: psdkInstalled[0].id } });
                            } else {
                                AppUtils.openPage(navigate, 'psdksInstalled');
                            }
                        }}
                    >
                        {t('common.t_open')}
                    </Button>
                </CardActions>
            </CardGradient>
        </ListItem>
    );
}

PsdkItem.propTypes = {
    psdkInstalled: PropTypes.array,
    psdkAvailable: PropTypes.array,
};
