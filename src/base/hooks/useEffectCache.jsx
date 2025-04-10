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
import React from 'react';

/**
 * Save cache
 */
export function useEffectCache(key) {
    const parse = (data) => { try { return JSON.parse(data); } catch (e) { return null; } };
    const [value, setValue] = React.useState(parse(localStorage.getItem(key)));
    React.useLayoutEffect(() => {
        const element = document.querySelector('#root');
        const observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                if (mutation.type === "attributes") {
                    try {
                        setValue(JSON.parse(localStorage.getItem(key)));
                    } catch (e) {
                        setValue(null);
                    }
                }
            });
        });
        observer.observe(element, {
            attributes: true
        });
        return () => {
            observer.disconnect()
        };
    }, [key]);
    return value;
}
