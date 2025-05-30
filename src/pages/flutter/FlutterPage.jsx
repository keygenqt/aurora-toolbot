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

import { useSelector, useDispatch } from 'react-redux';
import { setData as setFlutterInstalled } from '../../store/impl/flutterInstalled';
import { keysStateBool } from '../../store/impl/stateBool';

import { Stack } from '@mui/material';

import { setEffectStateBool } from '../../base';
import { ListLayout } from '../../layouts';
import { Methods } from '../../modules';

import { FlutterGroupTools } from './elements/FlutterGroupTools';
import { FlutterHeader } from './elements/FlutterHeader';

export function FlutterPage(props) {
    // components
    const { state } = useLocation();
    const dispatch = useDispatch();
    // data
    const reduxKey = keysStateBool.fluttersUpdate;
    // states
    const [isUpdateItem, setIsUpdateItem] = React.useState(false);
    const [isAnimateLoading, setIsAnimateLoading] = React.useState(false);
    // redux
    const flutterInstalled = useSelector((state) => state.flutterInstalled.value);
    // fun
    const updateStatesSilent = async () => {
        dispatch(setFlutterInstalled(await Methods.flutter_info()));
    };
    const updateStates = async () => {
        setEffectStateBool(dispatch, reduxKey, true);
        await updateStatesSilent();
        await new Promise(r => setTimeout(r, 400)); // animation delay
        setEffectStateBool(dispatch, reduxKey, false);
    };
    // page
    return (
        <ListLayout
            disable={isUpdateItem}
            animate={isAnimateLoading}
            models={flutterInstalled}
            updateStates={updateStates}
            reduxKey={reduxKey}
            itemList={(model) => {
                return model.id !== state.id ? null : (
                    <Stack
                        direction={'column'}
                        spacing={3}
                        sx={{ width: 1 }}
                    >
                        <FlutterHeader
                            model={model}
                            isUpdate={isUpdateItem || isAnimateLoading}
                            onUpdate={(state) => setIsUpdateItem(state)}
                            onAnimate={(state) => setIsAnimateLoading(state)}
                            onRefresh={updateStatesSilent}
                        />
                        <FlutterGroupTools
                            model={model}
                            disabled={isUpdateItem || isAnimateLoading}
                            onAnimate={(state) => setIsAnimateLoading(state)}
                        />
                    </Stack>
                )
            }}
        />
    );
}

FlutterPage.propTypes = {};
