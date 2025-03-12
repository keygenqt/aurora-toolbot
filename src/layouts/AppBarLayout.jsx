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

import { Box, Stack, AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import { Minimize, Close } from '@mui/icons-material';

export function AppBarLayout(props) {
    const appWindow = window.isTauri ? getCurrentWindow() : undefined;
    return (
        <>
            <AppBar
                position="static"
                variant="dense"
                sx={{ backgroundColor: 'transparent' }}
            >
                <Toolbar data-tauri-drag-region id={"toolbarDrag1"}>
                    {props.actions ?? (
                        <Box sx={{ width: '28px' }} />
                    )}
                    <Typography
                        id={"toolbarDrag2"}
                        color='inherit'
                        data-tauri-drag-region
                        variant="subtitle2"
                        component="div"
                        sx={{ flexGrow: 1, textAlign: 'center', paddingLeft: window.isTauri ? 4 : 0.5 }}
                    >
                        Aurora Toolbot
                    </Typography>

                    {appWindow ? (
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
                    ) : (
                        <Box sx={{ width: '28px' }} />
                    )}
                </Toolbar>
            </AppBar>
            <Box
                boxSizing={'border-box'}
                height={'calc(100% - 45px)'}
                sx={{ p: '18px' }}
            >
                {props.children}
            </Box>
        </>
    )
}

AppBarLayout.propTypes = {
    actions: PropTypes.element,
    children: PropTypes.element.isRequired,
};
