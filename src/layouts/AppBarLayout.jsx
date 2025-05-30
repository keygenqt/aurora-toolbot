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
import PropTypes from 'prop-types';
import { getCurrentWindow } from '@tauri-apps/api/window';
import { useLocation } from "react-router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useTheme, Box, Stack, AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import { Minimize, Close } from '@mui/icons-material';

import { useEffectPageScroll, useEffectWindowResize } from '../base';

export function AppBarLayout(props) {
    // components
    const appWindow = window.isTauri ? getCurrentWindow() : undefined;
    const theme = useTheme();
    // restoring scroll
    const scrollTop = useEffectPageScroll();
    const { pathname } = useLocation();
    React.useEffect(() => {
        document.getElementById("page_scroll").scrollTop = scrollTop;
    }, [pathname]);
    // scroll padding for telegram web
    const size = useEffectWindowResize();
    const [padding, setPadding] = React.useState(22);
    React.useEffect(() => {
        if (!window.isTauri && !window.isMobile) {
            let scroll = document.getElementById("page_scroll");
            if (scroll.scrollHeight > scroll.clientHeight) {
                setPadding(18)
            } else {
                setPadding(22)
            }
        }
    }, [size]);
    // page
    return (
        <>
            <AppBar
                position="static"
                variant="dense"
                sx={{
                    zIndex: 99,
                    position: 'relative',
                    backgroundColor: 'transparent',
                    boxShadow: `0 8px 8px ${theme.palette.background.default}`,
                    transition: 'none !important',
                }}
            >
                <Toolbar data-tauri-drag-region id={"toolbarDrag1"}>
                    <Box sx={{ minWidth: 56 }}>
                        {props.actions}
                    </Box>
                    <Box sx={{ flexGrow: 1 }} />
                    {window.isMobile == false && (
                        <Typography
                            id={"toolbarDrag2"}
                            color='inherit'
                            data-tauri-drag-region
                            variant="subtitle2"
                            component="div"
                        >
                            Aurora Toolbot
                        </Typography>
                    )}
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ minWidth: 56 }}>
                        {appWindow && (
                            <Stack
                                direction="row"
                                spacing={1}
                                sx={{
                                    justifyContent: "flex-end",
                                    alignItems: "center",
                                }}
                            >
                                <IconButton
                                    color="inherit"
                                    onClick={() => {
                                        appWindow.minimize()
                                    }}
                                >
                                    <Minimize />
                                </IconButton>
                                <IconButton
                                    color="inherit"
                                    onClick={() => {
                                        appWindow.close()
                                    }}
                                >
                                    <Close />
                                </IconButton>
                            </Stack>
                        )}
                    </Box>
                </Toolbar>
            </AppBar>
            <Box
                id="page_scroll"
                className={'AppScroll'}
                sx={{
                    paddingLeft: '22px',
                    paddingRight: `${padding}px`,
                }}
            >
                {props.bg === 'faq' && (
                    <Box sx={{
                        height: 200,
                        width: 200,
                        position: 'absolute',
                        bottom: 0,
                        right: 0,
                        textAlign: 'center',
                    }} >
                        <FontAwesomeIcon
                            style={{ fontSize: 160, color: 'secondary', opacity: 0.05 }}
                            icon="fa-solid fa-clipboard-question"
                        />
                    </Box>
                )}
                {props.children}
            </Box>
        </>
    )
}

AppBarLayout.propTypes = {
    bg: PropTypes.oneOf(['faq']),
    actions: PropTypes.element,
    padding: PropTypes.number,
    children: PropTypes.element.isRequired,
};
