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
import { useTranslation } from "react-i18next";

import { useSelector, useDispatch } from 'react-redux';
import { setData } from '../../store/impl/flutterAvailable';

import { useTheme, Typography, ListItem, List, Card, CardActionArea, CardContent, Stack } from '@mui/material';

import { useEffectSingle, LottieLoading } from '../../base';
import { Methods } from '../../modules';
import { SelectorModel } from '../../models';

export function FluttersPage(props) {
    // components
    const theme = useTheme();
    const { t } = useTranslation();
    // data
    const color = theme.palette.mode === 'dark' ? '#379ded' : '#0075d0';
    const [flutterAvailableState, setFlutterAvailableState] = React.useState(undefined);
    // redux
    const flutterAvailable = useSelector((state) => state.flutterAvailable.value);
    const dispatch = useDispatch();
    // data
    useEffectSingle(() => {
        (async function () {
            try {
                // Get available Flutter
                const data = flutterAvailable ? flutterAvailable : await Methods.flutterAvailable();
                dispatch(setData(data));
                // Update state
                setFlutterAvailableState(SelectorModel.parse(data));
            } catch (e) {
                setFlutterAvailableState(null);
            }
        })();
    });
    // Loading
    if (flutterAvailableState === undefined) {
        return (
            <Stack
                height={1}
                sx={{ justifyContent: "center", alignItems: "center" }}
            >
                <LottieLoading />
            </Stack>
        );
    }
    if (flutterAvailableState === null) {
        return (
            <Stack
                height={1}
                sx={{ justifyContent: "center", alignItems: "center" }}
            >
                <Stack
                    spacing={5}
                    sx={{ alignItems: "center" }}
                >
                    <Typography
                        variant={'body1'}
                        color={'text.primary'}
                        textAlign={'center'}
                    >
                        {t('common.t_not_found')}
                    </Typography>
                </Stack>
            </Stack>
        );
    }
    // Page
    return (
        <List>
            {flutterAvailableState.variants.map((e, index) => (
                <ListItem key={`key-${index}`}>
                    <Card
                        sx={{
                            border: `1px solid ${color}5e`,
                            background: `linear-gradient(to right, transparent 0%, ${color}1c 100%)`
                        }}
                    >
                        <CardActionArea
                            onClick={() => {

                            }}
                        >
                            <CardContent>
                                <Typography variant="subtitle2">
                                    {e.name}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </ListItem>
            ))}
        </List>
    );
}

FluttersPage.propTypes = {};
