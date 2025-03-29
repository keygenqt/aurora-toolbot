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

import { 
    SelectorModel,
    EmulatorModel,
    SdkAvailableModel,
    SdkInstalledModel,
    PsdkAvailableModel,
    PsdkInstalledModel,
    FlutterAvailableModel,
    FlutterInstalledModel,
} from '../../models';

/**
 * Tauri application methods
 */
export const MethodsDbus = {
    appInfo: async function () {
        return await invoke("app_info", {});
    },
    emulators: async function () {
        let data = await invoke("emulator_info", {});
        let selector = SelectorModel.parse(data);
        if (selector !== undefined) {
            let join = [];
            for (const item of selector.variants) {
                let id = item['incoming']['id'];
                join.push(new Promise((resolve, reject) => {
                    (async () => {
                        try {
                            let model = EmulatorModel.parse(await invoke("emulator_info_by_id", { id: id }));
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
        }
        return [EmulatorModel.parse(data)];
    },
    sdkAvailable: async function () {

        await new Promise(r => setTimeout(r, 2000));

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
    sdkInstalled: async function () {

        await new Promise(r => setTimeout(r, 2000));

        let data = await invoke("sdk_info", {});
        let selector = SelectorModel.parse(data);
        if (selector !== undefined) {
            let join = [];
            for (const item of selector.variants) {
                let id = item['incoming']['id'];
                join.push(new Promise((resolve, reject) => {
                    (async () => {
                        try {
                            let model = SdkInstalledModel.parse(await invoke("sdk_info_by_id", { id: id }));
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
        }
        return [SdkInstalledModel.parse(data)];
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
    psdkInstalled: async function () {
        let data = await invoke("psdk_info", {});
        let selector = SelectorModel.parse(data);
        if (selector !== undefined) {
            let join = [];
            for (const item of selector.variants) {
                let id = item['incoming']['id'];
                join.push(new Promise((resolve, reject) => {
                    (async () => {
                        try {
                            let model = PsdkInstalledModel.parse(await invoke("psdk_info_by_id", { id: id }));
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
        }
        return [PsdkInstalledModel.parse(data)];
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
    flutterInstalled: async function () {
        let data = await invoke("flutter_info", {});
        let selector = SelectorModel.parse(data);
        if (selector !== undefined) {
            let join = [];
            for (const item of selector.variants) {
                let id = item['incoming']['id'];
                join.push(new Promise((resolve, reject) => {
                    (async () => {
                        try {
                            let model = FlutterInstalledModel.parse(await invoke("flutter_info_by_id", { id: id }));
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
        }
        return [FlutterInstalledModel.parse(data)];
    },
    log: function (message) {
        debug(message)
    }
}
