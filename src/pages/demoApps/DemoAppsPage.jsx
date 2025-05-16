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

import {
    useTheme,
    Box,
    CardHeader,
    Avatar,
    Button,
    Typography,
    Stack,
} from '@mui/material';

import {
    CloudDownload,
} from '@mui/icons-material';

import {
    useEffectSingleTimeout,
    CardGradient,
} from '../../base';

import { Methods } from '../../modules';
import { ListLayout } from '../../layouts';

export function DemoAppsPage(props) {
    // components
    const { t } = useTranslation();
    const theme = useTheme();
    // data
    const color = theme.palette.secondary.main;
    const [demoApps, setDemoApps] = React.useState(undefined);
    // fun
    const updateStates = async () => {
        setDemoApps(undefined);
        await new Promise(r => setTimeout(r, 400)); // animation delay
        setDemoApps(await Methods.demo_app_info());
    };
    // init
    useEffectSingleTimeout(async () => {
        await updateStates();
    });
    // page
    return (
        <ListLayout
            models={demoApps}
            updateStates={updateStates}
            itemList={(model) => (
                <CardGradient color={color}>
                    <CardHeader
                        sx={{
                            alignItems: 'flex-start',
                            '& .MuiTypography-root': {
                                paddingBottom: 0.8
                            }
                        }}
                        avatar={
                            <Avatar src={model.icon}>
                                {model.name[0]}
                            </Avatar>
                        }
                        title={model.name}
                        subheader={
                            <Stack
                                direction={'column'}
                                spacing={0.8}
                            >
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    {model.desc}
                                </Typography>
                                <Box>
                                    <Button
                                        size={'small'}
                                        color={'secondary'}
                                        startIcon={<CloudDownload color="default" />}
                                        variant="contained"
                                        sx={{ opacity: 0.9 }}
                                        onClick={() => {
                                            // @todo
                                        }}
                                    >
                                        {t('common.t_install')}
                                    </Button>
                                </Box>
                            </Stack>
                        }
                    />
                </CardGradient>
            )}
        />
    );
}

DemoAppsPage.propTypes = {};
