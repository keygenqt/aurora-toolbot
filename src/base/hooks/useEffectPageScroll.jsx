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
import { useLocation } from "react-router";
import { useSelector, useDispatch } from 'react-redux';

import { setData } from '../../store/impl/pageScroll'

/**
 * Get windows size
 *
 * @returns {{x: number, y: number}}
 */
export function useEffectPageScroll() {
    const { pathname } = useLocation();
    const pageScroll = useSelector((state) => state.pageScroll.data);
    const dispatch = useDispatch();
    React.useLayoutEffect(() => {
        const el = document.getElementById("page_scroll");
        const handleWindowScroll = () => {
            dispatch(setData({
                pathname: pathname,
                y: el.scrollTop,
            }));
        };
        el.addEventListener('scroll', handleWindowScroll);
        return () => {
            el.removeEventListener('scroll', handleWindowScroll);
        };
    });
    return pageScroll.hasOwnProperty(pathname) ? pageScroll[pathname] : 0;
}
