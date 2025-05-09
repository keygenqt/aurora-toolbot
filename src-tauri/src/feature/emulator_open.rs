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
use crate::tools::constants::TIMEOUT_MIDDLE;
use crate::tools::constants::{self};

#[tauri::command(async)]
pub fn emulator_open() -> Result<String, Error> {
    // Open session connect
    let conn = get_session()?;
    // Get proxy with timeout
    let proxy = get_proxy_bot(&conn, TIMEOUT_MIDDLE);
    // Request
    let method = "EmulatorOpen";
    let (result,): (String,) = match proxy.method_call(constants::DBUS_BOT_DEST, method, ()) {
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
    let (result,): (String,) = match proxy.method_call(constants::DBUS_BOT_DEST, method, (id,)) {
        Ok(value) => value,
        Err(e) => Err(Error::Anyhow(e.into()))?,
    };
    Ok(result)
}

#[tauri::command(async)]
pub fn emulator_open_vnc(password: String, port: u64) -> Result<String, Error> {
    // Open session connect
    let conn = get_session()?;
    // Get proxy with timeout
    let proxy = get_proxy_bot(&conn, TIMEOUT_MIDDLE);
    // Request
    let method = "EmulatorOpenVnc";
    let (result,): (String,) = match proxy.method_call(constants::DBUS_BOT_DEST, method, (password, port)) {
        Ok(value) => value,
        Err(e) => Err(Error::Anyhow(e.into()))?,
    };
    Ok(result)
}

#[tauri::command(async)]
pub fn emulator_open_vnc_by_id(password: String, port: u64, id: String) -> Result<String, Error> {
    // Open session connect
    let conn = get_session()?;
    // Get proxy with timeout
    let proxy = get_proxy_bot(&conn, TIMEOUT_MIDDLE);
    // Request
    let method = "EmulatorOpenVncById";
    let (result,): (String,) = match proxy.method_call(constants::DBUS_BOT_DEST, method, (password, port, id)) {
        Ok(value) => value,
        Err(e) => Err(Error::Anyhow(e.into()))?,
    };
    Ok(result)
}
