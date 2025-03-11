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
import { getCurrentWindow } from '@tauri-apps/api/window';

/**
 * Change state focus window with appBar - default appBar not window in tauri
 */
export function useEffectFocus() {
    const [isFocusWindow, setIsFocusWindow] = React.useState(true);
    const wasCalled = React.useRef(false);
    const wasOver = React.useRef(false);
    React.useEffect(() => {
        if (wasCalled.current) return;
        wasCalled.current = true;
        if (window.isTauri) {
            // Check if click by appBar
            const root = document.querySelector('#root');
            root.addEventListener("mousedown", () => {
                setIsFocusWindow(true)
            });
            // Disable change focus if hover appBar
            const toolbarDrag1 = document.getElementById('toolbarDrag1');
            const toolbarDrag2 = document.getElementById('toolbarDrag2');
            toolbarDrag1.addEventListener("mouseover", () => {
                wasOver.current = true;
            });
            toolbarDrag1.addEventListener("mouseout", () => {
                wasOver.current = false;
            });
            toolbarDrag2.addEventListener("mouseover", () => {
                wasOver.current = true;
            });
            toolbarDrag2.addEventListener("mouseout", () => {
                wasOver.current = false;
            });
            // Listen focus change window
            getCurrentWindow().onFocusChanged(({ payload: focused }) => {
                if (!wasOver.current) {
                    setIsFocusWindow(focused)
                }
            });
        }
    }, []);
    return isFocusWindow;
}
