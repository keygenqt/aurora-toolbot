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
import './assets/css/index.css'
import App from './App.jsx'

// Just start
function start() {
    createRoot(document.getElementById('root')).render(
        <StrictMode>
            <App />
        </StrictMode>,
    )
}

// Start after load telegram lib
function startWithTelegram(fn) {
    var head = document.getElementsByTagName('head')[0];
    var js = document.createElement("script");
    js.src = "https://telegram.org/js/telegram-web-app.js?56";
    head.appendChild(js);
    js.addEventListener("load", () => {
        window.isMiniApp = window.Telegram.WebApp.initData !== '';
        fn();
    });
}

// Check is run tauri or web
if (window.isTauri) {
    start();
} else {
    startWithTelegram(start);
}
