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
import { setData as setEmulators } from '../../store/impl/emulators';
import { keysStateBool } from '../../store/impl/stateBool';

import { Stack } from '@mui/material';

import { setEffectStateBool } from '../../base';
import { ListLayout } from '../../layouts';
import { Methods } from '../../modules';

import { EmulatorHeader } from './elements/EmulatorHeader';
import { EmulatorGroupTools } from './elements/EmulatorGroupTools';


export function EmulatorPage(props) {
    // components
    let { state } = useLocation();
    const dispatch = useDispatch();
    // data
    const reduxKey = keysStateBool.emulatorsUpdate;
    // states
    const [isUpdateItem, setIsUpdateItem] = React.useState(false);
    const [isAnimateLoading, setIsAnimateLoading] = React.useState(false);
    // redux
    const emulators = useSelector((state) => state.emulators.value);
    // fun
    const updateStatesSilent = async () => {
        dispatch(setEmulators(await Methods.emulator_info()));
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
            models={emulators}
            updateStates={updateStates}
            reduxKey={reduxKey}
            itemList={(model) => {
                return model.id !== state.id ? null : (
                    <Stack
                        direction={'column'}
                        spacing={3}
                        sx={{ width: 1 }}
                    >
                        <EmulatorHeader
                            model={model}
                            isUpdate={isUpdateItem || isAnimateLoading}
                            isAnimate={isAnimateLoading}
                            onUpdate={(state) => setIsUpdateItem(state)}
                            onAnimate={(state) => setIsAnimateLoading(state)}
                            onRefresh={updateStatesSilent}
                        />
                        <EmulatorGroupTools
                            model={model}
                            disabled={isUpdateItem || isAnimateLoading || !model.is_running}
                            onAnimate={(state) => setIsAnimateLoading(state)}
                        />
                    </Stack>
                )
            }}
        />
    );
}

EmulatorPage.propTypes = {};
