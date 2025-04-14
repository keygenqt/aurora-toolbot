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
    FlutterAvailableModel,
    FlutterInstalledModel,
} from '../../../models';

import { AppUtils } from '../../../base';

export const flutter = {
    flutterAvailable: async function () {
        try {
            let data = await invoke("flutter_available", {});
            let selector = SelectorModel.parse(data);
            if (selector !== undefined) {
                return AppUtils.asyncJoin(selector.variants.map((e) => async () => {
                    return FlutterAvailableModel.parse(await invoke("flutter_available_by_id", { id: e['incoming']['id'] }));
                }));
            }
            return [FlutterAvailableModel.parse(data)];
        } catch (e) {
            return null;
        }
    },
    flutterInfo: async function () {
        try {
            let data = await invoke("flutter_info", {});
            let selector = SelectorModel.parse(data);
            if (selector !== undefined) {
                return AppUtils.asyncJoin(selector.variants.map((e) => async () => {
                    return FlutterInstalledModel.parse(await invoke("flutter_info_by_id", { id: e['incoming']['id'] }));
                }));
            }
            return [FlutterInstalledModel.parse(data)];
        } catch (e) {
            return null;
        }
    },
    flutterSync: async function () {
        return AppUtils.checkResponse(await invoke("flutter_sync", {}));
    },
    flutterTerminalById: async function (id) {
        AppUtils.checkResponse(await invoke("flutter_terminal_by_id", { id: id }));
    },
}
