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
import { debug } from '@tauri-apps/plugin-log';
import { invoke } from "@tauri-apps/api/core";

import { SelectorModel, FlutterAvailableModel, PsdkAvailableModel, SdkAvailableModel } from '../../models';

/**
 * Tauri application methods
 */
export const MethodsDbus = {
    appInfo: async function () {
        return await invoke("app_info", {});
    },
    emulatorInfo: async function () {
        return await invoke("emulator_info", {});
    },
    sdkAvailable: async function () {
        let join = []
        let selector = SelectorModel.parse(await invoke("sdk_available", {}));
        for (const item of selector.variants) {
            let id = item['incoming']['id'];
            join.push(new Promise((resolve, reject) => {
                (async () => {
                    try {
                        let model = SdkAvailableModel.parse(await invoke("sdk_available_by_id", { id: id }));
                        if (model !== undefined) {
                            resolve(model);
                        } else {
                            reject(new Error(`Failed to get model: ${id}`));
                        }
                    } catch (e) {
                        reject(e);
                    }
                })()
            }));
        }
        return await Promise.all(join);
    },
    psdkAvailable: async function () {
        let join = []
        let selector = SelectorModel.parse(await invoke("psdk_available", {}));
        for (const item of selector.variants) {
            let id = item['incoming']['id'];
            join.push(new Promise((resolve, reject) => {
                (async () => {
                    try {
                        let model = PsdkAvailableModel.parse(await invoke("psdk_available_by_id", { id: id }));
                        if (model !== undefined) {
                            resolve(model);
                        } else {
                            reject(new Error(`Failed to get model: ${id}`));
                        }
                    } catch (e) {
                        reject(e);
                    }
                })()
            }));
        }
        return await Promise.all(join);
    },
    flutterAvailable: async function () {
        let join = []
        let selector = SelectorModel.parse(await invoke("flutter_available", {}));
        for (const item of selector.variants) {
            let id = item['incoming']['id'];
            join.push(new Promise((resolve, reject) => {
                (async () => {
                    try {
                        let model = FlutterAvailableModel.parse(await invoke("flutter_available_by_id", { id: id }));
                        if (model !== undefined) {
                            resolve(model);
                        } else {
                            reject(new Error(`Failed to get model: ${id}`));
                        }
                    } catch (e) {
                        reject(e);
                    }
                })()
            }));
        }
        return await Promise.all(join);
    },
    log: function (message) {
        debug(message)
    }
}
