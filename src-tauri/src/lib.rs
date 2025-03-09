use tools::methods;

mod tools;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_log::Builder::new().build())
        .invoke_handler(tauri::generate_handler![methods::app_info, methods::emulator_info,])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
