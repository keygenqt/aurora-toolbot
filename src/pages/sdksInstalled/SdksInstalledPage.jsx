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
                                sx={{ paddingBottom: 1, alignItems: "center" }}
                            >
                                <img
                                    style={{ width: '16px', height: '16px' }}
                                    src={DataImages.iconSdk}
                                    alt='Icon' />
                                <Typography variant="subtitle2" color={color} >
                                    Аврора SDK v{e.versionFull}
                                </Typography>
                            </Stack>
                        </CardContent>

                        <CardActions sx={{
                            p: 2,
                            paddingTop: 0
                        }}>
                            <IconButton
                                onClick={() => {
                                    // @todo
                                }}
                            >
                                <FolderOpen />
                            </IconButton>

                            <IconButton
                                onClick={() => {
                                    // @todo
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
