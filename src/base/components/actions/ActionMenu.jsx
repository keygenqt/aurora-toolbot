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
import { useTranslation } from "react-i18next";

import {
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Divider,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
    Chip,
    Box,
    Typography,
    Switch,
} from '@mui/material'
import { MoreVert } from '@mui/icons-material';

import { DarkMode, Info, OpenInNew } from '@mui/icons-material';

import { useEffectCache, AppUtils } from '../../../base'
import { AppConf } from '../../../conf/AppConf'

export function ActionMenu() {
    // components
    const { t } = useTranslation();
    const darkModeCache = useEffectCache('isDark');
    // states
    const [state, setState] = React.useState(false);
    const [about, setAbout] = React.useState(false);
    const [dark, setDark] = React.useState(darkModeCache === true);
    const toggleOpen = function (isOpen) {
        setState(isOpen);
        if (window.isTauri) {
            setTimeout(() => {
                if (isOpen) {
                    document.getElementById("menu-app").style.opacity = '1';
                } else {
                    document.getElementById("menu-app").style.opacity = '0';
                }
            }, 10);
        }
    }
    // Component
    return (
        <>
            <Dialog
                open={about}
                onClose={() => setAbout(false)}
            >
                <DialogTitle>
                    {t('common.t_app_name')}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Box sx={{ paddingBottom: 2 }}>
                            <Chip color='warning' label={AppConf.version} />
                        </Box>
                        {t('main.dialog_info.t_desc')}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setAbout(false)} autoFocus>
                        {t('common.t_btn_close')}
                    </Button>
                </DialogActions>
            </Dialog>
            <IconButton
                color="inherit"
                onClick={() => toggleOpen(true)}
            >
                <MoreVert />
            </IconButton>
            <Drawer
                anchor={'bottom'}
                variant={'temporary'}
                transitionDuration={280}
                open={state}
                onClose={() => toggleOpen(false)}
            >
                <List id='menu-app'>
                    <Typography
                        variant="subtitle2"
                        sx={{ p: 2 }}
                    >
                        {t('main.menu.t_title_settings')}
                    </Typography>
                    <ListItem key={'menu-1'} disablePadding>
                        <ListItemButton
                            onClick={() => {
                                AppUtils.setCache('isDark', !dark);
                                setDark(!dark);
                            }}
                        >
                            <ListItemIcon>
                                <DarkMode />
                            </ListItemIcon>
                            <ListItemText primary={t('main.menu.t_btn_force_dark')} />
                            <Switch
                                checked={dark}
                                onChange={() => {
                                    AppUtils.setCache('isDark', !dark);
                                    setDark(!dark);
                                }}
                            />
                        </ListItemButton>
                    </ListItem>
                    <Box sx={{ paddingTop: 2 }} />
                    <Divider />
                    <Typography
                        variant="subtitle2"
                        sx={{ p: 2 }}
                    >
                        {t('main.menu.t_title_info')}
                    </Typography>
                    <ListItem key={'menu-3'} disablePadding>
                        <ListItemButton
                            onClick={() => {
                                setTimeout(async () => {
                                    toggleOpen(false)
                                    await AppUtils.openUrl(AppConf.docUrl)
                                }, 200);
                            }}
                        >
                            <ListItemIcon>
                                <OpenInNew />
                            </ListItemIcon>
                            <ListItemText primary={t('main.menu.t_btn_docs')} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem key={'menu-4'} disablePadding>
                        <ListItemButton
                            onClick={() => {
                                setTimeout(() => {
                                    toggleOpen(false)
                                    setAbout(true)
                                }, 200);
                            }}
                        >
                            <ListItemIcon>
                                <Info />
                            </ListItemIcon>
                            <ListItemText primary={t('main.menu.t_btn_about')} />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Drawer>
        </>
    );
}

ActionMenu.propTypes = {};
