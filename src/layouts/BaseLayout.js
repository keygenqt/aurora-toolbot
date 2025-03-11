import * as React from 'react';
import PropTypes from 'prop-types';
import {getCurrentWindow} from '@tauri-apps/api/window';

import {Box, Stack, AppBar, Toolbar, Typography, IconButton} from '@mui/material';
import {MoreVert, Minimize, Close} from '@mui/icons-material';

export function BaseLayout(props) {
    const appWindow = window.isTauri ? getCurrentWindow() : undefined;
    return (
        <>
            <AppBar
                position="static"
                variant="dense"
                size="small"
                sx={{
                    backgroundColor: 'transparent'
                }}
            >
                <Toolbar data-tauri-drag-region id={"toolbarDrag1"}>
                    <IconButton
                        size="small"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MoreVert />
                    </IconButton>
                    <Typography
                        id={"toolbarDrag2"}
                        color='inherit'
                        data-tauri-drag-region
                        variant="subtitle2"
                        component="div"
                        sx={{ flexGrow: 1, textAlign: 'center' }}
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
                                size="small"
                                onClick={() => {
                                    appWindow.minimize()
                                }}
                            >
                                <Minimize />
                            </IconButton>
                            <IconButton
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    appWindow.close()
                                }}
                            >
                                <Close />
                            </IconButton>
                        </Stack>
                    ) : (
                        <Box sx={{ width: '28px' }}/>
                    )}
                </Toolbar>
            </AppBar>
            <Box
                boxSizing={'border-box'}
                height={'calc(100% - 45px)'}
                sx={{p: '18px'}}
            >
                {props.children}
            </Box>
        </>
    )
}

BaseLayout.propTypes = {
    children: PropTypes.element.isRequired,
};
