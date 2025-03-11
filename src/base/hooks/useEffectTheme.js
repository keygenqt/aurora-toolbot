import * as React from 'react';
import {listen} from '@tauri-apps/api/event'
import {invoke} from "@tauri-apps/api/core";

export function useEffectTheme() {
    const [themeMode, setThemeMode] = React.useState('light');
    const wasCalled = React.useRef(false);
    React.useEffect(() => {
        if(wasCalled.current) return;
        wasCalled.current = true;
        const root = document.querySelector('#root');
        // Listen mode tauri
        if (window.isTauri) {
            root.classList.add("Tauri");
            (async function() {
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
