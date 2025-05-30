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

import { useSelector, useDispatch } from 'react-redux';
import { setData as setDevices } from '../../store/impl/devices';
import { setData as setEmulators } from '../../store/impl/emulators';
import { setData as setSdkInstalled } from '../../store/impl/sdkInstalled';
import { setData as setSdkAvailable } from '../../store/impl/sdkAvailable';
import { setData as setPsdkInstalled } from '../../store/impl/psdkInstalled';
import { setData as setPsdkAvailable } from '../../store/impl/psdkAvailable';
import { setData as setFlutterInstalled } from '../../store/impl/flutterInstalled';
import { setData as setFlutterAvailable } from '../../store/impl/flutterAvailable';

import { List, Stack } from '@mui/material';

import { useEffectSingleTimeout, AppUtils, ActionMenu, ActionRefreshState } from '../../base';
import { AppBarLayout } from '../../layouts'
import { Methods } from '../../modules';

import { DeviceItem } from './elements/DeviceItem';
import { EmulatorItem } from './elements/EmulatorItem';
import { FAQItem } from './elements/FAQItem';
import { FlutterItem } from './elements/FlutterItem';
import { GroupWidget } from './elements/GroupWidget';
import { PsdkItem } from './elements/PsdkItem';
import { SdkItem } from './elements/SdkItem';

export function FeaturesPage(props) {
    // components
    const { t } = useTranslation();
    const dispatch = useDispatch();
    // data
    const [isUpdate, setIsUpdate] = React.useState(false);
    // redux
    const devices = useSelector((state) => state.devices.value);
    const emulators = useSelector((state) => state.emulators.value);
    const sdkInstalled = useSelector((state) => state.sdkInstalled.value);
    const sdkAvailable = useSelector((state) => state.sdkAvailable.value);
    const psdkInstalled = useSelector((state) => state.psdkInstalled.value);
    const psdkAvailable = useSelector((state) => state.psdkAvailable.value);
    const flutterInstalled = useSelector((state) => state.flutterInstalled.value);
    const flutterAvailable = useSelector((state) => state.flutterAvailable.value);
    // fun
    const clearStates = () => {
        dispatch(setDevices(undefined));
        dispatch(setEmulators(undefined));
        dispatch(setSdkInstalled(undefined));
        dispatch(setSdkAvailable(undefined));
        dispatch(setPsdkInstalled(undefined));
        dispatch(setPsdkAvailable(undefined));
        dispatch(setFlutterInstalled(undefined));
        dispatch(setFlutterAvailable(undefined));
    };
    const updateStates = async (refresh) => {
        setIsUpdate(true)
        await AppUtils.asyncJoin(
            (devices || devices === null) && !refresh ? null : async () => {
                dispatch(setDevices(await Methods.device_info()));
            },
            (emulators || emulators === null) && !refresh ? null : async () => {
                dispatch(setEmulators(await Methods.emulator_info()));
            },
            (sdkInstalled || sdkInstalled === null) && !refresh ? null : async () => {
                dispatch(setSdkInstalled(await Methods.sdk_info()));
            },
            (sdkAvailable || sdkAvailable === null) && !refresh ? null : async () => {
                dispatch(setSdkAvailable(await Methods.sdk_available()));
            },
            (psdkInstalled || psdkInstalled === null) && !refresh ? null : async () => {
                dispatch(setPsdkInstalled(await Methods.psdk_info()));
            },
            (psdkAvailable || psdkAvailable === null) && !refresh ? null : async () => {
                dispatch(setPsdkAvailable(await Methods.psdk_available()));
            },
            (flutterInstalled || flutterInstalled === null) && !refresh ? null : async () => {
                dispatch(setFlutterInstalled(await Methods.flutter_info()));
            },
            (flutterAvailable || flutterAvailable === null) && !refresh ? null : async () => {
                dispatch(setFlutterAvailable(await Methods.flutter_available()));
            },
        )
        setIsUpdate(false)
    };
    // init
    useEffectSingleTimeout(async () => {
        await updateStates(false);
    });
    // page
    return (
        <AppBarLayout actions={(
            <Stack direction={'row'} spacing={1}>
                <ActionMenu />
                <ActionRefreshState
                    animate={isUpdate}
                    onClick={async () => {
                        setIsUpdate(true);
                        clearStates();
                        await updateStates(true);
                        setIsUpdate(false);
                    }}
                />
            </Stack>
        )} >
            <List>
                <GroupWidget
                    title={t('features.devices.t_title')}
                    text={t('features.devices.t_text')}
                />
                <DeviceItem
                    devices={devices}
                />
                <EmulatorItem
                    emulators={emulators}
                />
                <GroupWidget
                    title={t('features.tools.t_title')}
                    text={t('features.tools.t_text')}
                />
                <SdkItem
                    sdkInstalled={sdkInstalled}
                    sdkAvailable={sdkAvailable}
                />
                <PsdkItem
                    psdkInstalled={psdkInstalled}
                    psdkAvailable={psdkAvailable}
                />
                <FlutterItem
                    flutterInstalled={flutterInstalled}
                    flutterAvailable={flutterAvailable}
                />
                <GroupWidget
                    title={t('features.assistant.t_title')}
                    text={t('features.assistant.t_text')}
                />
                <FAQItem />
            </List>
        </AppBarLayout>
    );
}

FeaturesPage.propTypes = {};
