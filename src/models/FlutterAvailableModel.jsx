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
export const FlutterAvailableModel = {
    parse: function (json) {
        let data = typeof json === 'string' || json instanceof String ? JSON.parse(json) : json
        if (data['key'] !== 'FlutterAvailable') {
            throw new Error(`Failed key: ${data['key']} != FlutterAvailable`);
        }
        return {
            tag: data['jsonData']['model']['tag'],
            version: data['jsonData']['model']['version'],
            createdAt: data['jsonData']['model']['created_at'],
            urlGitlab: data['jsonData']['model']['url_gitlab'],
            urlZip: data['jsonData']['model']['url_zip'],
            urlTarGz: data['jsonData']['model']['url_tar_gz'],
            urlRepo: data['jsonData']['model']['url_repo'],
        }
    }
}
