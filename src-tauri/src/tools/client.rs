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
