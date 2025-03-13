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
    openUrl: async function (url) {
        if (window.isTauri) {
            await openUrl(url);
        } else {
            window.open(url, '_blank', 'noopener,noreferrer')
        }
    },
    openPage: function (navigate, key) {
        if (window.isMobile) {
            navigate(key);
        } else {
            document.startViewTransition(() => {
                flushSync(() => {
                    navigate(key);
                });
            });
        }
    },
    openPageDelay: function (navigate, key) {
        setTimeout(() => {
            AppUtils.openPage(navigate, key)
        }, 270);
    }
}
