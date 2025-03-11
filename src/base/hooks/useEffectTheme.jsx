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
import * as React from 'react';
import { listen } from '@tauri-apps/api/event'
import { invoke } from "@tauri-apps/api/core";

/**
 * Listen change theme for telegram & tauri
 */
export function useEffectTheme() {
    const [themeMode, setThemeMode] = React.useState('light');
    const wasCalled = React.useRef(false);
    React.useEffect(() => {
        if (wasCalled.current) return;
        wasCalled.current = true;
        const root = document.querySelector('#root');
        // Listen mode tauri
        if (window.isTauri) {
            root.classList.add("Tauri");
            (async function () {
                await listen('event-theme', (event) => {
                    if (event.payload.mode === 'light') {
                        root.classList.add("light");
                        root.classList.remove("dark");
                    } else {
                        root.classList.remove("light");
                        root.classList.add("dark");
                    }
                    setThemeMode(event.payload.mode)
                });
                await invoke('listen_theme', {});
            })();
        }
        // Listen mode telegram
        if (window.isMiniApp) {
            root.classList.add("MiniApp");
            setThemeMode(window.Telegram.WebApp.colorScheme);
            function themeChanged() {
                if (window.Telegram.WebApp.colorScheme === 'light') {
                    root.classList.add("light");
                    root.classList.remove("dark");
                } else {
                    root.classList.remove("light");
                    root.classList.add("dark");
                }
                setThemeMode(window.Telegram.WebApp.colorScheme);
            }
            window.Telegram.WebApp.onEvent("themeChanged", themeChanged);
        }
    }, []);
    return themeMode;
}
