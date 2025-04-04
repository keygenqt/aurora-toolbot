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

import { useSelector, useDispatch } from 'react-redux';
import { setData as setEmulators } from '../../store/impl/emulators';
import { setData as setStateBool } from '../../store/impl/stateBool';

import {
    useTheme,
    Typography,
    ListItem,
    List,
    Card,
    CardContent,
    Stack,
    CardActions,
    IconButton,
    Box,
    Button,
    CircularProgress,
} from '@mui/material';

import {
    FolderOpen,
    KeyboardArrowRight,
    PlayArrow,
    Terminal,
    Stop,
} from '@mui/icons-material';

import { AppUtils, DataImages, StateEmpty, IconButtonSync } from '../../base';
import { Methods } from '../../modules';

export function EmulatorsPage(props) {
    // components
    const theme = useTheme();
    const { t } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // data
    const color = theme.palette.secondary.main
    // redux
    const emulators = useSelector((state) => state.emulators.value);
    const stateBool = useSelector((state) => state.stateBool.data);
    // fun
    const updateStates = async () => {
        dispatch(setEmulators(await Methods.emulatorInfo()));
    };
    // states
    if (!emulators) {
        return (<StateEmpty />);
    }
    // page
    return (
        <List>
            {emulators.map((e, index) => {
                const key = `EmulatorsPage-${index}`
                const isLoading = stateBool.hasOwnProperty(key) ? stateBool[key] : false;
                return (
                    <ListItem key={`key-${index}`}>
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
                                        src={DataImages.iconVb}
                                        alt='Icon' />
                                    <Typography variant="subtitle2" color={color} >
                                        {e.name}
                                    </Typography>
                                </Stack>
                            </CardContent>

                            <CardActions sx={{
                                p: 2,
                                paddingTop: 0
                            }}>
                                {isLoading ? (
                                    <IconButtonSync isLoading={true} />
                                ) : (
                                    <Stack
                                        direction={'row'}
                                        spacing={1}
                                    >
                                        <IconButton
                                            onClick={async () => {
                                                try {
                                                    await Methods.appOpenDir(e.dirEmulator);
                                                } catch (e) {
                                                    console.log(e)
                                                }
                                            }}
                                        >
                                            <FolderOpen />
                                        </IconButton>

                                        {e.isRunning && (
                                            <IconButton
                                                onClick={async () => {
                                                    await Methods.emulatorTerminalById(e.id, false);
                                                }}
                                            >
                                                <Terminal />
                                            </IconButton>
                                        )}

                                        {e.isRunning && (
                                            <IconButton
                                                onClick={async () => {
                                                    await Methods.emulatorTerminalById(e.id, true);
                                                }}
                                            >
                                                <Terminal color={'error'} />
                                            </IconButton>
                                        )}

                                        {e.isRunning ? (
                                            <IconButton
                                                onClick={async () => {
                                                    dispatch(setStateBool({ key: key, value: true }));
                                                    await Methods.emulatorCloseById(e.id);
                                                    await new Promise(r => setTimeout(r, 1000));
                                                    await updateStates();
                                                    dispatch(setStateBool({ key: key, value: false }));
                                                }}
                                            >
                                                <Stop />
                                            </IconButton>
                                        ) : (
                                            <IconButton
                                                onClick={async () => {
                                                    dispatch(setStateBool({ key: key, value: true }));
                                                    await Methods.emulatorOpenById(e.id);
                                                    await updateStates();
                                                    dispatch(setStateBool({ key: key, value: false }));
                                                }}
                                            >
                                                <PlayArrow />
                                            </IconButton>
                                        )}
                                    </Stack>
                                )}


                                <Box sx={{ flexGrow: 1 }} />

                                <Button
                                    disabled={isLoading}
                                    size={'small'}
                                    color={'secondary'}
                                    endIcon={isLoading ? (
                                        <CircularProgress color="default" />
                                    ) : (
                                        <KeyboardArrowRight color="default" />
                                    )}
                                    variant="contained"
                                    sx={{ opacity: 0.8 }}
                                    onClick={() => {
                                        AppUtils.openPage(navigate, 'emulator', { state: { model: e } });
                                    }}
                                >
                                    {t('common.t_open')}
                                </Button>
                            </CardActions>
                        </Card>
                    </ListItem>
                )
            })}
        </List>
    );
}

EmulatorsPage.propTypes = {};
