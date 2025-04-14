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

use crate::tools::{
    client::{get_proxy_bot, get_session},
    constants,
};

use super::{TIMEOUT_MIDDLE, TIMEOUT_SHORT};

#[tauri::command(async)]
pub fn sdk_available() -> Result<String, Error> {
    // Open session connect
    let conn = get_session()?;
    // Get proxy with timeout
    let proxy = get_proxy_bot(&conn, TIMEOUT_MIDDLE);
    // Request
    let method = "SdkAvailable";
    let (result,): (String,) = match proxy.method_call(constants::DBUS_BOT_DEST, method, ()) {
        Ok(value) => value,
        Err(e) => Err(Error::Anyhow(e.into()))?,
    };
    Ok(result)
}

#[tauri::command(async)]
pub fn sdk_available_by_id(id: String) -> Result<String, Error> {
    // Open session connect
    let conn = get_session()?;
    // Get proxy with timeout
    let proxy = get_proxy_bot(&conn, TIMEOUT_SHORT);
    // Request
    let method = "SdkAvailableById";
    let (result,): (String,) = match proxy.method_call(constants::DBUS_BOT_DEST, method, (id,)) {
        Ok(value) => value,
        Err(e) => Err(Error::Anyhow(e.into()))?,
    };
    Ok(result)
}

#[tauri::command(async)]
pub fn sdk_ide_close_by_id(id: String) -> Result<String, Error> {
    // Open session connect
    let conn = get_session()?;
    // Get proxy with timeout
    let proxy = get_proxy_bot(&conn, TIMEOUT_MIDDLE);
    // Request
    let method = "SdkIdeCloseById";
    let (result,): (String,) = match proxy.method_call(constants::DBUS_BOT_DEST, method, (id,)) {
        Ok(value) => value,
        Err(e) => Err(Error::Anyhow(e.into()))?,
    };
    Ok(result)
}

#[tauri::command(async)]
pub fn sdk_ide_open_by_id(id: String) -> Result<String, Error> {
    // Open session connect
    let conn = get_session()?;
    // Get proxy with timeout
    let proxy = get_proxy_bot(&conn, TIMEOUT_MIDDLE);
    // Request
    let method = "SdkIdeOpenById";
    let (result,): (String,) = match proxy.method_call(constants::DBUS_BOT_DEST, method, (id,)) {
        Ok(value) => value,
        Err(e) => Err(Error::Anyhow(e.into()))?,
    };
    Ok(result)
}

#[tauri::command(async)]
pub fn sdk_info() -> Result<String, Error> {
    // Open session connect
    let conn = get_session()?;
    // Get proxy with timeout
    let proxy = get_proxy_bot(&conn, TIMEOUT_MIDDLE);
    // Request
    let method = "SdkInfo";
    let (result,): (String,) = match proxy.method_call(constants::DBUS_BOT_DEST, method, ()) {
        Ok(value) => value,
        Err(e) => Err(Error::Anyhow(e.into()))?,
    };
    Ok(result)
}

#[tauri::command(async)]
pub fn sdk_info_by_id(id: String) -> Result<String, Error> {
    // Open session connect
    let conn = get_session()?;
    // Get proxy with timeout
    let proxy = get_proxy_bot(&conn, TIMEOUT_SHORT);
    // Request
    let method = "SdkInfoById";
    let (result,): (String,) = match proxy.method_call(constants::DBUS_BOT_DEST, method, (id,)) {
        Ok(value) => value,
        Err(e) => Err(Error::Anyhow(e.into()))?,
    };
    Ok(result)
}

#[tauri::command(async)]
pub fn sdk_sync() -> Result<String, Error> {
    // Open session connect
    let conn = get_session()?;
    // Get proxy with timeout
    let proxy = get_proxy_bot(&conn, TIMEOUT_MIDDLE);
    // Request
    let method = "SdkSync";
    let (result,): (String,) = match proxy.method_call(constants::DBUS_BOT_DEST, method, ()) {
        Ok(value) => value,
        Err(e) => Err(Error::Anyhow(e.into()))?,
    };
    Ok(result)
}

#[tauri::command(async)]
pub fn sdk_tools_by_id(id: String) -> Result<String, Error> {
    // Open session connect
    let conn = get_session()?;
    // Get proxy with timeout
    let proxy = get_proxy_bot(&conn, TIMEOUT_MIDDLE);
    // Request
    let method = "SdkToolsById";
    let (result,): (String,) = match proxy.method_call(constants::DBUS_BOT_DEST, method, (id,)) {
        Ok(value) => value,
        Err(e) => Err(Error::Anyhow(e.into()))?,
    };
    Ok(result)
}
