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
use crate::tools::constants::TIMEOUT_SHORT;
use crate::tools::constants::{self};

#[tauri::command(async)]
pub fn flutter_install() -> Result<String, Error> {
    // Open session connect
    let conn = get_session()?;
    // Get proxy with timeout
    let proxy = get_proxy_bot(&conn, TIMEOUT_SHORT);
    // Request
    let method = "FlutterInstall";
    let (result,): (String,) = match proxy.method_call(constants::DBUS_BOT_DEST, method, ()) {
        Ok(value) => value,
        Err(e) => Err(Error::Anyhow(e.into()))?,
    };
    Ok(result)
}

#[tauri::command(async)]
pub fn flutter_install_by_id(id: String) -> Result<String, Error> {
    // Open session connect
    let conn = get_session()?;
    // Get proxy with timeout
    let proxy = get_proxy_bot(&conn, TIMEOUT_SHORT);
    // Request
    let method = "FlutterInstallById";
    let (result,): (String,) = match proxy.method_call(constants::DBUS_BOT_DEST, method, (id,)) {
        Ok(value) => value,
        Err(e) => Err(Error::Anyhow(e.into()))?,
    };
    Ok(result)
}
