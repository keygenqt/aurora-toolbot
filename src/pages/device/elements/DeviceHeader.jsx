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
import PropTypes from 'prop-types';
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
    useTheme,
    Box,
    Stack,
    Typography,
    CardContent,
    Tooltip,
    IconButton,
    ButtonGroup,
    Button,
} from '@mui/material';

import {
    CameraEnhance,
    Settings,
    Terminal,
} from '@mui/icons-material';

import { DataImages, CardGradient } from '../../../base';
import { Methods } from '../../../modules';

export function DeviceHeader(props) {
    // components
    const { t } = useTranslation();
    const theme = useTheme();
    // data
    let {
        model,
        isUpdate,
        onUpdate,
        onRefresh,
    } = props;
    const color = theme.palette.success.main;
    const colorDisabled = theme.palette.inherit.main;
    // page
    return (
        <CardGradient color={model.is_available ? color : colorDisabled}>
            <CardContent
                sx={{
                    position: 'relative',
                    '&:last-child': { padding: 2 }
                }}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: 16,
                        right: 16,
                    }}
                >
                    <Tooltip title={t('device.t_open_config')} placement="left-start">
                        <IconButton
                            onClick={async () => {
                                try {
                                    await Methods.app_open_file("devices.json");
                                } catch (e) {
                                    await onRefresh();
                                }
                            }}
                        >
                            <Settings />
                        </IconButton>
                    </Tooltip>
                </Box>
                <Stack
                    direction={'column'}
                    spacing={2}
                    sx={{
                        alignItems: "center",
                        paddingTop: 2,
                        paddingLeft: 2,
                        paddingRight: 2,
                    }}
                >
                    <img
                        style={{ width: '50px', height: '50px' }}
                        src={DataImages.iconDevice}
                        alt='Icon' />

                    <Typography variant="h6" >
                        {model.name.replace(model.version, "")}
                    </Typography>

                    <Stack
                        spacing={1}
                        sx={{
                            width: 1,
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
                                    <Box sx={{ minHeight: 21 }} >Aurora OS v{model.version}</Box>
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
                    </Stack>

                    <ButtonGroup
                        variant={'outlined'}
                        color={'success'}
                        disabled={!model.is_available || isUpdate}
                    >
                        <Tooltip title={t('device.t_btn_terminal_user')} placement="top">
                            <Button
                                onClick={async () => {
                                    try {
                                        await Methods.device_terminal_by_id(model.id);
                                    } catch (e) {
                                        await onRefresh();
                                    }
                                }}
                            >
                                <Terminal color={'default'} />
                            </Button>
                        </Tooltip>
                        <Tooltip title={t('device.t_btn_screenshot')} placement="top">
                            <Button
                                onClick={async () => {
                                    // @todo
                                }}
                            >
                                <CameraEnhance color={'default'} />
                            </Button>
                        </Tooltip>
                    </ButtonGroup>
                </Stack>
            </CardContent>
        </CardGradient>
    );
}

DeviceHeader.propTypes = {
    model: PropTypes.object.isRequired,
    isUpdate: PropTypes.bool.isRequired,
    onUpdate: PropTypes.func.isRequired,
    onRefresh: PropTypes.func.isRequired,
};
