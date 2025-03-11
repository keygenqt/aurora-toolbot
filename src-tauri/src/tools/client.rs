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
use std::time::Duration;

use dbus::blocking::Connection;
use dbus::blocking::Proxy;
use tauri::Error;

use super::constants;

#[allow(dead_code)]
pub fn get_session() -> Result<Connection, Error> {
    match Connection::new_session() {
        Ok(value) => Ok(value),
        Err(e) => Err(Error::Anyhow(e.into()))?,
    }
}

#[allow(dead_code)]
pub fn get_system() -> Result<Connection, Error> {
    match Connection::new_system() {
        Ok(value) => Ok(value),
        Err(e) => Err(Error::Anyhow(e.into()))?,
    }
}

pub fn get_proxy_bot(connection: &Connection, timeout: u64) -> Proxy<'_, &dbus::blocking::Connection> {
    connection.with_proxy(constants::DBUS_BOT_DEST, "/api", Duration::from_millis(timeout))
}
