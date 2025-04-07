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

import { useSelector } from 'react-redux';

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
} from '@mui/material';

import { OpenInNew, Done, InsertLink } from '@mui/icons-material';

import { AppUtils, StateEmpty } from '../../base';

export function FluttersAvailablePage(props) {
    // components
    const theme = useTheme();
    const { t } = useTranslation();
    // redux
    const flutterInstalled = useSelector((state) => state.flutterInstalled.value);
    const flutterAvailable = useSelector((state) => state.flutterAvailable.value);
    // fn - check is install
    const fnIsInstall = React.useCallback(
        (model) => {
            if (!Array.isArray(flutterInstalled)) {
                return false;
            }
            for (const i of flutterInstalled) {
                if (model.version == i.flutterVersion) {
                    return true;
                }
            }
            return false;
        }, [flutterInstalled]);
    // states
    if (!flutterAvailable) {
        return (<StateEmpty />);
    }
    // page
    return (
        <List>
            {flutterAvailable.map((e, index) => {
                let isInstall = fnIsInstall(e);
                let color = isInstall ? theme.palette.primary.main : theme.palette.primaryFlutter.main;
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
                                title={`Flutter SDK`}
                                subheader={`v${e.version}`}
                                sx={{
                                    paddingBottom: 0,
                                    '& .MuiCardHeader-title': {
                                        paddingBottom: 0.5,
                                    }
                                }}
                            />
                            <CardContent>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    {t('fluttersAvailable.t_text')}
                                </Typography>
                            </CardContent>
                            <CardActions sx={{
                                p: 2,
                                paddingTop: 0
                            }}>
                                <Chip
                                    icon={<FontAwesomeIcon icon="fa-solid fa-tag" />}
                                    label={e.tag}
                                />
                                <Box sx={{ flexGrow: 1 }} />

                                <Tooltip title={t('common.t_link_to_file')} placement="left-start">
                                    <IconButton
                                        onClick={async () => {
                                            await AppUtils.openUrl(e.urlZip);
                                        }}
                                    >
                                        <InsertLink />
                                    </IconButton>
                                </Tooltip>

                                <Tooltip title={t('common.t_open_repo')} placement="left-start">
                                    <IconButton
                                        onClick={async () => {
                                            await AppUtils.openUrl(e.urlGitlab);
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
    );
}

FluttersAvailablePage.propTypes = {};
