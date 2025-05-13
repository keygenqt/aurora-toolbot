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
import { MD5 } from 'crypto-js';

import { openUrl } from '@tauri-apps/plugin-opener';
import { flushSync } from 'react-dom';
import { AppConf } from '../../conf/AppConf'

/**
 * Utils app function
 */
export const AppUtils = {
    checkVersion: function (model) {
        if (window.isTauri) {
            let mVersion1 = AppConf.apiVersion.split('.').slice(0, 2).join("");
            let mVersion2 = model.apiVersion.split('.').slice(0, 2).join("");
            return mVersion1 === mVersion2;
        } else {
            let mVersion1 = AppConf.appVersion.split('.').slice(0, 2).join("");
            let mVersion2 = model.appVersion.split('.').slice(0, 2).join("");
            return mVersion1 === mVersion2;
        }
    },
    setCache: function (key, value) {
        localStorage.setItem(key, JSON.stringify(value));
        let values = [],
            keys = Object.keys(localStorage),
            i = keys.length,
            el = document.querySelector('#root');
        while (i--) {
            values.push(localStorage.getItem(keys[i]));
        }
        el.dataset.cache = MD5(values.toString()).toString();
    },
    openUrl: async function (url) {
        if (window.isTauri) {
            await openUrl(url);
        } else {
            window.open(url, '_blank', 'noopener,noreferrer')
        }
    },
    openPage: function (navigate, key, arg = {}) {
        if (window.isMobile) {
            navigate(key, arg);
        } else {
            document.startViewTransition(() => {
                flushSync(() => {
                    navigate(key, arg);
                });
            });
        }
    },
    openPageDelay: function (navigate, key, arg = {}) {
        setTimeout(() => {
            AppUtils.openPage(navigate, key, arg)
        }, 300);
    },
    refreshPage: function (navigate) {
        if (window.isMobile) {
            navigate(0);
        } else {
            document.startViewTransition(() => {
                flushSync(() => {
                    navigate(0);
                });
            });
        }
    },
    refreshPageDelay: function (navigate) {
        setTimeout(() => {
            AppUtils.refreshPage(navigate)
        }, 300);
    },
    asyncJoin: async function(...fns) {
        if (!Array.isArray(fns) && fns.length == 0) {
            return null;
        }
        if (Array.isArray(fns[0])) {
            fns = fns[0];
        }
        let join = [];
        for (const fn of fns) {
            if (fn) {
                join.push(new Promise((resolve, reject) => {
                    (async () => {
                        try {
                            resolve(await fn());
                        } catch (e) {
                            reject(e)
                        }
                    })()
                }));
            }
        }
        try {
            return await Promise.all(join);
        } catch (e) {
            return null
        }
    },
    checkResponse: function(result) {
        let data = typeof result === 'string' || result instanceof String ? JSON.parse(result) : result
        if (data['key'] === 'StateMessage' && data['jsonData']['state'] === 'Error') {
            throw Error(data['jsonData']['message'])
        }
        return data;
    },
    isInstall: function(installed, modelAvailable, check) {
        if (!Array.isArray(installed)) {
            return false;
        }
        for (const modelInstalled of installed) {
            if (check(modelInstalled, modelAvailable)) {
                return true;
            }
        }
        return false;
    }
}
