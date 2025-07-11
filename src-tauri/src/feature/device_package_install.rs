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
pub fn device_package_install_path(path: String) -> Result<String, Error> {
    // Open session connect
    let conn = get_session()?;
    // Get proxy with timeout
    let proxy = get_proxy_bot(&conn, constants::TIMEOUT_LONG);
    // Request
    let method = "DevicePackageInstallPath";
    let (result,): (String,) = match proxy.method_call(constants::DBUS_BOT_INTERFACE, method, (path,)) {
        Ok(value) => value,
        Err(e) => Err(Error::Anyhow(e.into()))?,
    };
    Ok(result)
}

#[tauri::command(async)]
pub fn device_package_install_urls(urls: Vec<String>) -> Result<String, Error> {
    // Open session connect
    let conn = get_session()?;
    // Get proxy with timeout
    let proxy = get_proxy_bot(&conn, constants::TIMEOUT_LONG);
    // Request
    let method = "DevicePackageInstallUrls";
    let (result,): (String,) = match proxy.method_call(constants::DBUS_BOT_INTERFACE, method, (urls,)) {
        Ok(value) => value,
        Err(e) => Err(Error::Anyhow(e.into()))?,
    };
    Ok(result)
}

#[tauri::command(async)]
pub fn device_package_install_path_by_id(path: String, id: String) -> Result<String, Error> {
    // Open session connect
    let conn = get_session()?;
    // Get proxy with timeout
    let proxy = get_proxy_bot(&conn, constants::TIMEOUT_LONG);
    // Request
    let method = "DevicePackageInstallPathById";
    let (result,): (String,) = match proxy.method_call(constants::DBUS_BOT_INTERFACE, method, (path, id)) {
        Ok(value) => value,
        Err(e) => Err(Error::Anyhow(e.into()))?,
    };
    Ok(result)
}

#[tauri::command(async)]
pub fn device_package_install_urls_by_id(urls: Vec<String>, id: String) -> Result<String, Error> {
    // Open session connect
    let conn = get_session()?;
    // Get proxy with timeout
    let proxy = get_proxy_bot(&conn, constants::TIMEOUT_LONG);
    // Request
    let method = "DevicePackageInstallUrlsById";
    let (result,): (String,) = match proxy.method_call(constants::DBUS_BOT_INTERFACE, method, (urls, id)) {
        Ok(value) => value,
        Err(e) => Err(Error::Anyhow(e.into()))?,
    };
    Ok(result)
}
