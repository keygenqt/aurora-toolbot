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
import { setData } from '../../store/impl/psdkAvailable';

import { useTheme, Typography, ListItem, List, Card, CardActionArea, CardContent, Stack } from '@mui/material';

import { useEffectSingle, LottieLoading } from '../../base';
import { Methods } from '../../modules';

export function PsdksPage(props) {
    // components
    const theme = useTheme();
    const { t } = useTranslation();
    // data
    const color = theme.palette.mode === 'dark' ? '#2895a8' : '#00457C';
    const [psdkAvailableState, setPsdkAvailableState] = React.useState(undefined);
    // redux
    const psdkAvailable = useSelector((state) => state.psdkAvailable.value);
    const dispatch = useDispatch();
    // data
    useEffectSingle(() => {
        (async function () {
            try {
                // Get available PSDK
                const data = psdkAvailable ? psdkAvailable : await Methods.psdkAvailable();
                dispatch(setData(data));
                // Update state
                setPsdkAvailableState(data);
            } catch (e) {
                setPsdkAvailableState(null);
            }
        })();
    });
    // Loading
    if (psdkAvailableState === undefined) {
        return (
            <Stack
                height={1}
                sx={{ justifyContent: "center", alignItems: "center" }}
            >
                <LottieLoading />
            </Stack>
        );
    }
    if (psdkAvailableState === null) {
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
            {psdkAvailableState.map((e, index) => (
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
                                <Stack spacing={1}>
                                    <Typography variant="subtitle2">
                                        v{e.versionFull}
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

PsdksPage.propTypes = {};
