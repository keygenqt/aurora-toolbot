use std::time::Duration;

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
use tauri::Emitter;
use tauri::Error;
use tauri::WebviewWindow;
use dbus::blocking::Connection;
use dbus::Message;
use dbus::arg;

use crate::tools::client::get_proxy_bot;
use crate::tools::client::get_session;
use crate::tools::constants::TIMEOUT_LONG;

use super::constants::DBUS_BOT_DEST;

#[derive(Clone, serde::Serialize)]
pub struct State {
    message: String,
}

#[derive(Debug)]
pub struct DbusStateListen {
    pub sender: String,
}

impl arg::AppendAll for DbusStateListen {
    fn append(&self, i: &mut arg::IterAppend) {
        arg::RefArg::append(&self.sender, i);
    }
}

impl arg::ReadAll for DbusStateListen {
    fn read(i: &mut arg::Iter) -> Result<Self, arg::TypeMismatchError> {
        Ok(DbusStateListen {
            sender: i.read()?,
        })
    }
}

impl dbus::message::SignalArgs for DbusStateListen {
    const NAME: &'static str = "listen";
    const INTERFACE: &'static str = DBUS_BOT_DEST;
}

pub fn dbus_state_listen(window: WebviewWindow) -> Result<(), Error> {
    // Open session connect
    let conn = get_session()?;
    // Get proxy with timeout
    let proxy = get_proxy_bot(&conn, TIMEOUT_LONG);
    // Listen
    match proxy.match_signal(move |h: DbusStateListen, _: &Connection, _: &Message| {
        let _ = window.emit("event-dbus_state_listen", &h.sender);
        println!("{}", h.sender.to_string());
        true
    }) {
        Ok(token) => println!("Connect to listen. Token: {}", token.0),
        Err(e) => Err(Error::Anyhow(e.into()))?,
    }
    loop { let _ = conn.process(Duration::from_millis(500)); }
}
