// Copyright 2025 Vitaliy Zarubin
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
import { invoke } from "@tauri-apps/api/core";
import { AppUtils } from '../../../base';

export const emulator_record_stop = {
    emulator_record_stop_raw: async function () {
        return AppUtils.checkResponse(await invoke("emulator_record_stop", { stopType: 'Raw' }));
    },
    emulator_record_stop_raw_by_id: async function (id) {
        return AppUtils.checkResponse(await invoke("emulator_record_stop_by_id", { stopType: 'Raw', id: id }));
    },
    emulator_record_stop_mp4: async function () {
        return AppUtils.checkResponse(await invoke("emulator_record_stop", { stopType: 'Mp4' }));
    },
    emulator_record_stop_mp4_by_id: async function (id) {
        return AppUtils.checkResponse(await invoke("emulator_record_stop_by_id", { stopType: 'Mp4', id: id }));
    },
    emulator_record_stop_gif: async function () {
        return AppUtils.checkResponse(await invoke("emulator_record_stop", { stopType: 'Gif' }));
    },
    emulator_record_stop_gif_by_id: async function (id) {
        return AppUtils.checkResponse(await invoke("emulator_record_stop_by_id", { stopType: 'Gif', id: id }));
    },
}
