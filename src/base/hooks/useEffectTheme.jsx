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

import { useEffectCache } from '../../base'

/**
 * Listen change theme for telegram & tauri
 */
export function useEffectTheme() {
    const darkStorageKey = 'isDark'
    const darkModeCache = useEffectCache(darkStorageKey);
    const [themeMode, setThemeMode] = React.useState(darkModeCache === true ? 'dark' : (
        window.isMiniApp ? window.Telegram.WebApp.colorScheme : window.colorScheme
    ));

    function setDark() {
        const root = document.querySelector('#root');
        root.classList.remove('light');
        root.classList.add('dark');
        setThemeMode('dark');
    }

    function setLight() {
        const root = document.querySelector('#root');
        root.classList.remove('dark');
        root.classList.add('light');
        setThemeMode('light');
    }

    React.useEffect(() => {
        if (darkModeCache === true) {
            setDark();
        }
        if (darkModeCache === false) {
            if (window.isTauri) {
                (async function () {
                    try {
                        if ((await invoke('get_theme', {})).mode === 'dark') {
                            setDark();
                        } else {
                            setLight();
                        }
                    } catch(e) {
                        console.error(e)
                    }
                })();
            }
            if (window.isMiniApp) {
                setThemeMode(window.Telegram.WebApp.colorScheme);
            }
        }
    }, [darkModeCache]);

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
                    if (localStorage.getItem(darkStorageKey) !== 'true') {
                        if (event.payload.mode === 'light') {
                            setLight();
                        } else {
                            setDark();
                        }
                    }
                });
                await invoke('listen_theme', {});
            })();
        }
        // Listen mode telegram
        if (window.isMiniApp) {
            root.classList.add("MiniApp");
            if (localStorage.getItem(darkStorageKey) !== true) {
                setThemeMode(window.Telegram.WebApp.colorScheme);
            }
            function themeChanged() {
                if (localStorage.getItem(darkStorageKey) !== 'true') {
                    if (window.Telegram.WebApp.colorScheme === 'light') {
                        setLight();;
                    } else {
                        setDark();
                    }
                    setThemeMode(window.Telegram.WebApp.colorScheme);
                }
            }
            window.Telegram.WebApp.onEvent("themeChanged", themeChanged);
        }
    }, [darkModeCache]);

    return themeMode;
}
