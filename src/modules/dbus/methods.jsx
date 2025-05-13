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
import { debug } from '@tauri-apps/plugin-log';

// all methods
import { app_auth_login } from './feature/app_auth_login';
import { app_auth_logout } from './feature/app_auth_logout';
import { app_info } from './feature/app_info';
import { app_open_dir } from './feature/app_open_dir';
import { app_open_file } from './feature/app_open_file';
import { demo_app_info } from './feature/demo_app_info';
import { device_info } from './feature/device_info';
import { device_package_install } from './feature/device_package_install';
import { device_package_run } from './feature/device_package_run';
import { device_package_uninstall } from './feature/device_package_uninstall';
import { device_screenshot } from './feature/device_screenshot';
import { device_sync } from './feature/device_sync';
import { device_terminal } from './feature/device_terminal';
import { device_upload } from './feature/device_upload';
import { emulator_close } from './feature/emulator_close';
import { emulator_info } from './feature/emulator_info';
import { emulator_open } from './feature/emulator_open';
import { emulator_package_install } from './feature/emulator_package_install';
import { emulator_package_run } from './feature/emulator_package_run';
import { emulator_package_uninstall } from './feature/emulator_package_uninstall';
import { emulator_record_start } from './feature/emulator_record_start';
import { emulator_record_stop } from './feature/emulator_record_stop';
import { emulator_screenshot } from './feature/emulator_screenshot';
import { emulator_sync } from './feature/emulator_sync';
import { emulator_terminal } from './feature/emulator_terminal';
import { emulator_upload } from './feature/emulator_upload';
import { flutter_available } from './feature/flutter_available';
import { flutter_download } from './feature/flutter_download';
import { flutter_info } from './feature/flutter_info';
import { flutter_install } from './feature/flutter_install';
import { flutter_project_format } from './feature/flutter_project_format';
import { flutter_project_report } from './feature/flutter_project_report';
import { flutter_sync } from './feature/flutter_sync';
import { flutter_terminal } from './feature/flutter_terminal';
import { flutter_uninstall } from './feature/flutter_uninstall';
import { methods } from './feature/methods';
import { psdk_available } from './feature/psdk_available';
import { psdk_download } from './feature/psdk_download';
import { psdk_info } from './feature/psdk_info';
import { psdk_install } from './feature/psdk_install';
import { psdk_package_sign } from './feature/psdk_package_sign';
import { psdk_sync } from './feature/psdk_sync';
import { psdk_target_package_find } from './feature/psdk_target_package_find';
import { psdk_target_package_install } from './feature/psdk_target_package_install';
import { psdk_target_package_uninstall } from './feature/psdk_target_package_uninstall';
import { psdk_terminal } from './feature/psdk_terminal';
import { psdk_uninstall } from './feature/psdk_uninstall';
import { sdk_available } from './feature/sdk_available';
import { sdk_download } from './feature/sdk_download';
import { sdk_ide_close } from './feature/sdk_ide_close';
import { sdk_ide_open } from './feature/sdk_ide_open';
import { sdk_info } from './feature/sdk_info';
import { sdk_install } from './feature/sdk_install';
import { sdk_project_format } from './feature/sdk_project_format';
import { sdk_sync } from './feature/sdk_sync';
import { sdk_tools } from './feature/sdk_tools';
import { sdk_uninstall } from './feature/sdk_uninstall';
// old
import { app } from './impl/app';
import { demoApp } from './impl/demoApp';
import { device } from './impl/device';
import { emulator } from './impl/emulator';
import { faq } from './impl/faq';
import { flutter } from './impl/flutter';
import { psdk } from './impl/psdk';
import { sdk } from './impl/sdk';

/**
 * Tauri application methods
 */
export const MethodsDbus = {
    ...app_auth_login,
    ...app_auth_logout,
    ...app_info,
    ...app_open_dir,
    ...app_open_file,
    ...demo_app_info,
    ...device_info,
    ...device_package_install,
    ...device_package_run,
    ...device_package_uninstall,
    ...device_screenshot,
    ...device_sync,
    ...device_terminal,
    ...device_upload,
    ...emulator_close,
    ...emulator_info,
    ...emulator_open,
    ...emulator_package_install,
    ...emulator_package_run,
    ...emulator_package_uninstall,
    ...emulator_record_start,
    ...emulator_record_stop,
    ...emulator_screenshot,
    ...emulator_sync,
    ...emulator_terminal,
    ...emulator_upload,
    ...flutter_available,
    ...flutter_download,
    ...flutter_info,
    ...flutter_install,
    ...flutter_project_format,
    ...flutter_project_report,
    ...flutter_sync,
    ...flutter_terminal,
    ...flutter_uninstall,
    ...methods,
    ...psdk_available,
    ...psdk_download,
    ...psdk_info,
    ...psdk_install,
    ...psdk_package_sign,
    ...psdk_sync,
    ...psdk_target_package_find,
    ...psdk_target_package_install,
    ...psdk_target_package_uninstall,
    ...psdk_terminal,
    ...psdk_uninstall,
    ...sdk_available,
    ...sdk_download,
    ...sdk_ide_close,
    ...sdk_ide_open,
    ...sdk_info,
    ...sdk_install,
    ...sdk_project_format,
    ...sdk_sync,
    ...sdk_tools,
    ...sdk_uninstall,
    // old
    ...app,
    ...demoApp,
    ...device,
    ...emulator,
    ...faq,
    ...flutter,
    ...psdk,
    ...sdk,
    log: function (message) {
        debug(message)
    }
}
