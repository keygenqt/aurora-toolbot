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
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import PropTypes from 'prop-types';

import {
    useTheme,
    Typography,
    ListItem,
    Card,
    CardContent,
    Box,
    CardActions,
    Tooltip,
    IconButton,
    CircularProgress,
    Button,
} from '@mui/material';

import { Cached, KeyboardArrowRight } from '@mui/icons-material';

import { AppUtils } from '../../../base';

export function EmulatorItem(props) {
    // components
    const { t } = useTranslation();
    const theme = useTheme();
    const navigate = useNavigate();
    // data
    const color = theme.palette.secondary.main
    const {
        emulators
    } = props
    // item
    return (
        <ListItem>
            <Card
                sx={{
                    border: `1px solid ${color}5e`,
                    background: `linear-gradient(to right, transparent 0%, ${color}1c 100%)`
                }}
            >
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
                    {Array.isArray(emulators) && (
                        <Tooltip title={t('common.t_sync')} placement="left-start">
                            <IconButton
                                onClick={() => {

                                }}
                            >
                                <Cached />
                            </IconButton>
                        </Tooltip>
                    )}

                    <Box sx={{ flexGrow: 1 }} />

                    <Button
                        disabled={!Array.isArray(emulators)}
                        size={'small'}
                        color={'secondary'}
                        endIcon={!Array.isArray(emulators) ? (
                            <CircularProgress color="default" />
                        ) : (
                            <KeyboardArrowRight color="default" />
                        )}
                        variant="contained"
                        sx={{ opacity: 0.8 }}
                        onClick={() => {
                            AppUtils.openPage(navigate, 'emulators');
                        }}
                    >
                        {t('common.t_open')}
                    </Button>
                </CardActions>
            </Card>
        </ListItem>
    );
}

EmulatorItem.propTypes = {
    emulators: PropTypes.array,
};
