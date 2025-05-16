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

export const psdk_target_package_find = {
    psdk_target_package_find: async function (package_name) {
        let data = AppUtils.checkResponse(await invoke("psdk_target_package_find", { package: package_name }));
        if (data.variants) {
            if (data.variants[0]['incoming']['target_id']) {
                let result = [];
                await AppUtils.asyncJoin(data.variants.map((e) => async () => {
                    result.push({
                        name: e['name'],
                        id: e['incoming']['id'],
                        target_id: e['incoming']['target_id'],
                        ...(await psdk_target_package_find.psdk_target_package_find_target_by_id(package_name, e['incoming']['target_id'], e['incoming']['id'])),
                    });
                }));
                return result;
            } else {
                let result = [];
                await AppUtils.asyncJoin(data.variants.map((e) => async () => {
                    result.push({
                        name: e['name'],
                        targets: await psdk_target_package_find.psdk_target_package_find_by_id(package_name, e['incoming']['id']),
                    });
                }));
                return result;
            }
        }
        if (data['key'] === 'StateMessage') {
            return [];
        }
        return [data];
    },
    psdk_target_package_find_by_id: async function (package_name, id) {
        let data = AppUtils.checkResponse(await invoke("psdk_target_package_find_by_id", { package: package_name, id: id }));
        if (data.variants) {
            let result = [];
            await AppUtils.asyncJoin(data.variants.map((e) => async () => {
                result.push({
                    name: e['name'],
                    id: e['incoming']['id'],
                    target_id: e['incoming']['target_id'],
                    ...(await psdk_target_package_find.psdk_target_package_find_target_by_id(package_name, e['incoming']['target_id'], e['incoming']['id'])),
                });
            }));
            return result;
        }
        if (data['key'] === 'StateMessage') {
            return [];
        }
        return [data];
    },
    psdk_target_package_find_target_by_id: async function (package_name, target_id, id) {
        return AppUtils.checkResponse(await invoke("psdk_target_package_find_target_by_id", { package: package_name, targetId: target_id, id: id }));
    }
}
