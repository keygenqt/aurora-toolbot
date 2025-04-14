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
    PsdkAvailableModel,
    PsdkInstalledModel,
} from '../../../models';

import { AppUtils } from '../../../base';

export const psdk = {
    psdkAvailable: async function () {
        try {
            let data = await invoke("psdk_available", {});
            let selector = SelectorModel.parse(data);
            if (selector !== undefined) {
                return AppUtils.asyncJoin(selector.variants.map((e) => async () => {
                    return PsdkAvailableModel.parse(await invoke("psdk_available_by_id", { id: e['incoming']['id'] }));
                }));
            }
            return [PsdkAvailableModel.parse(data)];
        } catch (e) {
            return null;
        }
    },
    psdkInfo: async function () {
        try {
            let data = await invoke("psdk_info", {});
            let selector = SelectorModel.parse(data);
            if (selector !== undefined) {
                return AppUtils.asyncJoin(selector.variants.map((e) => async () => {
                    return PsdkInstalledModel.parse(await invoke("psdk_info_by_id", { id: e['incoming']['id'] }));
                }));
            }
            return [PsdkInstalledModel.parse(data)];
        } catch (e) {
            return null;
        }
    },
    psdkSync: async function () {
        return AppUtils.checkResponse(await invoke("psdk_sync", {}));
    },
    psdkTerminalById: async function (id) {
        AppUtils.checkResponse(await invoke("psdk_terminal_by_id", { id: id }));
    },
}
