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
    useEffectStateBool,
    setEffectStateBool,
    AppUtils,
    DataImages,
    StateEmpty,
    IconButtonLoading,
    ActionBack,
    ActionRefreshState,
} from '../../base';

import { Methods } from '../../modules';
import { AppBarLayout } from '../../layouts';

export function EmulatorsPage(props) {
    // components
    const theme = useTheme();
    const { t } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // data
    const color = theme.palette.secondary.main;
    const isUpdate = useEffectStateBool(keysStateBool.emulatorsUpdate);
    // redux
    const emulators = useSelector((state) => state.emulators.value);
    // fun
    const updateStates = async () => {
        setEffectStateBool(dispatch, keysStateBool.emulatorsUpdate, true);
        dispatch(setEmulators(await Methods.emulatorInfo()));
        await new Promise(r => setTimeout(r, 400)); // animation delay
        setEffectStateBool(dispatch, keysStateBool.emulatorsUpdate, false);
    };
    // states
    if (!emulators) {
        return (<StateEmpty />);
    }
    // page
    return (
        <AppBarLayout index actions={(
            <Stack direction={'row'} spacing={1}>
                <ActionBack disabled={isUpdate} />
                <ActionRefreshState
                    animate={isUpdate}
                    onClick={async () => {
                        await updateStates();
                    }}
                />
            </Stack>
        )} >
            <List>
                {emulators.map((e, index) => {
                    const itemKey = `${keysStateBool.emulatorLoading}-${index}`;
                    const isLoading = useEffectStateBool(itemKey);
                    return (
                        <ListItem key={itemKey}>
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
                                        sx={{ paddingBottom: 1.7, alignItems: "center" }}
                                    >
                                        <img
                                            style={{ width: '16px', height: '16px' }}
                                            src={DataImages.iconVb}
                                            alt='Icon' />
                                        <Typography variant="subtitle2" color={color} >
                                            {e.name}
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
                                                    <Box className={'select'} >{e.uuid}</Box>
                                                </Stack>
                                                <Stack
                                                    direction={'row'}
                                                    spacing={1}
                                                    alignItems={'center'}
                                                >
                                                    <Box width={16} textAlign={'center'}>
                                                        <FontAwesomeIcon icon="fa-solid fa-maximize" />
                                                    </Box>
                                                    <Box>{e.dimensions}</Box>
                                                </Stack>
                                                <Stack
                                                    direction={'row'}
                                                    spacing={1}
                                                    alignItems={'center'}
                                                >
                                                    <Box width={16} textAlign={'center'}>
                                                        <FontAwesomeIcon icon="fa-solid fa-microchip" />
                                                    </Box>
                                                    <Box>{e.arch}</Box>
                                                </Stack>
                                            </Stack>
                                        </Typography>
                                    </Box>
                                </CardContent>

                                <CardActions sx={{
                                    p: 2,
                                    paddingTop: 1
                                }}>
                                    {isLoading || isUpdate ? (
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
                                                            await Methods.appOpenDir(e.dirEmulator);
                                                        } catch (e) { }
                                                    }}
                                                >
                                                    <FolderOpen />
                                                </IconButton>
                                            </Tooltip>
                                            {e.isRunning && (
                                                <Tooltip title={t('emulators.t_btn_terminal_user')} placement="left-start">
                                                    <IconButton
                                                        onClick={async () => {
                                                            try {
                                                                await Methods.emulatorTerminalById(e.id, false);
                                                            } catch (e) {
                                                                await updateStates();
                                                            }
                                                        }}
                                                    >
                                                        <Terminal />
                                                    </IconButton>
                                                </Tooltip>

                                            )}
                                            {e.isRunning && (
                                                <Tooltip title={t('emulators.t_btn_terminal_root')} placement="left-start">
                                                    <IconButton
                                                        onClick={async () => {
                                                            try {
                                                                await Methods.emulatorTerminalById(e.id, true);
                                                            } catch (e) {
                                                                await updateStates();
                                                            }
                                                        }}
                                                    >
                                                        <Terminal color={'error'} />
                                                    </IconButton>
                                                </Tooltip>

                                            )}
                                            {e.isRunning ? (
                                                <Tooltip title={t('emulators.t_btn_stop')} placement="left-start">
                                                    <IconButton
                                                        onClick={async () => {
                                                            setEffectStateBool(dispatch, itemKey, true);
                                                            try {
                                                                await Methods.emulatorCloseById(e.id);
                                                                await new Promise(r => setTimeout(r, 1000));
                                                            } catch (e) { }
                                                            await updateStates();
                                                            setEffectStateBool(dispatch, itemKey, false);
                                                        }}
                                                    >
                                                        <Stop />
                                                    </IconButton>
                                                </Tooltip>

                                            ) : (
                                                <Tooltip title={t('emulators.t_btn_run')} placement="left-start">
                                                    <IconButton
                                                        onClick={async () => {
                                                            setEffectStateBool(dispatch, itemKey, true);
                                                            try {
                                                                await Methods.emulatorOpenById(e.id);
                                                            } catch (e) { }
                                                            await updateStates();
                                                            setEffectStateBool(dispatch, itemKey, false);
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
                                        disabled={isLoading || isUpdate}
                                        size={'small'}
                                        color={'secondary'}
                                        endIcon={isLoading || isUpdate ? (
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
        </AppBarLayout>
    );
}

EmulatorsPage.propTypes = {};
