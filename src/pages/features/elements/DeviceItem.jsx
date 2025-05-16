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
import { setData as setDevices } from '../../../store/impl/devices';

import {
    useTheme,
    Typography,
    ListItem,
    CardContent,
    Box,
    CardActions,
    CircularProgress,
    Button,
    Tooltip,
    IconButton,
} from '@mui/material';

import { KeyboardArrowRight, Settings } from '@mui/icons-material';

import { Methods } from '../../../modules';
import {
    useEffectStateBool,
    setEffectStateBool,
    AppUtils,
    IconButtonLoading,
    CardGradient,
} from '../../../base';

export function DeviceItem(props) {
    // components
    const { t } = useTranslation();
    const theme = useTheme();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // data
    const color = theme.palette.success.main;
    const { devices } = props;
    const isSync = useEffectStateBool(keysStateBool.devicesSync);
    // item
    return (
        <ListItem>
            <CardGradient color={color}>
                <CardContent sx={{ paddingBottom: 1 }}>
                    <Box sx={{ paddingBottom: 1 }}>
                        <Typography variant="subtitle2" color={color} >
                            {t('features.device.t_title')}
                        </Typography>
                    </Box>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {(Array.isArray(devices) && devices.length == 0) ? (
                            t('features.device.t_not_found')
                        ) : (
                            t('features.device.t_text')
                        )}
                    </Typography>
                </CardContent>
                <CardActions sx={{
                    p: 2,
                    paddingTop: 0
                }}>
                    <IconButtonLoading
                        tooltip={t('common.t_sync')}
                        animate={devices === undefined || isSync}
                        onClick={async () => {
                            setEffectStateBool(dispatch, keysStateBool.devicesSync, true);
                            try { await Methods.device_sync() } catch (e) {}
                            dispatch(setDevices(await Methods.device_info()));
                            setEffectStateBool(dispatch, keysStateBool.devicesSync, false);
                        }}
                    />

                    <Tooltip title={t('features.device.t_open_config')} placement="left-start">
                        <IconButton
                            onClick={async () => {
                                await Methods.app_open_file("devices.json");
                            }}
                        >
                            <Settings />
                        </IconButton>
                    </Tooltip>

                    <Box sx={{ flexGrow: 1 }} />

                    <Button
                        disabled={(!Array.isArray(devices) || devices.length == 0 || isSync)}
                        size={'small'}
                        color={'success'}
                        endIcon={(devices === undefined || isSync) ? (
                            <CircularProgress color="default" />
                        ) : (
                            <KeyboardArrowRight color="default" />
                        )}
                        variant="contained"
                        sx={{ opacity: 0.9 }}
                        onClick={() => {
                            if (devices.length == 1) {
                                AppUtils.openPage(navigate, 'device', { state: { id: devices[0].id } });
                            } else {
                                AppUtils.openPage(navigate, 'devices');
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

DeviceItem.propTypes = {
    devices: PropTypes.array,
};
