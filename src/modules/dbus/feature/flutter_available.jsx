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

export const flutter_available = {
    flutter_available: async function () {
        try {
            let data = AppUtils.checkResponse(await invoke("flutter_available", {}));
            if (data.variants) {
                return AppUtils.asyncJoin(data.variants.map((e) => async () => {
                    return {
                        id: e['incoming']['id'],
                        ...(await flutter_available.flutter_available_by_id(e['incoming']['id']))
                    };
                }));
            }
            if (data['key'] === 'StateMessage') {
                return [];
            }
            return [data];
        } catch (e) {
            return [];
        }
    },
    flutter_available_by_id: async function (id) {
        return AppUtils.checkResponse(await invoke("flutter_available_by_id", { id: id }));
    }
}
