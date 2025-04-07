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

import {
    useTheme,
    Typography,
    ListItem,
    List,
    Card,
    CardContent,
    CardHeader,
    CardActions,
    Chip,
    Box,
    Tooltip,
    IconButton,
    Avatar,
    Stack,
} from '@mui/material';

import { OpenInNew, Done } from '@mui/icons-material';

import {
    AppUtils,
    StateEmpty,
    ActionBack,
    ActionRefreshState,
    StateLoading,
} from '../../base';

import { Methods } from '../../modules';
import { AppBarLayout } from '../../layouts';

export function PsdksAvailablePage(props) {
    // components
    const theme = useTheme();
    const { t } = useTranslation();
    const dispatch = useDispatch();
    // data
    const [isUpdate, setIsUpdate] = React.useState(false);
    // redux
    const psdkInstalled = useSelector((state) => state.psdkInstalled.value);
    const psdkAvailable = useSelector((state) => state.psdkAvailable.value);
    // fun
    const updateStates = async () => {
        setIsUpdate(true);
        try {
            dispatch(setPsdkAvailable(await Methods.psdkAvailable()));
        } catch (e) {
            dispatch(setPsdkAvailable(null));
        }
        setIsUpdate(false);
    };
    const fnIsInstall = React.useCallback(
        (model) => {
            if (!Array.isArray(psdkInstalled)) {
                return false;
            }
            for (const i of psdkInstalled) {
                if (model.versionFull == i.versionId) {
                    return true;
                }
            }
            return false;
        }, [psdkInstalled]);
    // states
    if (!psdkAvailable) {
        return (<StateEmpty />);
    }
    // page
    return (
        <AppBarLayout index actions={(
            <Stack direction={'row'} spacing={1}>
                <ActionBack disabled={isUpdate} />
                <ActionRefreshState
                    animate={isUpdate}
                    onClick={async () => {
                        await updateStates();
                    }}
                />
            </Stack>
        )} >
            {Array.isArray(psdkAvailable) && psdkAvailable.length === 0 ? (
                <StateEmpty />
            ) : (
                <>
                    {isUpdate ? (<StateLoading />) : (
                        <List>
                            {psdkAvailable.map((e, index) => {
                                let isInstall = fnIsInstall(e);
                                let color = isInstall ? theme.palette.primary.main : theme.palette.primaryPsdk.main;
                                let urlRepo = e.urls[0].split('/').slice(0, -1).join('/');
                                let arches = []
                                for (const url of e.urls) {
                                    if (url.includes('Target')) {
                                        try {
                                            arches.push(url.split('-').filter((e) => e.includes('tar'))[0].split('.')[0])
                                        } catch (e) { }
                                    }
                                }
                                return (
                                    <ListItem key={`key-${index}`}>
                                        <Card
                                            sx={{
                                                border: `1px solid ${color}5e`,
                                                background: `linear-gradient(to right, transparent 0%, ${color}1c 100%)`
                                            }}
                                        >
                                            <CardHeader
                                                avatar={isInstall && (
                                                    <Avatar sx={{ bgcolor: color }} aria-label="recipe">
                                                        <Done color={'white'} />
                                                    </Avatar>
                                                )}
                                                title={`Platform SDK`}
                                                subheader={`v${e.versionFull}`}
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
                                        </Card>
                                    </ListItem>
                                );
                            })}
                        </List>
                    )}
                </>
            )}
        </AppBarLayout>
    );
}

PsdksAvailablePage.propTypes = {};
