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
import PropTypes from 'prop-types';

import { useDispatch } from 'react-redux';
import { keysStateBool } from '../../../store/impl/stateBool';
import { setData as setEmulators } from '../../../store/impl/emulators';

import {
    useTheme,
    Typography,
    ListItem,
    Card,
    CardContent,
    Box,
    CardActions,
    CircularProgress,
    Button,
} from '@mui/material';

import { KeyboardArrowRight } from '@mui/icons-material';

import { Methods } from '../../../modules';
import {
    useEffectStateBool,
    setEffectStateBool,
    AppUtils,
    IconButtonLoading,
    CardGradient,
} from '../../../base';

export function EmulatorItem(props) {
    // components
    const { t } = useTranslation();
    const theme = useTheme();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // data
    const color = theme.palette.secondary.main;
    const { emulators } = props;
    const isSync = useEffectStateBool(keysStateBool.emulatorsSync);
    // item
    return (
        <ListItem>
            <CardGradient color={color}>
                <CardContent sx={{ paddingBottom: 1 }}>
                    <Box sx={{ paddingBottom: 1 }}>
                        <Typography variant="subtitle2" color={color} >
                            {t('features.emulator.t_title')}
                        </Typography>
                    </Box>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {emulators !== null ? (
                            t('features.emulator.t_not_found')
                        ) : (
                            t('features.emulator.t_text')
                        )}
                    </Typography>
                </CardContent>
                <CardActions sx={{
                    p: 2,
                    paddingTop: 0
                }}>
                    <IconButtonLoading
                        tooltip={t('common.t_sync')}
                        animate={emulators === undefined || isSync}
                        onClick={async () => {
                            setEffectStateBool(dispatch, keysStateBool.emulatorsSync, true);
                            try { await Methods.emulatorSync() } catch (e) {}
                            dispatch(setEmulators(await Methods.emulatorInfo()));
                            setEffectStateBool(dispatch, keysStateBool.emulatorsSync, false);
                        }}
                    />

                    <Box sx={{ flexGrow: 1 }} />

                    <Button
                        disabled={(!Array.isArray(emulators) || emulators.length == 0 || isSync)}
                        size={'small'}
                        color={'secondary'}
                        endIcon={(emulators === undefined || isSync) ? (
                            <CircularProgress color="default" />
                        ) : (
                            <KeyboardArrowRight color="default" />
                        )}
                        variant="contained"
                        sx={{ opacity: 0.9 }}
                        onClick={() => {
                            if (emulators.length == 1) {
                                AppUtils.openPage(navigate, 'emulator', { state: { id: emulators[0].id } });
                            } else {
                                AppUtils.openPage(navigate, 'emulators');
                            }
                        }}
                    >
                        {t('common.t_open')}
                    </Button>
                </CardActions>
            </CardGradient>
        </ListItem>
    );
}

EmulatorItem.propTypes = {
    emulators: PropTypes.array,
};
