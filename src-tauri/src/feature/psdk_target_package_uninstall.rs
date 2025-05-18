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
use tauri::Error;

use crate::tools::client::get_proxy_bot;
use crate::tools::client::get_session;
use crate::tools::constants;

#[tauri::command(async)]
pub fn psdk_target_package_uninstall(package: String) -> Result<String, Error> {
    // Open session connect
    let conn = get_session()?;
    // Get proxy with timeout
    let proxy = get_proxy_bot(&conn, constants::TIMEOUT_SHORT);
    // Request
    let method = "PsdkTargetPackageUninstall";
    let (result,): (String,) = match proxy.method_call(constants::DBUS_BOT_INTERFACE, method, (package,)) {
        Ok(value) => value,
        Err(e) => Err(Error::Anyhow(e.into()))?,
    };
    Ok(result)
}

#[tauri::command(async)]
pub fn psdk_target_package_uninstall_by_id(package: String, id: String) -> Result<String, Error> {
    // Open session connect
    let conn = get_session()?;
    // Get proxy with timeout
    let proxy = get_proxy_bot(&conn, constants::TIMEOUT_SHORT);
    // Request
    let method = "PsdkTargetPackageUninstallById";
    let (result,): (String,) = match proxy.method_call(constants::DBUS_BOT_INTERFACE, method, (package, id)) {
        Ok(value) => value,
        Err(e) => Err(Error::Anyhow(e.into()))?,
    };
    Ok(result)
}

#[tauri::command(async)]
pub fn psdk_target_package_uninstall_target_by_id(
    package: String,
    target_id: String,
    id: String,
) -> Result<String, Error> {
    // Open session connect
    let conn = get_session()?;
    // Get proxy with timeout
    let proxy = get_proxy_bot(&conn, constants::TIMEOUT_SHORT);
    // Request
    let method = "PsdkTargetPackageUninstallTargetById";
    let (result,): (String,) = match proxy.method_call(constants::DBUS_BOT_INTERFACE, method, (package, target_id, id))
    {
        Ok(value) => value,
        Err(e) => Err(Error::Anyhow(e.into()))?,
    };
    Ok(result)
}
