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

import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';

export function AlertDialog(props) {

    const {
        title,
        body,
        agreeText,
        disagreeText,
        open,
        onClose,
        agree,
    } = props

    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            sx={{
                '& .MuiPaper-root': {
                    width: '100%',
                    maxWidth: '335px',
                }
            }}
        >
            <DialogTitle id="alert-dialog-title">
                {title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {body}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    color="inherit"
                    onClick={onClose}>
                    {disagreeText}
                </Button>
                {agree && (
                    <Button
                        autoFocus
                        onClick={() => {
                            onClose();
                            agree();
                        }}
                    >
                        {agreeText}
                    </Button>
                )}
            </DialogActions>
        </Dialog>
    );
}

AlertDialog.propTypes = {
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    agreeText: PropTypes.string.isRequired,
    disagreeText: PropTypes.string.isRequired,
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    agree: PropTypes.func,
};
