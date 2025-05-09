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
use tools::theme;

mod feature;
mod tools;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_log::Builder::new().build())
        .invoke_handler(tauri::generate_handler![
            // bot
            feature::app_auth_login::app_auth_login,
            feature::app_auth_logout::app_auth_logout,
            feature::app_info::app_info,
            feature::app_open_dir::app_open_dir,
            feature::app_open_file::app_open_file,
            feature::demo_app_info::demo_app_info,
            feature::demo_app_info::demo_app_info_by_id,
            feature::device_info::device_info,
            feature::device_info::device_info_by_id,
            feature::device_sync::device_sync,
            feature::emulator_close::emulator_close_by_id,
            feature::emulator_info::emulator_info,
            feature::emulator_info::emulator_info_by_id,
            feature::emulator_open::emulator_open_by_id,
            feature::emulator_record_start::emulator_record_start_by_id,
            feature::emulator_record_stop::emulator_record_stop_by_id,
            feature::emulator_screenshot::emulator_screenshot_by_id,
            feature::emulator_sync::emulator_sync,
            feature::emulator_terminal::emulator_terminal_by_id,
            feature::flutter_available::flutter_available,
            feature::flutter_available::flutter_available_by_id,
            feature::flutter_info::flutter_info,
            feature::flutter_info::flutter_info_by_id,
            feature::flutter_sync::flutter_sync,
            feature::flutter_terminal::flutter_terminal_by_id,
            feature::methods::faq_search,
            feature::psdk_available::psdk_available,
            feature::psdk_available::psdk_available_by_id,
            feature::psdk_info::psdk_info,
            feature::psdk_info::psdk_info_by_id,
            feature::psdk_sync::psdk_sync,
            feature::psdk_terminal::psdk_terminal_by_id,
            feature::sdk_available::sdk_available,
            feature::sdk_available::sdk_available_by_id,
            feature::sdk_ide_close::sdk_ide_close_by_id,
            feature::sdk_ide_open::sdk_ide_open_by_id,
            feature::sdk_info::sdk_info,
            feature::sdk_info::sdk_info_by_id,
            feature::sdk_sync::sdk_sync,
            feature::sdk_tools::sdk_tools_by_id,
            // other
            theme::listen_theme,
            theme::get_theme,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
