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
 * EmulatorInfo data model
 */
export const EmulatorModel = {
    parse: function (json) {
        let data = typeof json === 'string' || json instanceof String ? JSON.parse(json) : json
        if (data['key'] !== 'EmulatorInfo') {
            throw new Error(`Failed key: ${data['key']} != EmulatorInfo`);
        }
        return {
            id: data['jsonData']['model']['id'],
            dir: data['jsonData']['model']['dir'],
            dirEmulator: `${data['jsonData']['model']['dir']}/emulator/${data['jsonData']['model']['name']}`,
            key: data['jsonData']['model']['key'],
            uuid: data['jsonData']['model']['uuid'],
            name: data['jsonData']['model']['name'],
            isRunning: data['jsonData']['model']['is_running'],
            // @todo size wrong
            dimensions: data['jsonData']['model']['dimensions'],
            arch: data['jsonData']['model']['arch'],
        }
    }
}
