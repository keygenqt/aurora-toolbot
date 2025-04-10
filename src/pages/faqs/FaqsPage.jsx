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
    Card,
    CardContent,
    Stack,
} from '@mui/material'

import {
    useEffectSingleTimeout,
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
        setModels(await Methods.faqSearch(state.search));
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
                    <CardContent>
                        <Stack
                            direction={'column'}
                            spacing={1}
                        >
                            <Typography variant="subtitle2" color={color} >
                                {model.title}
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                {model.text.replace("⌫", "")}
                            </Typography>
                        </Stack>
                    </CardContent>
                </CardGradient>
            )}
        />
    );
}

FaqsPage.propTypes = {};
