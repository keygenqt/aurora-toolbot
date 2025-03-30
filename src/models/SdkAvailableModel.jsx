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

/**
 * Selector data model
 */
export const SdkAvailableModel = {
    parse: function (json) {
        let data = typeof json === 'string' || json instanceof String ? JSON.parse(json) : json
        if (data['key'] !== 'SdkAvailable') {
            throw new Error(`Failed key parse: ${data['key']}`);
        }
        return {
            url: data['jsonData']['model']['url'],
            versionMajor: data['jsonData']['model']['version_major'],
            versionFull: data['jsonData']['model']['version_full'],
            buildType: data['jsonData']['model']['build_type'],
            installType: data['jsonData']['model']['install_type'],
        }
    },
    hasNew: function (sdkAvailable, sdkInstalled) {
        if (!Array.isArray(sdkAvailable) || !Array.isArray(sdkInstalled)) {
            return false
        }
        let index = 0;
        for (const a of sdkAvailable) {
            for (const i of sdkInstalled) {
                if (a.versionFull == i.versionFull) {
                    return index != 0;
                }
            }
            index++;
        }
        return false;
    }
}
