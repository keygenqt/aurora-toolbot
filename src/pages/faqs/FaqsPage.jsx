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
import { useLocation } from "react-router";

import {
    useTheme,
    Typography,
    CardContent,
    Stack,
    CardMedia,
    IconButton,
    Box,
} from '@mui/material';

import { Star, Link } from '@mui/icons-material';

import {
    useEffectSingleTimeout,
    AppUtils,
    CardGradient,
} from '../../base';

import { Methods } from '../../modules';
import { ListLayout } from '../../layouts';


export function FaqsPage(props) {
    // components
    let { state } = useLocation();
    const theme = useTheme();
    // data
    const [models, setModels] = React.useState(undefined);
    const color = theme.palette.info.main;
    // fun
    const updateStates = async () => {
        setModels(undefined);
        await new Promise(r => setTimeout(r, 800)); // animation delay
        setModels(await Methods.faq_search(state.search));
    };
    // init
    useEffectSingleTimeout(async () => {
        await updateStates();
    });
    // page
    return (
        <ListLayout
            models={models}
            updateStates={updateStates}
            itemList={(model) => (
                <CardGradient color={color}>
                    {model.image && (
                        <CardMedia
                            component={'img'}
                            image={model.image}
                            alt={model.title}
                        />
                    )}
                    <CardContent>
                        <Stack
                            direction={'column'}
                            spacing={2}
                        >
                            <Stack
                                direction={'row'}
                                spacing={2}
                            >
                                <IconButton
                                    color="inherit"
                                    onClick={async () => {
                                        await AppUtils.openUrl(model.url)
                                    }}
                                >
                                    <Link />
                                </IconButton>
                                <Typography variant="subtitle1" color={color} >
                                    {model.title}
                                </Typography>
                            </Stack>

                            <Stack
                                direction={'column'}
                                spacing={0.5}
                            >
                                <Typography variant="body2" >
                                    {new Date(model.timestamp * 1000).toLocaleDateString("ru-RU")}, {model.fname} {model.lname}
                                </Typography>

                                <Stack
                                    direction={'row'}
                                    spacing={0.2}
                                    sx={{
                                        marginLeft: '-2px',
                                        '& .MuiSvgIcon-root': {
                                            color: '#F5A41C'
                                        }
                                    }}
                                >
                                    {new Array(Math.floor(model.rating)).fill(0).map((e) => (
                                        <Star fontSize={'small'} />
                                    ))}
                                </Stack>
                            </Stack>

                            {/* @todo - html telegram parser */}
                            <Box
                                sx={{
                                    borderRadius: 2,
                                    paddingY: 2,
                                    paddingX: 1,
                                    backgroundColor: 'background.default',
                                    overflow: 'hidden'
                                }}
                            >
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    <span dangerouslySetInnerHTML={{ __html: model.text.replaceAll("\n", "<br/>").split("5.")[0] }} />
                                </Typography>
                            </Box>

                        </Stack>
                    </CardContent>
                </CardGradient>
            )}
        />
    );
}

FaqsPage.propTypes = {};
