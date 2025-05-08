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
    DeviceModel,
} from '../../../models';

import { AppUtils } from '../../../base';

export const device = {
    deviceInfo: async function () {
        try {
            let data = await invoke("device_info", {});
            let selector = SelectorModel.parse(data);
            if (selector !== undefined) {
                return AppUtils.asyncJoin(selector.variants.map((e) => async () => {
                    return DeviceModel.parse(await invoke("device_info_by_id", { id: e['incoming']['id'] }));
                }));
            }
            return [DeviceModel.parse(data)];
        } catch (e) {
            return null;
        }
    },
    deviceSync: async function () {
        AppUtils.checkResponse(await invoke("device_sync", {}))
    },
    deviceTerminalById: async function (id) {
        AppUtils.checkResponse(await invoke("device_terminal_by_id", { id: id }));
    },
}
