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
import { setData as setSdkInstalled } from '../../store/impl/sdkInstalled';
import { keysStateBool } from '../../store/impl/stateBool';

import { useTheme, Stack } from '@mui/material';

import { setEffectStateBool } from '../../base';
import { ListLayout } from '../../layouts';
import { Methods } from '../../modules';

import { SdkGroupTools } from './elements/SdkGroupTools';
import { SdkHeader } from './elements/SdkHeader';

export function SdkPage(props) {
    // components
    const { state } = useLocation();
    const dispatch = useDispatch();
    const theme = useTheme();
    // data
    const reduxKey = keysStateBool.psdksUpdate;
    const [isUpdateItem, setIsUpdateItem] = React.useState(false);
    // redux
    const sdkInstalled = useSelector((state) => state.sdkInstalled.value);
    // fun
    const updateStatesSilent = async () => {
        dispatch(setSdkInstalled(await Methods.sdk_info()));
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
            models={sdkInstalled}
            updateStates={updateStates}
            reduxKey={reduxKey}
            itemList={(model) => {
                return model.id !== state.id ? null : (
                    <Stack
                        direction={'column'}
                        spacing={3}
                        sx={{ width: 1 }}
                    >
                        <SdkHeader
                            model={model}
                            isUpdate={isUpdateItem}
                            onUpdate={(state) => setIsUpdateItem(state)}
                            onRefresh={updateStatesSilent}
                        />
                        <SdkGroupTools
                            model={model}
                            disabled={isUpdateItem || model.is_running}
                        />
                    </Stack>
                )
            }}
        />
    );
}

SdkPage.propTypes = {};
