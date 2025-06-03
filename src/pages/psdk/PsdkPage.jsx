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

import { Stack } from '@mui/material';

import { setEffectStateBool } from '../../base';
import { ListLayout } from '../../layouts';
import { Methods } from '../../modules';

import { PsdkGroupTargets } from './elements/PsdkGroupTargets';
import { PsdkGroupTools } from './elements/PsdkGroupTools';
import { PsdkHeader } from './elements/PsdkHeader';

export function PsdkPage(props) {
    // components
    const { state } = useLocation();
    const dispatch = useDispatch();
    // data
    const reduxKey = keysStateBool.psdksUpdate;
    // states
    const [isUpdateItem, setIsUpdateItem] = React.useState(false);
    const [isAnimateLoading, setIsAnimateLoading] = React.useState(false);
    // redux
    const psdkInstalled = useSelector((state) => state.psdkInstalled.value);
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
            models={psdkInstalled}
            updateStates={updateStates}
            reduxKey={reduxKey}
            itemList={(model) => {
                return model.id !== state.id ? null : (
                    <Stack
                        direction={'column'}
                        spacing={3}
                        sx={{ width: 1 }}
                    >
                        <PsdkHeader
                            model={model}
                            isUpdate={isUpdateItem || isAnimateLoading}
                            onUpdate={(state) => setIsUpdateItem(state)}
                            onAnimate={(state) => setIsAnimateLoading(state)}
                            onRefresh={updateStatesSilent}
                        />
                        <PsdkGroupTools
                            model={model}
                            disabled={isUpdateItem || isAnimateLoading}
                        />
                        <PsdkGroupTargets
                            model={model}
                            disabled={isUpdateItem || isAnimateLoading}
                        />
                    </Stack>
                )
            }}
        />
    );
}

PsdkPage.propTypes = {};
