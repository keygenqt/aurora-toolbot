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
import { setData as setFlutterInstalled } from '../../store/impl/flutterInstalled';
import { keysStateBool } from '../../store/impl/stateBool';

import {
    useTheme,
    Typography,
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
    Terminal,
} from '@mui/icons-material';

import {
    setEffectStateBool,
    IconButtonLoading,
    AppUtils,
    DataImages,
} from '../../base';

import { Methods } from '../../modules';
import { ListLayout } from '../../layouts';

export function FluttersInstalledPage(props) {
    // components
    const theme = useTheme();
    const { t } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // data
    const color = theme.palette.primaryFlutter.main;
    const reduxKey = keysStateBool.fluttersUpdate;
    // redux
    const flutterInstalled = useSelector((state) => state.flutterInstalled.value);
    // fun
    const updateStates = async () => {
        setEffectStateBool(dispatch, reduxKey, true);
        dispatch(setFlutterInstalled(await Methods.flutterInstalled()));
        await new Promise(r => setTimeout(r, 400)); // animation delay
        setEffectStateBool(dispatch, reduxKey, false);
    };
    // page
    return (
        <ListLayout
            models={flutterInstalled}
            updateStates={updateStates}
            reduxKey={reduxKey}
            itemList={(model) => (
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
                                src={DataImages.iconFlutter}
                                alt='Icon' />
                            <Typography variant="subtitle2" color={color} >
                                Flutter SDK v{model.flutterVersion}
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
                                        <Box>Dart v{model.dartVersion}</Box>
                                    </Stack>
                                    <Stack
                                        direction={'row'}
                                        spacing={1}
                                        alignItems={'center'}
                                    >
                                        <Box width={16} textAlign={'center'}>
                                            <FontAwesomeIcon icon="fa-solid fa-square-binary" />
                                        </Box>
                                        <Box>Tools v{model.toolsVersion}</Box>
                                    </Stack>
                                </Stack>
                            </Typography>
                        </Box>
                    </CardContent>

                    <CardActions sx={{
                        p: 2,
                        paddingTop: 1
                    }}>

                        {false ? (
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
                                                await Methods.appOpenDir(model.dir);
                                            } catch (e) {
                                                console.log(e)
                                            }
                                        }}
                                    >
                                        <FolderOpen />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title={t('fluttersInstalled.t_btn_terminal')} placement="left-start">
                                    <IconButton
                                        onClick={async () => {
                                            try {
                                                await Methods.flutterTerminalById(model.id);
                                            } catch (e) {
                                                console.log(e)
                                            }
                                        }}
                                    >
                                        <Terminal />
                                    </IconButton>
                                </Tooltip>
                            </Stack>
                        )}

                        <Box sx={{ flexGrow: 1 }} />

                        <Button
                            disabled={false}
                            size={'small'}
                            color={'primaryFlutter'}
                            endIcon={false ? (
                                <CircularProgress color="default" />
                            ) : (
                                <KeyboardArrowRight color="default" />
                            )}
                            variant="contained"
                            sx={{ opacity: 0.8 }}
                            onClick={() => {
                                AppUtils.openPage(navigate, 'flutter', { state: { model: model } });
                            }}
                        >
                            {t('common.t_open')}
                        </Button>
                    </CardActions>
                </Card>
            )}
        />
    );
}

FluttersInstalledPage.propTypes = {};
