use darkmode::Mode;
use tauri::Emitter;
use tauri::Window;

#[derive(Clone, serde::Serialize)]
struct Theme {
  mode: String,
}

#[tauri::command]
pub fn listen_theme(window: Window) {
    fn send_event(window: &Window, mode: Mode) {
        let _ = match mode {
            Mode::Default => window.emit("event-theme", Theme { mode: "light".into() }),
            Mode::Dark => window.emit("event-theme", Theme { mode: "dark".into() }),
            Mode::Light => window.emit("event-theme", Theme { mode: "light".into() }),
        };
    }
    match darkmode::detect() {
        Ok(mode) => send_event(&window, mode),
        Err(_) => {}
    };
    let _ = darkmode::subscribe(move |mode| send_event(&window, mode));
}
