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

import { useSelector, useDispatch } from 'react-redux';
import { setData as setStateBool } from '../../../store/impl/stateBool';

import {
    useTheme,
    Typography,
    ListItem,
    Card,
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
import { DataImages, AppUtils, StateListIcon, IconButtonSync } from '../../../base';


export function PsdkItem(props) {
    // components
    const { t } = useTranslation();
    const theme = useTheme();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // data
    const color = theme.palette.primaryPsdk.main;
    const {
        psdkInstalled,
        psdkAvailable,
    } = props
    // redux
    const stateBool = useSelector((state) => state.stateBool.data);
    const isSync = stateBool.hasOwnProperty("PsdkItem") ? stateBool["PsdkItem"] : false;
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
                    {Array.isArray(psdkInstalled) && (
                        <IconButtonSync
                            isLoading={isSync}
                            onClick={async () => {
                                dispatch(setStateBool({ key: "PsdkItem", value: true }));
                                await Methods.psdkSync();
                                dispatch(setStateBool({ key: "PsdkItem", value: false }));
                            }}
                        />
                    )}

                    {Array.isArray(psdkAvailable) && psdkAvailable.length ? (
                        <Tooltip title={t('common.t_available')} placement="left-start">
                            <IconButton
                                onClick={() => {
                                    AppUtils.openPage(navigate, 'psdksAvailable');
                                }}
                            >
                                <FormatListBulleted />
                            </IconButton>
                        </Tooltip>
                    ) : psdkAvailable === null || Array.isArray(psdkAvailable) && psdkAvailable.length == 0 ? (
                        <StateListIcon title={t('common.t_error')}>
                            <Error color={'error'} />
                        </StateListIcon>
                    ) : (
                        <CircularProgress size="20px" color="primarySdk" />
                    )}

                    <Box sx={{ flexGrow: 1 }} />

                    <Button
                        disabled={(!Array.isArray(psdkInstalled) || psdkInstalled.length == 0 || isSync)}
                        size={'small'}
                        color={'primaryPsdk'}
                        endIcon={(!Array.isArray(psdkInstalled) || isSync) ? (
                            <CircularProgress color="default" />
                        ) : (
                            <KeyboardArrowRight color="default" />
                        )}
                        variant="contained"
                        sx={{ opacity: 0.8 }}
                        onClick={() => {
                            AppUtils.openPage(navigate, 'psdksInstalled');
                        }}
                    >
                        {t('common.t_open')}
                    </Button>
                </CardActions>
            </Card>
        </ListItem>
    );
}

PsdkItem.propTypes = {
    psdkInstalled: PropTypes.array,
    psdkAvailable: PropTypes.array,
};
