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
use tools::methods;
use tools::theme;

mod tools;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_log::Builder::new().build())
        .invoke_handler(tauri::generate_handler![
            // app
            methods::app::app_info,
            methods::app::app_open_dir,
            // demo app
            methods::demo_app::demo_app_info,
            methods::demo_app::demo_app_info_by_id,
            // emulator
            methods::emulator::emulator_close_by_id,
            methods::emulator::emulator_info,
            methods::emulator::emulator_info_by_id,
            methods::emulator::emulator_open_by_id,
            methods::emulator::emulator_record_start_by_id,
            methods::emulator::emulator_record_stop_by_id,
            methods::emulator::emulator_screenshot_by_id,
            methods::emulator::emulator_sync,
            methods::emulator::emulator_terminal_by_id,
            methods::emulator::emulator_upload_path_by_id,
            // faq
            methods::faq::faq_search,
            // flutter
            methods::flutter::flutter_available,
            methods::flutter::flutter_available_by_id,
            methods::flutter::flutter_info,
            methods::flutter::flutter_info_by_id,
            methods::flutter::flutter_sync,
            methods::flutter::flutter_terminal_by_id,
            // psdk
            methods::psdk::psdk_available,
            methods::psdk::psdk_available_by_id,
            methods::psdk::psdk_info,
            methods::psdk::psdk_sync,
            methods::psdk::psdk_info_by_id,
            methods::psdk::psdk_terminal_by_id,
            // sdk
            methods::sdk::sdk_available,
            methods::sdk::sdk_available_by_id,
            methods::sdk::sdk_ide_close_by_id,
            methods::sdk::sdk_ide_open_by_id,
            methods::sdk::sdk_info,
            methods::sdk::sdk_info_by_id,
            methods::sdk::sdk_sync,
            methods::sdk::sdk_tools_by_id,
            // other
            theme::listen_theme,
            theme::get_theme,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
