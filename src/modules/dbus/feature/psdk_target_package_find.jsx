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
export const psdk_target_package_find = {
    psdk_target_package_find: async function (package_name) {
        return AppUtils.checkResponse(await invoke("psdk_target_package_find", { package: package_name }));
    },
    psdk_target_package_find_by_id: async function (package_name, id) {
        return AppUtils.checkResponse(await invoke("psdk_target_package_find_by_id", { package: package_name, id: id }));
    },
    psdk_target_package_find_target: async function (package_name, target_id) {
        return AppUtils.checkResponse(await invoke("psdk_target_package_find_target", { package: package_name, target_id: target_id }));
    },
    psdk_target_package_find_target_by_id: async function (package_name, target_id, id) {
        return AppUtils.checkResponse(await invoke("psdk_target_package_find_target_by_id", { package: package_name, target_id: target_id, id: id }));
    }
}
