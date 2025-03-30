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
import { debug } from '@tauri-apps/plugin-log';
import { invoke } from "@tauri-apps/api/core";

import {
    SelectorModel,
    EmulatorModel,
    SdkAvailableModel,
    SdkInstalledModel,
    PsdkAvailableModel,
    PsdkInstalledModel,
    FlutterAvailableModel,
    FlutterInstalledModel,
} from '../../models';

import { AppUtils } from '../../base';

/**
 * Tauri application methods
 */
export const MethodsDbus = {
    appInfo: async function () {
        return await invoke("app_info", {});
    },
    emulators: async function () {
        let data = await invoke("emulator_info", {});
        let selector = SelectorModel.parse(data);
        if (selector !== undefined) {
            return AppUtils.asyncJoin(selector.variants.map((e) => async () => {
                return EmulatorModel.parse(await invoke("emulator_info_by_id", { id: e['incoming']['id'] }));
            }));
        }
        return [EmulatorModel.parse(data)];
    },
    sdkAvailable: async function () {
        let data = await invoke("sdk_available", {});
        let selector = SelectorModel.parse(data);
        if (selector !== undefined) {
            return AppUtils.asyncJoin(selector.variants.map((e) => async () => {
                return SdkAvailableModel.parse(await invoke("sdk_available_by_id", { id: e['incoming']['id'] }));
            }));
        }
        return [SdkAvailableModel.parse(data)];
    },
    sdkInstalled: async function () {
        let data = await invoke("sdk_info", {});
        let selector = SelectorModel.parse(data);
        if (selector !== undefined) {
            return AppUtils.asyncJoin(selector.variants.map((e) => async () => {
                return SdkInstalledModel.parse(await invoke("sdk_info_by_id", { id: e['incoming']['id'] }));
            }));
        }
        return [SdkInstalledModel.parse(data)];
    },
    psdkAvailable: async function () {
        let data = await invoke("psdk_available", {});
        let selector = SelectorModel.parse(data);
        if (selector !== undefined) {
            return AppUtils.asyncJoin(selector.variants.map((e) => async () => {
                return PsdkAvailableModel.parse(await invoke("psdk_available_by_id", { id: e['incoming']['id'] }));
            }));
        }
        return [PsdkAvailableModel.parse(data)];
    },
    psdkInstalled: async function () {
        let data = await invoke("psdk_info", {});
        let selector = SelectorModel.parse(data);
        if (selector !== undefined) {
            return AppUtils.asyncJoin(selector.variants.map((e) => async () => {
                return PsdkInstalledModel.parse(await invoke("psdk_info_by_id", { id: e['incoming']['id'] }));
            }));
        }
        return [PsdkInstalledModel.parse(data)];
    },
    flutterAvailable: async function () {
        let data = await invoke("flutter_available", {});
        let selector = SelectorModel.parse(data);
        if (selector !== undefined) {
            return AppUtils.asyncJoin(selector.variants.map((e) => async () => {
                return FlutterAvailableModel.parse(await invoke("flutter_available_by_id", { id: e['incoming']['id'] }));
            }));
        }
        return [FlutterAvailableModel.parse(data)];
    },
    flutterInstalled: async function () {
        let data = await invoke("flutter_info", {});
        let selector = SelectorModel.parse(data);
        if (selector !== undefined) {
            return AppUtils.asyncJoin(selector.variants.map((e) => async () => {
                return FlutterInstalledModel.parse(await invoke("flutter_info_by_id", { id: e['incoming']['id'] }));
            }));
        }
        return [FlutterInstalledModel.parse(data)];
    },
    log: function (message) {
        debug(message)
    }
}
