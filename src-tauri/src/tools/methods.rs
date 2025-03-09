use tauri::Error;

use super::client::get_proxy_bot;
use super::client::get_session;
use super::constants;

#[tauri::command]
pub fn app_info() -> Result<String, Error> {
    // Open session connect
    let conn = get_session()?;
    // Get proxy with timeout
    let proxy = get_proxy_bot(&conn, 500);
    // Request
    let method = "AppInfo";
    let (result,): (String,) = match proxy.method_call(constants::DBUS_BOT_DEST, method, ()) {
        Ok(value) => value,
        Err(e) => Err(Error::Anyhow(e.into()))?,
    };
    Ok(result)
}

#[tauri::command]
pub fn emulator_info() -> Result<String, Error> {
    // Open session connect
    let conn = get_session()?;
    // Get proxy with timeout
    let proxy = get_proxy_bot(&conn, 500);
    // Request
    let method = "EmulatorInfo";
    let (result,): (String,) = match proxy.method_call(constants::DBUS_BOT_DEST, method, ()) {
        Ok(value) => value,
        Err(e) => Err(Error::Anyhow(e.into()))?,
    };
    Ok(result)
}
