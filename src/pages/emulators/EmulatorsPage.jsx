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

import { useTheme, Typography, ListItem, List, Card, CardActionArea, CardContent, Stack } from '@mui/material';

import { AppUtils, StateEmpty } from '../../base';

export function EmulatorsPage(props) {
    // components
    const theme = useTheme();
    const { t } = useTranslation();
    const navigate = useNavigate();
    // data
    const color = theme.palette.primaryFlutter.main;
    // redux
    const emulators = useSelector((state) => state.emulators.value);
    // States
    if (!emulators) {
        return (<StateEmpty />);
    }
    // Page
    return (
        <List>
            {emulators.map((e, index) => (
                <ListItem key={`key-${index}`}>
                    <Card
                        sx={{
                            border: `1px solid ${color}5e`,
                            background: `linear-gradient(to right, transparent 0%, ${color}1c 100%)`
                        }}
                    >
                        <CardActionArea
                            onClick={() => {
                                AppUtils.openPage(navigate, 'emulator', { state: { model: e } });
                            }}
                        >
                            <CardContent>
                                <Stack spacing={1}>
                                    <Typography variant="subtitle2">
                                        {e.name}
                                    </Typography>
                                    <Typography variant="text1">
                                        Uuid: {e.uuid}
                                    </Typography>
                                </Stack>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </ListItem>
            ))}
        </List>
    );
}

EmulatorsPage.propTypes = {};
