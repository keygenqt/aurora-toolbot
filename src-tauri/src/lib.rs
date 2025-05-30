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
use tauri::Manager;
use tools::state;
use tools::theme;

mod feature;
mod tools;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_dialog::init())
        .setup(|app| {
            let main_window: tauri::WebviewWindow = app.get_webview_window("main").unwrap();
            std::thread::spawn(move || {
                let _ = state::dbus_state_listen(main_window);
            });
            Ok(())
        })
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
            feature::device_package_install::device_package_install_path,
            feature::device_package_install::device_package_install_urls,
            feature::device_package_install::device_package_install_path_by_id,
            feature::device_package_install::device_package_install_urls_by_id,
            feature::device_package_run::device_package_run,
            feature::device_package_run::device_package_run_by_id,
            feature::device_package_run::device_package_run_package,
            feature::device_package_run::device_package_run_package_by_id,
            feature::device_package_uninstall::device_package_uninstall,
            feature::device_package_uninstall::device_package_uninstall_by_id,
            feature::device_package_uninstall::device_package_uninstall_package,
            feature::device_package_uninstall::device_package_uninstall_package_by_id,
            feature::device_screenshot::device_screenshot,
            feature::device_screenshot::device_screenshot_by_id,
            feature::device_sync::device_sync,
            feature::device_terminal::device_terminal,
            feature::device_terminal::device_terminal_by_id,
            feature::device_upload::device_upload_path,
            feature::device_upload::device_upload_path_by_id,
            feature::device_upload::device_upload_url,
            feature::device_upload::device_upload_url_by_id,
            feature::emulator_close::emulator_close,
            feature::emulator_close::emulator_close_by_id,
            feature::emulator_info::emulator_info,
            feature::emulator_info::emulator_info_by_id,
            feature::emulator_open::emulator_open,
            feature::emulator_open::emulator_open_by_id,
            feature::emulator_open::emulator_open_vnc,
            feature::emulator_open::emulator_open_vnc_by_id,
            feature::emulator_package_install::emulator_package_install_path,
            feature::emulator_package_install::emulator_package_install_path_by_id,
            feature::emulator_package_install::emulator_package_install_url,
            feature::emulator_package_install::emulator_package_install_url_by_id,
            feature::emulator_package_run::emulator_package_run,
            feature::emulator_package_run::emulator_package_run_by_id,
            feature::emulator_package_run::emulator_package_run_package,
            feature::emulator_package_run::emulator_package_run_package_by_id,
            feature::emulator_package_uninstall::emulator_package_uninstall,
            feature::emulator_package_uninstall::emulator_package_uninstall_by_id,
            feature::emulator_package_uninstall::emulator_package_uninstall_package,
            feature::emulator_package_uninstall::emulator_package_uninstall_package_by_id,
            feature::emulator_record_start::emulator_record_start,
            feature::emulator_record_start::emulator_record_start_by_id,
            feature::emulator_record_stop::emulator_record_stop,
            feature::emulator_record_stop::emulator_record_stop_by_id,
            feature::emulator_screenshot::emulator_screenshot,
            feature::emulator_screenshot::emulator_screenshot_by_id,
            feature::emulator_sync::emulator_sync,
            feature::emulator_terminal::emulator_terminal,
            feature::emulator_terminal::emulator_terminal_by_id,
            feature::emulator_upload::emulator_upload_path,
            feature::emulator_upload::emulator_upload_path_by_id,
            feature::emulator_upload::emulator_upload_url,
            feature::emulator_upload::emulator_upload_url_by_id,
            feature::flutter_available::flutter_available,
            feature::flutter_available::flutter_available_by_id,
            feature::flutter_download::flutter_download,
            feature::flutter_download::flutter_download_by_id,
            feature::flutter_info::flutter_info,
            feature::flutter_info::flutter_info_by_id,
            feature::flutter_install::flutter_install,
            feature::flutter_install::flutter_install_by_id,
            feature::flutter_project_format::flutter_project_format,
            feature::flutter_project_format::flutter_project_format_by_id,
            feature::flutter_project_report::flutter_project_report_path,
            feature::flutter_project_report::flutter_project_report_path_by_id,
            feature::flutter_project_report::flutter_project_report_url,
            feature::flutter_project_report::flutter_project_report_url_by_id,
            feature::flutter_sync::flutter_sync,
            feature::flutter_terminal::flutter_terminal,
            feature::flutter_terminal::flutter_terminal_by_id,
            feature::flutter_uninstall::flutter_uninstall,
            feature::flutter_uninstall::flutter_uninstall_by_id,
            feature::methods::faq_search,
            feature::methods::restart_dbus,
            feature::methods::is_debug,
            feature::psdk_available::psdk_available,
            feature::psdk_available::psdk_available_by_id,
            feature::psdk_download::psdk_download,
            feature::psdk_download::psdk_download_by_id,
            feature::psdk_info::psdk_info,
            feature::psdk_info::psdk_info_by_id,
            feature::psdk_install::psdk_install,
            feature::psdk_install::psdk_install_by_id,
            feature::psdk_package_sign::psdk_package_sign,
            feature::psdk_package_sign::psdk_package_sign_by_id,
            feature::psdk_sync::psdk_sync,
            feature::psdk_target_package_find::psdk_target_package_find,
            feature::psdk_target_package_find::psdk_target_package_find_by_id,
            feature::psdk_target_package_find::psdk_target_package_find_target_by_id,
            feature::psdk_target_package_install::psdk_target_package_install,
            feature::psdk_target_package_install::psdk_target_package_install_by_id,
            feature::psdk_target_package_uninstall::psdk_target_package_uninstall,
            feature::psdk_target_package_uninstall::psdk_target_package_uninstall_by_id,
            feature::psdk_target_package_uninstall::psdk_target_package_uninstall_target_by_id,
            feature::psdk_terminal::psdk_terminal,
            feature::psdk_terminal::psdk_terminal_by_id,
            feature::psdk_uninstall::psdk_uninstall,
            feature::psdk_uninstall::psdk_uninstall_by_id,
            feature::sdk_available::sdk_available,
            feature::sdk_available::sdk_available_by_id,
            feature::sdk_download::sdk_download,
            feature::sdk_download::sdk_download_by_id,
            feature::sdk_ide_close::sdk_ide_close,
            feature::sdk_ide_close::sdk_ide_close_by_id,
            feature::sdk_ide_open::sdk_ide_open,
            feature::sdk_ide_open::sdk_ide_open_by_id,
            feature::sdk_info::sdk_info,
            feature::sdk_info::sdk_info_by_id,
            feature::sdk_install::sdk_install,
            feature::sdk_install::sdk_install_by_id,
            feature::sdk_project_format::sdk_project_format,
            feature::sdk_project_format::sdk_project_format_by_id,
            feature::sdk_sync::sdk_sync,
            feature::sdk_terminal::sdk_terminal,
            feature::sdk_terminal::sdk_terminal_by_id,
            feature::sdk_tools::sdk_tools,
            feature::sdk_tools::sdk_tools_by_id,
            feature::sdk_uninstall::sdk_uninstall,
            feature::sdk_uninstall::sdk_uninstall_by_id,
            // other
            theme::listen_theme,
            theme::get_theme,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
