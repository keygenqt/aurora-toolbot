// Copyright 2025 Vitaliy Zarubin
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
import { invoke } from "@tauri-apps/api/core";
import { listen } from '@tauri-apps/api/event'
import { AppUtils } from '../../../base';

export const dbus_state_listen = {
    dbus_state_listen: async function (callback) {
        try {
            // Check connect
            AppUtils.checkResponse(await invoke("app_info", {}));
            // Init listener
            return await listen('event-dbus_state_listen', (event) => {
                callback(AppUtils.checkResponse(event.payload));
            });
        } catch(e) {
            console.log(e)
            return null;
        }
    },
}
