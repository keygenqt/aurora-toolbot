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
import { setData as setSdkInstalled } from '../../store/impl/sdkInstalled';
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
    Handyman,
} from '@mui/icons-material';

import {
    setEffectStateBool,
    IconButtonLoading,
    AppUtils,
    DataImages,
    CardGradient,
} from '../../base';

import { Methods } from '../../modules';
import { ListLayout } from '../../layouts';

export function SdksInstalledPage(props) {
    // components
    const theme = useTheme();
    const { t } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // data
    let color = theme.palette.primarySdk.main;
    const reduxKey = keysStateBool.sdksUpdate;
    // redux
    const sdkInstalled = useSelector((state) => state.sdkInstalled.value);
    // fun
    const updateStates = async () => {
        setEffectStateBool(dispatch, reduxKey, true);
        dispatch(setSdkInstalled(await Methods.sdk_info()));
        await new Promise(r => setTimeout(r, 400)); // animation delay
        setEffectStateBool(dispatch, reduxKey, false);
    };
    // page
    return (
        <ListLayout
            models={sdkInstalled}
            updateStates={updateStates}
            reduxKey={reduxKey}
            itemList={(model) => (
                <CardGradient color={color}>
                    <CardContent sx={{ paddingBottom: 1 }}>
                        <Stack
                            direction="row"
                            spacing={1}
                            sx={{ paddingBottom: 1.7, alignItems: "center" }}
                        >
                            <img
                                style={{ width: '16px', height: '16px' }}
                                src={DataImages.iconSdk}
                                alt='Icon' />
                            <Typography variant="subtitle2" color={color} >
                                Аврора SDK v{model.version.split('-')[0]}
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
                                        <Box>Qt Creator v{model.qt_creator_version}</Box>
                                    </Stack>
                                    <Stack
                                        direction={'row'}
                                        spacing={1}
                                        alignItems={'center'}
                                    >
                                        <Box width={16} textAlign={'center'}>
                                            <FontAwesomeIcon icon="fa-solid fa-square-binary" />
                                        </Box>
                                        <Box>Qt v{model.qt_version}</Box>
                                    </Stack>
                                    <Stack
                                        direction={'row'}
                                        spacing={1}
                                        alignItems={'center'}
                                    >
                                        <Box width={16} textAlign={'center'}>
                                            <FontAwesomeIcon icon="fa-solid fa-trowel-bricks" />
                                        </Box>
                                        <Box>{model.build_date}</Box>
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
                                                await Methods.app_open_dir(model.dir);
                                            } catch (e) {
                                                await updateStates();
                                            }
                                        }}
                                    >
                                        <FolderOpen />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title={t('sdksInstalled.t_btn_tools')} placement="left-start">
                                    <IconButton
                                        onClick={async () => {
                                            try {
                                                await Methods.sdk_tools_by_id(model.id);
                                            } catch (e) {
                                                await updateStates();
                                            }
                                        }}
                                    >
                                        <Handyman />
                                    </IconButton>
                                </Tooltip>
                            </Stack>
                        )}

                        <Box sx={{ flexGrow: 1 }} />

                        <Button
                            disabled={false}
                            size={'small'}
                            color={'primarySdk'}
                            endIcon={false ? (
                                <CircularProgress color="default" />
                            ) : (
                                <KeyboardArrowRight color="default" />
                            )}
                            variant="contained"
                            sx={{ opacity: 0.8 }}
                            onClick={() => {
                                AppUtils.openPage(navigate, 'sdk', { state: { id: model.id } });
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

SdksInstalledPage.propTypes = {};
