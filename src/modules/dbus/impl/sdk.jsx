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
import { invoke } from "@tauri-apps/api/core";

import {
    SelectorModel,
    SdkAvailableModel,
    SdkInstalledModel,
} from '../../../models';

import { AppUtils } from '../../../base';

export const sdk = {
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
    sdkSync: async function () {
        return await invoke("sdk_sync", {});
    },
}
