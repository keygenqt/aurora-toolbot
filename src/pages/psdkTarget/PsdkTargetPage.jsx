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
import { setData as setPsdkInstalled } from '../../store/impl/psdkInstalled';
import { keysStateBool } from '../../store/impl/stateBool';

import { useTheme, Stack } from '@mui/material';

import { setEffectStateBool } from '../../base';
import { ListLayout } from '../../layouts';
import { Methods } from '../../modules';

import { PsdkTargetGroupTools } from './elements/PsdkTargetGroupTools';
import { PsdkTargetHeader } from './elements/PsdkTargetHeader';

export function PsdkTargetPage(props) {
    // components
    const { state } = useLocation();
    const dispatch = useDispatch();
    const theme = useTheme();
    // data
    const reduxKey = keysStateBool.psdksUpdate;
    // states
    const [isUpdateItem, setIsUpdateItem] = React.useState(false);
    const [isAnimateLoading, setIsAnimateLoading] = React.useState(false);
    // redux
    const psdkInstalled = useSelector((state) => state.psdkInstalled.value);
    const model = psdkInstalled.filter((model) => model.id === state.id);
    const targets = model === undefined ? undefined : model[0].targets;
    // fun
    const updateStatesSilent = async () => {
        dispatch(setPsdkInstalled(await Methods.psdk_info()));
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
            models={targets}
            updateStates={updateStates}
            reduxKey={reduxKey}
            itemList={(target) => {
                return target.id !== state.idTarget ? null : (
                    <Stack
                        direction={'column'}
                        spacing={3}
                        sx={{ width: 1 }}
                    >
                        <PsdkTargetHeader
                            model={model[0]}
                            target={target}
                            isUpdate={isUpdateItem || isAnimateLoading}
                            onUpdate={(state) => setIsUpdateItem(state)}
                            onAnimate={(state) => setIsAnimateLoading(state)}
                            onRefresh={updateStatesSilent}
                        />
                        <PsdkTargetGroupTools
                            model={model[0]}
                            target={target}
                            disabled={isUpdateItem || isAnimateLoading}
                            onAnimate={(state) => setIsAnimateLoading(state)}
                        />
                    </Stack>
                )
            }}
        />
    );
}

PsdkTargetPage.propTypes = {};
