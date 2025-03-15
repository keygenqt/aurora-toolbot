/**
 * Copyright 2025 Vitaliy Zarubin
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { invoke } from "@tauri-apps/api/core";

import store from './store/configure.jsx'
import './assets/css/index.css'
import App from './App.jsx'

// Just start
function start() {
    createRoot(document.getElementById('root')).render(
        <StrictMode>
            <Provider store={store}>
                <App />
            </Provider>
        </StrictMode>
    )
}

// Start after load telegram lib
function startWithTelegram(fn) {
    // Check is mobile
    window.isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    // Load js
    var head = document.getElementsByTagName('head')[0];
    var js = document.createElement("script");
    js.src = "https://telegram.org/js/telegram-web-app.js?56";
    head.appendChild(js);
    js.addEventListener("load", () => {
        // Check is mini app
        window.isMiniApp = window.Telegram.WebApp.initData !== '';
        // Run app
        fn();
    });
}

// Start after load get ini data Tauri
function startWithTauri(fn) {
    (async function () {
        // Set is not mobile
        window.isMobile = false;
        // Set is not mini app
        window.isMiniApp = false;
        // Set theme mode
        try {
            let theme = await invoke('get_theme', {});
            window.colorScheme = theme.mode;
        } catch (e) {
            window.colorScheme = 'light'
        }
        // Run app
        fn();
    })();
}

// Check is run tauri or web
if (window.isTauri) {
    // Start with loading data tauri
    startWithTauri(start);
} else {
    // Start with loading data telegram
    startWithTelegram(start);
}
