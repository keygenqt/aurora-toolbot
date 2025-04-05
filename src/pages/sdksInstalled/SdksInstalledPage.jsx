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

import { useSelector } from 'react-redux';

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
} from '@mui/material';

import {
    FolderOpen,
    KeyboardArrowRight,
    Handyman,
} from '@mui/icons-material';

import { AppUtils, StateEmpty, DataImages } from '../../base';
import { Methods } from '../../modules';

export function SdksInstalledPage(props) {
    // components
    const theme = useTheme();
    const { t } = useTranslation();
    const navigate = useNavigate();
    // data
    let color = theme.palette.primarySdk.main;
    // redux
    const sdkInstalled = useSelector((state) => state.sdkInstalled.value);
    // States
    if (!sdkInstalled) {
        return (<StateEmpty />);
    }
    // Page
    return (
        <List>
            {sdkInstalled.map((e, index) => (
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
                                sx={{ paddingBottom: 1.7, alignItems: "center" }}
                            >
                                <img
                                    style={{ width: '16px', height: '16px' }}
                                    src={DataImages.iconSdk}
                                    alt='Icon' />
                                <Typography variant="subtitle2" color={color} >
                                    Аврора SDK v{e.versionFull}
                                </Typography>
                            </Stack>

                            <Box
                                sx={{
                                    background: `${theme.palette.background.default}bd`,
                                    borderRadius: 2,
                                    padding: 1.5,
                                }}
                            >
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    <Stack spacing={1} >
                                        <Stack
                                            direction={'row'}
                                            spacing={1}
                                            alignItems={'center'}
                                        >
                                            <Box width={16} textAlign={'center'}><FontAwesomeIcon icon="fa-solid fa-square-binary" /></Box>
                                            <Box>Qt Creator v{e.qtCreatorVersion}</Box>
                                        </Stack>
                                        <Stack
                                            direction={'row'}
                                            spacing={1}
                                            alignItems={'center'}
                                        >
                                            <Box width={16} textAlign={'center'}><FontAwesomeIcon icon="fa-solid fa-square-binary" /></Box>
                                            <Box>Qt v{e.qtVersion}</Box>
                                        </Stack>
                                        <Stack
                                            direction={'row'}
                                            spacing={1}
                                            alignItems={'center'}
                                        >
                                            <Box width={16} textAlign={'center'}><FontAwesomeIcon icon="fa-solid fa-trowel-bricks" /></Box>
                                            <Box>{e.buildDate}</Box>
                                        </Stack>
                                    </Stack>
                                </Typography>
                            </Box>

                        </CardContent>

                        <CardActions sx={{
                            p: 2,
                            paddingTop: 1
                        }}>
                            <IconButton
                                onClick={async () => {
                                    try {
                                        await Methods.appOpenDir(e.dir);
                                    } catch (e) {
                                        console.log(e)
                                    }
                                }}
                            >
                                <FolderOpen />
                            </IconButton>

                            <IconButton
                                onClick={async () => {
                                    try {
                                        await Methods.sdkToolsById(e.id);
                                    } catch (e) {
                                        console.log(e)
                                    }
                                }}
                            >
                                <Handyman />
                            </IconButton>

                            <Box sx={{ flexGrow: 1 }} />

                            <Button
                                size={'small'}
                                color={'primarySdk'}
                                endIcon={<KeyboardArrowRight color="default" />}
                                variant="contained"
                                sx={{ opacity: 0.8 }}
                                onClick={() => {
                                    AppUtils.openPage(navigate, 'sdk', { state: { model: e } });
                                }}
                            >
                                {t('common.t_open')}
                            </Button>
                        </CardActions>
                    </Card>
                </ListItem>
            ))}
        </List>
    );
}

SdksInstalledPage.propTypes = {};
