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

// @todo check
export const emulator_package_run = {
    emulator_package_run: async function (is_listen) {
        return AppUtils.checkResponse(await invoke("emulator_package_run", { is_listen: is_listen }));
    },
    emulator_package_run_by_id: async function (is_listen, id) {
        return AppUtils.checkResponse(await invoke("emulator_package_run_by_id", { is_listen: is_listen, id: id }));
    },
    emulator_package_run_package: async function (is_listen, package_name) {
        return AppUtils.checkResponse(await invoke("emulator_package_run_package", { is_listen: is_listen, package: package_name }));
    },
    emulator_package_run_package_by_id: async function (is_listen, package_name, id) {
        return AppUtils.checkResponse(await invoke("emulator_package_run_package_by_id", { is_listen: is_listen, package: package_name, id: id }));
    }
}
