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
    EmulatorModel,
} from '../../../models';

import { AppUtils } from '../../../base';

export const emulator = {
    emulatorCloseById: async function (id) {
        AppUtils.checkResponse(await invoke("emulator_close_by_id", { id: id }));
    },
    emulatorInfo: async function () {
        try {
            let data = await invoke("emulator_info", {});
            let selector = SelectorModel.parse(data);
            if (selector !== undefined) {
                return AppUtils.asyncJoin(selector.variants.map((e) => async () => {
                    return EmulatorModel.parse(await invoke("emulator_info_by_id", { id: e['incoming']['id'] }));
                }));
            }
            return [EmulatorModel.parse(data)];
        } catch (e) {
            return null;
        }
    },
    emulatorOpenById: async function (id) {
        AppUtils.checkResponse(await invoke("emulator_open_by_id", { id: id }));
    },
    emulatorRecordStartById: async function (id) {
        AppUtils.checkResponse(await invoke("emulator_record_start_by_id", { id: id }));
    },
    emulatorRecordStopById: async function (id) {
        AppUtils.checkResponse(await invoke("emulator_record_stop_by_id", { id: id }));
    },
    emulatorScreenshotById: async function (id) {
        AppUtils.checkResponse(await invoke("emulator_screenshot_by_id", { id: id }));
    },
    emulatorSync: async function () {
        AppUtils.checkResponse(await invoke("emulator_sync", {}))
    },
    emulatorTerminalById: async function (isRoot, id) {
        AppUtils.checkResponse(await invoke("emulator_terminal_by_id", { isRoot: isRoot, id: id}));
    },
    emulatorUploadByPathId: async function (path, id) {
        AppUtils.checkResponse(await invoke("emulator_upload_by_id", { path: path, id: id }));
    },
}
