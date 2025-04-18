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
    DemoAppModel,
} from '../../../models';

import { AppUtils } from '../../../base';

export const demoApp = {
    demoAppInfo: async function () {
        try {
            let data = await invoke("demo_app_info", {});
            let selector = SelectorModel.parse(data);
            if (selector !== undefined) {
                return AppUtils.asyncJoin(selector.variants.map((e) => async () => {
                    return DemoAppModel.parse(await invoke("demo_app_info_by_id", { id: e['incoming']['id'] }));
                }));
            }
            return [DemoAppModel.parse(data)];
        } catch (e) {
            console.log(e)
            return null;
        }
    },
}
