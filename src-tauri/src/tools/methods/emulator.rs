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

use crate::tools::{client::{get_proxy_bot, get_session}, constants};

use super::{TIMEOUT_MIDDLE, TIMEOUT_SHORT};

#[tauri::command(async)]
pub fn emulator_close_by_id(id: String) -> Result<String, Error> {
    // Open session connect
    let conn = get_session()?;
    // Get proxy with timeout
    let proxy = get_proxy_bot(&conn, TIMEOUT_MIDDLE);
    // Request
    let method = "EmulatorCloseById";
    let (result,): (String,) = match proxy.method_call(constants::DBUS_BOT_DEST, method, (id, )) {
        Ok(value) => value,
        Err(e) => Err(Error::Anyhow(e.into()))?,
    };
    Ok(result)
}

#[tauri::command(async)]
pub fn emulator_info() -> Result<String, Error> {
    // Open session connect
    let conn = get_session()?;
    // Get proxy with timeout
    let proxy = get_proxy_bot(&conn, TIMEOUT_SHORT);
    // Request
    let method = "EmulatorInfo";
    let (result,): (String,) = match proxy.method_call(constants::DBUS_BOT_DEST, method, ()) {
        Ok(value) => value,
        Err(e) => Err(Error::Anyhow(e.into()))?,
    };
    Ok(result)
}

#[tauri::command(async)]
pub fn emulator_info_by_id(id: String) -> Result<String, Error> {
    // Open session connect
    let conn = get_session()?;
    // Get proxy with timeout
    let proxy = get_proxy_bot(&conn, TIMEOUT_SHORT);
    // Request
    let method = "EmulatorInfoById";
    let (result,): (String,) = match proxy.method_call(constants::DBUS_BOT_DEST, method, (id, )) {
        Ok(value) => value,
        Err(e) => Err(Error::Anyhow(e.into()))?,
    };
    Ok(result)
}

#[tauri::command(async)]
pub fn emulator_open_by_id(id: String) -> Result<String, Error> {
    // Open session connect
    let conn = get_session()?;
    // Get proxy with timeout
    let proxy = get_proxy_bot(&conn, TIMEOUT_MIDDLE);
    // Request
    let method = "EmulatorOpenById";
    let (result,): (String,) = match proxy.method_call(constants::DBUS_BOT_DEST, method, (id, )) {
        Ok(value) => value,
        Err(e) => Err(Error::Anyhow(e.into()))?,
    };
    Ok(result)
}

#[tauri::command(async)]
pub fn emulator_record_start_by_id(id: String) -> Result<String, Error> {
    // Open session connect
    let conn = get_session()?;
    // Get proxy with timeout
    let proxy = get_proxy_bot(&conn, TIMEOUT_MIDDLE);
    // Request
    let method = "EmulatorRecordStartById";
    let (result,): (String,) = match proxy.method_call(constants::DBUS_BOT_DEST, method, (id, )) {
        Ok(value) => value,
        Err(e) => Err(Error::Anyhow(e.into()))?,
    };
    Ok(result)
}

#[tauri::command(async)]
pub fn emulator_record_stop_by_id(id: String) -> Result<String, Error> {
    // Open session connect
    let conn = get_session()?;
    // Get proxy with timeout
    let proxy = get_proxy_bot(&conn, TIMEOUT_MIDDLE);
    // Request
    let method = "EmulatorRecordStopById";
    let (result,): (String,) = match proxy.method_call(constants::DBUS_BOT_DEST, method, (id, )) {
        Ok(value) => value,
        Err(e) => Err(Error::Anyhow(e.into()))?,
    };
    Ok(result)
}

#[tauri::command(async)]
pub fn emulator_screenshot_by_id(id: String) -> Result<String, Error> {
    // Open session connect
    let conn = get_session()?;
    // Get proxy with timeout
    let proxy = get_proxy_bot(&conn, TIMEOUT_MIDDLE);
    // Request
    let method = "EmulatorScreenshotById";
    let (result,): (String,) = match proxy.method_call(constants::DBUS_BOT_DEST, method, (id, )) {
        Ok(value) => value,
        Err(e) => Err(Error::Anyhow(e.into()))?,
    };
    Ok(result)
}

#[tauri::command(async)]
pub fn emulator_sync() -> Result<String, Error> {
    // Open session connect
    let conn = get_session()?;
    // Get proxy with timeout
    let proxy = get_proxy_bot(&conn, TIMEOUT_MIDDLE);
    // Request
    let method = "EmulatorSync";
    let (result,): (String,) = match proxy.method_call(constants::DBUS_BOT_DEST, method, ()) {
        Ok(value) => value,
        Err(e) => Err(Error::Anyhow(e.into()))?,
    };
    Ok(result)
}

#[tauri::command(async)]
pub fn emulator_terminal_by_id(id: String, is_root: bool) -> Result<String, Error> {
    // Open session connect
    let conn = get_session()?;
    // Get proxy with timeout
    let proxy = get_proxy_bot(&conn, TIMEOUT_MIDDLE);
    // Request
    let method = "EmulatorTerminalById";
    let (result,): (String,) = match proxy.method_call(constants::DBUS_BOT_DEST, method, (id, is_root, )) {
        Ok(value) => value,
        Err(e) => Err(Error::Anyhow(e.into()))?,
    };
    Ok(result)
}

#[tauri::command(async)]
pub fn emulator_upload_path_by_id(id: String, path: String) -> Result<String, Error> {
    // Open session connect
    let conn = get_session()?;
    // Get proxy with timeout
    let proxy = get_proxy_bot(&conn, TIMEOUT_MIDDLE);
    // Request
    let method = "EmulatorUploadByPathId";
    let (result,): (String,) = match proxy.method_call(constants::DBUS_BOT_DEST, method, (id, path, )) {
        Ok(value) => value,
        Err(e) => Err(Error::Anyhow(e.into()))?,
    };
    Ok(result)
}
