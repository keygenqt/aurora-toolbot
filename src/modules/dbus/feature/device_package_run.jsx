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

export const device_package_run = {
    device_package_run: async function () {
        return AppUtils.checkResponse(await invoke("device_package_run", {}));
    },
    device_package_run_by_id: async function (id) {
        return AppUtils.checkResponse(await invoke("device_package_run_by_id", { id: id }));
    },
    device_package_run_package: async function (package_name) {
        return AppUtils.checkResponse(await invoke("device_package_run_package", { package: package_name }));
    },
    device_package_run_package_by_id: async function (package_name, id) {
        return AppUtils.checkResponse(await invoke("device_package_run_package_by_id", { package: package_name, id: id }));
    }
}
