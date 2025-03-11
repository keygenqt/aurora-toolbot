import * as React from 'react';
import {getCurrentWindow} from '@tauri-apps/api/window';

export function useEffectFocus() {
    const [isFocusWindow, setIsFocusWindow] = React.useState(true);
    const wasCalled = React.useRef(false);
    const wasOver = React.useRef(false);
    React.useEffect(() => {
        if(wasCalled.current) return;
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
