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
use darkmode::Mode;
use tauri::Emitter;
use tauri::Error;
use tauri::Window;

#[derive(Clone, serde::Serialize)]
pub struct Theme {
    mode: String,
}

fn data_mode(mode: Mode) -> Theme {
    match mode {
        Mode::Default => Theme { mode: "light".into() },
        Mode::Dark => Theme { mode: "dark".into() },
        Mode::Light => Theme { mode: "light".into() },
    }
}

fn send_event(window: &Window, mode: Mode) {
    let _ = window.emit("event-theme", data_mode(mode));
}

#[tauri::command]
pub fn listen_theme(window: Window) {
    match darkmode::detect() {
        Ok(mode) => send_event(&window, mode),
        Err(_) => {}
    };
    let _ = darkmode::subscribe(move |mode| send_event(&window, mode));
}

#[tauri::command]
pub fn get_theme() -> Result<Theme, Error> {
    match darkmode::detect() {
        Ok(mode) => Ok(data_mode(mode)),
        Err(_) => Err(Error::Anyhow(anyhow::Error::msg("error load theme"))),
    }
}
