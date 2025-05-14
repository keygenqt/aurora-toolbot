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

export const emulator_open = {
    emulator_open: async function () {
        return AppUtils.checkResponse(await invoke("emulator_open", {}));
    },
    emulator_open_by_id: async function (id) {
        return AppUtils.checkResponse(await invoke("emulator_open_by_id", { id: id }));
    },
    emulator_open_vnc: async function (password, port) {
        return AppUtils.checkResponse(await invoke("emulator_open_vnc", { password: password, port: port }));
    },
    emulator_open_vnc_by_id: async function (password, port, id) {
        return AppUtils.checkResponse(await invoke("emulator_open_vnc_by_id", { password: password, port: port, id: id }));
    }
}
