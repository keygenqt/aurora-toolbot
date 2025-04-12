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
    CircularProgress,
    ButtonGroup,
    Button,
} from '@mui/material';

import {
    Stop,
    PlayArrow,
    Smartphone,
    SystemSecurityUpdateGood,
    FolderOpen,
    Terminal,
} from '@mui/icons-material';

import { DataImages, CardGradient } from '../../../base';
import { Methods } from '../../../modules';

export function EmulatorHeader(props) {
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
    const color = theme.palette.secondary.main;
    // page
    return (
        <CardGradient color={color}>
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
                    {model.isRunning ? (
                        <SystemSecurityUpdateGood fontSize={'small'} />
                    ) : (
                        <Smartphone fontSize={'small'} />
                    )}
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
                        src={DataImages.iconVb}
                        alt='Icon' />

                    <Typography variant="h6" >
                        {model.name}
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
                                >
                                    <Box width={16} textAlign={'center'}>
                                        <FontAwesomeIcon icon="fa-solid fa-certificate" />
                                    </Box>
                                    <Box className={'select'} >{model.uuid}</Box>
                                </Stack>
                                <Stack
                                    direction={'row'}
                                    spacing={1}
                                    alignItems={'center'}
                                >
                                    <Box width={16} textAlign={'center'}>
                                        <FontAwesomeIcon icon="fa-solid fa-maximize" />
                                    </Box>
                                    <Box>{model.dimensions}</Box>
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

                    {isUpdate ? (
                        <Box sx={{ padding: 1 }}>
                            <CircularProgress size={27} />
                        </Box>
                    ) : (
                        <Stack
                            direction={'column'}
                            spacing={2}
                            sx={{ alignItems: 'center' }}
                        >
                            {model.isRunning && (
                                <Tooltip title={t('emulators.t_btn_stop')} placement="top">
                                    <IconButton
                                        size={'large'}
                                        onClick={async () => {
                                            onUpdate(true)
                                            try {
                                                await Methods.emulatorCloseById(model.id);
                                                await new Promise(r => setTimeout(r, 1000));
                                            } catch (e) { }
                                            await onRefresh();
                                            onUpdate(false)
                                        }}
                                    >
                                        <Stop />
                                    </IconButton>
                                </Tooltip>
                            )}
                            {!model.isRunning && (
                                <Tooltip title={t('emulators.t_btn_run')} placement="top">
                                    <IconButton
                                        size={'large'}
                                        onClick={async () => {
                                            onUpdate(true)
                                            try { await Methods.emulatorOpenById(model.id) } catch (e) { }
                                            await onRefresh();
                                            onUpdate(false)
                                        }}
                                    >
                                        <PlayArrow />
                                    </IconButton>
                                </Tooltip>
                            )}
                        </Stack>
                    )}

                    <ButtonGroup
                        variant={'outlined'}
                        color={'secondary'}
                        disabled={!model.isRunning || isUpdate}
                    >
                        <Tooltip title={t('common.t_btn_open_dir')} placement="top">
                            <Button
                                onClick={async () => {
                                    try {
                                        await Methods.appOpenDir(model.dirEmulator);
                                    } catch (e) {
                                        await onRefresh();
                                    }
                                }}
                            >
                                <FolderOpen color={'default'} />
                            </Button>
                        </Tooltip>
                        <Tooltip title={t('emulators.t_btn_terminal_user')} placement="top">
                            <Button
                                onClick={async () => {
                                    try {
                                        await Methods.emulatorTerminalById(model.id, false);
                                    } catch (e) {
                                        await onRefresh();
                                    }
                                }}
                            >
                                <Terminal color={(!model.isRunning || isUpdate) ? 'default' : 'inherit'} />
                            </Button>
                        </Tooltip>
                        <Tooltip title={t('emulators.t_btn_terminal_root')} placement="top">
                            <Button
                                onClick={async () => {
                                    try {
                                        await Methods.emulatorTerminalById(model.id, true);
                                    } catch (e) {
                                        await onRefresh();
                                    }
                                }}
                            >
                                <Terminal color={(!model.isRunning || isUpdate) ? 'default' : 'error'} />
                            </Button>
                        </Tooltip>
                    </ButtonGroup>
                </Stack>
            </CardContent>
        </CardGradient>
    );
}

EmulatorHeader.propTypes = {
    model: PropTypes.object.isRequired,
    isUpdate: PropTypes.bool.isRequired,
    onUpdate: PropTypes.func.isRequired,
    onRefresh: PropTypes.func.isRequired,
};
