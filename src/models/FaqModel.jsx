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
export const FaqModel = {
    parses: function (json) {
        let data = typeof json === 'string' || json instanceof String ? JSON.parse(json) : json
        if (data['key'] !== 'FaqSearch') {
            throw new Error(`Failed key: ${data['key']} != FaqSearch`);
        }
        const models = [];
        for (const model of data['jsonData']) {
            models.push({
                hash: model['hash'],
                url: model['url'],
                title: model['title'],
                text: model['text'],
                fname: model['fname'],
                lname: model['lname'],
                date: model['date'],
                timestamp: model['timestamp'],
                rating: model['rating'],
                image: model['image'],
            })
        }
        return models;
    }
}
