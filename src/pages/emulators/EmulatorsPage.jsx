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
import { setData as setEmulators } from '../../store/impl/emulators';
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
    FolderOpen,
    KeyboardArrowRight,
    PlayArrow,
    Terminal,
    Stop,
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

export function EmulatorsPage(props) {
    // components
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const theme = useTheme();
    const { t } = useTranslation();
    // data
    const reduxKey = keysStateBool.emulatorsUpdate;
    const color = theme.palette.secondary.main;
    const [isUpdateItem, setIsUpdateItem] = React.useState([]);
    // redux
    const emulators = useSelector((state) => state.emulators.value);
    // fun
    const updateStatesSilent = async () => {
        dispatch(setEmulators(await Methods.emulatorInfo()));
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
            disable={isUpdateItem.length !== 0}
            models={emulators}
            updateStates={updateStates}
            reduxKey={reduxKey}
            itemList={(model, key) => (
                <CardGradient color={color}>
                    <CardContent sx={{ paddingBottom: 1 }}>
                        <Stack
                            direction="row"
                            spacing={1}
                            sx={{ paddingBottom: 1.7, alignItems: "center" }}
                        >
                            <img
                                style={{ width: '16px', height: '16px' }}
                                src={DataImages.iconVb}
                                alt='Icon' />
                            <Typography variant="subtitle2" color={color} >
                                {model.name}
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
                        </Box>
                    </CardContent>

                    <CardActions sx={{
                        p: 2,
                        paddingTop: 1
                    }}>
                        {isUpdateItem.includes(key) ? (
                            <IconButtonLoading animate={true} />
                        ) : (
                            <Stack
                                direction={'row'}
                                spacing={1}
                            >
                                <Tooltip title={t('common.t_btn_open_dir')} placement="left-start">
                                    <IconButton
                                        onClick={async () => {
                                            try {
                                                await Methods.appOpenDir(model.dirEmulator);
                                            } catch (e) {
                                                await updateStates();
                                            }
                                        }}
                                    >
                                        <FolderOpen />
                                    </IconButton>
                                </Tooltip>
                                {model.isRunning && (
                                    <Tooltip title={t('emulators.t_btn_terminal_user')} placement="left-start">
                                        <IconButton
                                            onClick={async () => {
                                                try {
                                                    await Methods.emulatorTerminalById(model.id, false);
                                                } catch (e) {
                                                    await updateStates();
                                                }
                                            }}
                                        >
                                            <Terminal />
                                        </IconButton>
                                    </Tooltip>
                                )}
                                {model.isRunning && (
                                    <Tooltip title={t('emulators.t_btn_terminal_root')} placement="left-start">
                                        <IconButton
                                            onClick={async () => {
                                                try {
                                                    await Methods.emulatorTerminalById(model.id, true);
                                                } catch (e) {
                                                    await updateStates();
                                                }
                                            }}
                                        >
                                            <Terminal color={'error'} />
                                        </IconButton>
                                    </Tooltip>
                                )}
                                {model.isRunning ? (
                                    <Tooltip title={t('emulators.t_btn_stop')} placement="left-start">
                                        <IconButton
                                            onClick={async () => {
                                                setIsUpdateItem(isUpdateItem.concat([key]));
                                                try {
                                                    await Methods.emulatorCloseById(model.id);
                                                    await new Promise(r => setTimeout(r, 1000));
                                                    await updateStatesSilent();
                                                } catch (e) {
                                                    await updateStates();
                                                }
                                                setIsUpdateItem(isUpdateItem.filter((e) => e !== key));
                                            }}
                                        >
                                            <Stop />
                                        </IconButton>
                                    </Tooltip>
                                ) : (
                                    <Tooltip title={t('emulators.t_btn_run')} placement="left-start">
                                        <IconButton
                                            onClick={async () => {
                                                setIsUpdateItem(isUpdateItem.concat([key]));
                                                try {
                                                    await Methods.emulatorOpenById(model.id);
                                                    await updateStatesSilent();
                                                } catch (e) {
                                                    await updateStates();
                                                }
                                                setIsUpdateItem(isUpdateItem.filter((e) => e !== key));
                                            }}
                                        >
                                            <PlayArrow />
                                        </IconButton>
                                    </Tooltip>
                                )}
                            </Stack>
                        )}

                        <Box sx={{ flexGrow: 1 }} />

                        <Button
                            disabled={isUpdateItem.includes(key)}
                            size={'small'}
                            color={'secondary'}
                            endIcon={isUpdateItem.includes(key) ? (
                                <CircularProgress color="default" />
                            ) : (
                                <KeyboardArrowRight color="default" />
                            )}
                            variant="contained"
                            sx={{ opacity: 0.8 }}
                            onClick={() => {
                                AppUtils.openPage(navigate, 'emulator', { state: { id: model.id } });
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

EmulatorsPage.propTypes = {};
