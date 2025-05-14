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

// pub enum EmulatorRecordStopType {
//     Raw,
//     Mp4,
//     Gif,
// }

// @todo check
export const emulator_record_stop = {
    emulator_record_stop: async function (stop_type) {
        return AppUtils.checkResponse(await invoke("emulator_record_stop", { stop_type: stop_type }));
    },
    emulator_record_stop_by_id: async function (stop_type, id) {
        return AppUtils.checkResponse(await invoke("emulator_record_stop_by_id", { stop_type: stop_type, id: id }));
    }
}
