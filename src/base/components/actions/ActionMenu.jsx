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

import { IconButton, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { MoreVert } from '@mui/icons-material';

import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

export function ActionMenu() {
    const [state, setState] = React.useState(false);
    return (
        <>
            <IconButton
                color="inherit"
                onClick={() => {
                    setState(true);
                    setTimeout(() => {
                        document.getElementById("menu-app").style.opacity='1';
                    }, 10);
                }}
            >
                <MoreVert />
            </IconButton>
            <Drawer
                anchor={'bottom'}
                variant={'temporary'}
                transitionDuration={280}
                open={state}
                onClose={() => {
                    setState(false)
                    document.getElementById("menu-app").style.opacity='0';
                }}
            >
                <List id='menu-app'>
                    {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                        <ListItem key={text} disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </>
    );
}

ActionMenu.propTypes = {};
