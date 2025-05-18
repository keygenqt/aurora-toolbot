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
import { AppUtils } from '../../../base';

export const methods = {
    faq_search: async function (search) {
        // Search faq from api via D-bus
        return AppUtils.checkResponse(await invoke("faq_search", { search: search }));
    },
    restart_dbus: async function () {
        // Cancel all running processes
        await invoke("restart_dbus", {});
        await new Promise(r => setTimeout(r, 500));
    },
    is_debug: async function () {
        // Get is debug from rust
        return await invoke("is_debug", {});
    }
}
