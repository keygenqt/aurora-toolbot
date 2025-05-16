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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useSelector, useDispatch } from 'react-redux';
import { setData as setPsdkAvailable } from '../../store/impl/psdkAvailable';
import { keysStateBool } from '../../store/impl/stateBool';

import {
    useTheme,
    Typography,
    CardContent,
    CardHeader,
    CardActions,
    Chip,
    Box,
    Tooltip,
    IconButton,
    Avatar,
} from '@mui/material';

import { OpenInNew, Done } from '@mui/icons-material';

import { setEffectStateBool, AppUtils, CardGradient } from '../../base';
import { Methods } from '../../modules';
import { ListLayout } from '../../layouts';

export function PsdksAvailablePage(props) {
    // components
    const theme = useTheme();
    const { t } = useTranslation();
    const dispatch = useDispatch();
    // data
    const reduxKey = keysStateBool.psdksUpdate;
    // redux
    const psdkInstalled = useSelector((state) => state.psdkInstalled.value);
    const psdkAvailable = useSelector((state) => state.psdkAvailable.value);
    // fun
    const updateStates = async () => {
        setEffectStateBool(dispatch, reduxKey, true);
        dispatch(setPsdkAvailable(await Methods.psdk_available()));
        await new Promise(r => setTimeout(r, 400)); // animation delay
        setEffectStateBool(dispatch, reduxKey, false);
    };
    // page
    return (
        <ListLayout
            models={psdkAvailable}
            updateStates={updateStates}
            reduxKey={reduxKey}
            itemList={(model) => {
                const isInstall = AppUtils.isInstall(psdkInstalled, model, (i, a) => {
                    return i.version_id == a.version_full;
                });
                const color = isInstall ? theme.palette.primary.main : theme.palette.primaryPsdk.main;
                let urlRepo = model.urls[0].split('/').slice(0, -1).join('/');
                let arches = []
                for (const url of model.urls) {
                    if (url.includes('Target')) {
                        try {
                            arches.push(url.split('-').filter((e) => e.includes('tar'))[0].split('.')[0])
                        } catch (e) { }
                    }
                }
                return (
                    <CardGradient color={color}>
                        <CardHeader
                            avatar={isInstall && (
                                <Avatar sx={{ bgcolor: color }} aria-label="recipe">
                                    <Done color={'white'} />
                                </Avatar>
                            )}
                            title={`Platform SDK`}
                            subheader={`v${model.version_full}`}
                            sx={{
                                paddingBottom: 0,
                                '& .MuiCardHeader-title': {
                                    paddingBottom: 0.5,
                                }
                            }}
                        />
                        <CardContent>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                {t('psdksAvailable.t_text')}
                            </Typography>
                        </CardContent>
                        <CardActions sx={{
                            p: 2,
                            paddingTop: 0
                        }}>
                            <Chip
                                icon={<FontAwesomeIcon icon="fa-solid fa-microchip" />}
                                label={`${arches.join(", ")}`}
                            />
                            <Box sx={{ flexGrow: 1 }} />
                            <Tooltip title={t('common.t_open_repo')} placement="left-start">
                                <IconButton
                                    onClick={async () => {
                                        await AppUtils.openUrl(urlRepo);
                                    }}
                                >
                                    <OpenInNew />
                                </IconButton>
                            </Tooltip>
                        </CardActions>
                    </CardGradient>
                )
            }}
        />
    );
}

PsdksAvailablePage.propTypes = {};
