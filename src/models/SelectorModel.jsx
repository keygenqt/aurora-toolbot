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
export const SelectorModel = {
    parse: function (json) {
        let data = typeof json === 'string' || json instanceof String ? JSON.parse(json) : json
        if (data['key'] !== 'Selector') {
            return undefined
        }
        return {
            key: data['jsonData']['key'],
            variants: data['jsonData']['variants'],
        }
    }
}
