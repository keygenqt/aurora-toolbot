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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useSelector, useDispatch } from 'react-redux';
import { setData as setDevices } from '../../store/impl/devices';
import { keysStateBool } from '../../store/impl/stateBool';

import {
    useTheme,
    Typography,
    CardContent,
    Stack,
    CardActions,
    IconButton,
    Box,
    Button,
    CircularProgress,
    Tooltip,
} from '@mui/material';

import {
    KeyboardArrowRight,
    Terminal,
} from '@mui/icons-material';

import {
    setEffectStateBool,
    AppUtils,
    DataImages,
    IconButtonLoading,
    CardGradient,
} from '../../base';

import { Methods } from '../../modules';
import { ListLayout } from '../../layouts';

export function DevicesPage(props) {
    // components
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const theme = useTheme();
    const { t } = useTranslation();
    // data
    const reduxKey = keysStateBool.devicesUpdate;
    const color = theme.palette.primaryDevice.main;
    const colorDisabled = theme.palette.inherit.main;
    // redux
    const devices = useSelector((state) => state.devices.value);
    // fun
    const updateStatesSilent = async () => {
        dispatch(setDevices(await Methods.device_info()));
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
            models={devices}
            updateStates={updateStates}
            reduxKey={reduxKey}
            itemList={(model, key) => (
                <CardGradient color={model.is_available ? color : colorDisabled}>
                    <CardContent sx={{ paddingBottom: 1 }}>
                        <Stack
                            direction="row"
                            spacing={1}
                            sx={{ paddingBottom: 1.7, alignItems: "center" }}
                        >
                            <img
                                style={{ width: '16px', height: '16px' }}
                                src={DataImages.iconDevice}
                                alt='Icon' />
                            <Typography variant="subtitle2" color={model.is_available ? color : colorDisabled} >
                                {model.name.replace(model.version, "")}
                            </Typography>
                        </Stack>
                        <Box
                            sx={{
                                background: `${theme.palette.background.default}bd`,
                                borderRadius: 2,
                                padding: 1.5,
                            }}
                        >
                            <Typography component={'div'} variant="body2" sx={{ color: 'text.secondary' }}>
                                <Stack spacing={1} >
                                    <Stack
                                        direction={'row'}
                                        spacing={1}
                                        alignItems={'center'}
                                    >
                                        <Box width={16} textAlign={'center'}>
                                            <FontAwesomeIcon icon="fa-solid fa-square-binary" />
                                        </Box>
                                        <Box sx={{minHeight: 21}} >Aurora OS v{model.version}</Box>
                                    </Stack>
                                    <Stack
                                        direction={'row'}
                                        spacing={1}
                                        alignItems={'center'}
                                    >
                                        <Box width={16} textAlign={'center'}>
                                            <FontAwesomeIcon icon="fa-solid fa-location-crosshairs" />
                                        </Box>
                                        <Box className={'select'} >{model.host}</Box>
                                    </Stack>
                                    <Stack
                                        direction={'row'}
                                        spacing={1}
                                        alignItems={'center'}
                                    >
                                        <Box width={16} textAlign={'center'}>
                                            <FontAwesomeIcon icon="fa-solid fa-key" />
                                        </Box>
                                        <Box>{model.pass == null ? 'SSH key' : 'Password'}</Box>
                                    </Stack>
                                    <Stack
                                        direction={'row'}
                                        spacing={1}
                                        alignItems={'center'}
                                    >
                                        <Box width={16} textAlign={'center'}>
                                            <FontAwesomeIcon icon="fa-solid fa-microchip" />
                                        </Box>
                                        <Box>{model.arch}</Box>
                                    </Stack>
                                </Stack>
                            </Typography>
                        </Box>
                    </CardContent>

                    <CardActions sx={{
                        p: 2,
                        paddingTop: 1
                    }}>
                        <Stack
                            direction={'row'}
                            spacing={1}
                        >
                            {model.is_available && (
                                <Tooltip title={t('devices.t_btn_terminal_user')} placement="left-start">
                                    <IconButton
                                        onClick={async () => {
                                            try {
                                                await Methods.device_terminal_by_id(model.id);
                                            } catch (e) {
                                                await updateStates();
                                            }
                                        }}
                                    >
                                        <Terminal />
                                    </IconButton>
                                </Tooltip>
                            )}
                            {!model.is_available && (
                                <Typography component={'div'} variant="body2" sx={{ color: 'text.secondary' }}>
                                    {t('devices.t_not_connection')}
                                </Typography>
                            )}
                        </Stack>

                        <Box sx={{ flexGrow: 1 }} />

                        <Button
                            disabled={!model.is_available}
                            size={'small'}
                            color={'primaryDevice'}
                            endIcon={<KeyboardArrowRight color="default" />}
                            variant="contained"
                            sx={{ opacity: 0.8 }}
                            onClick={() => {
                                AppUtils.openPage(navigate, 'device', { state: { id: model.id } });
                            }}
                        >
                            {t('common.t_open')}
                        </Button>
                    </CardActions>
                </CardGradient>
            )}
        />
    );
}

DevicesPage.propTypes = {};
