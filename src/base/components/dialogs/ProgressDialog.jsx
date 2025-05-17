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

import { Dialog, DialogTitle, DialogContent, DialogContentText, LinearProgress, Stack, Box } from '@mui/material';

export function ProgressDialog(props) {

    const {
        title,
        body,
        progress,
        open,
        onClose,
    } = props

    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="progress-dialog-title"
            aria-describedby="progress-dialog-description"
        >
            <DialogTitle id="progress-dialog-title">
                {title}
            </DialogTitle>
            <DialogContent>
                <Stack
                    spacing={2}
                >
                    <LinearProgress variant="determinate" value={progress} />
                    <DialogContentText id="progress-dialog-description">
                        {body}
                    </DialogContentText>
                </Stack>

            </DialogContent>
        </Dialog>
    );
}

ProgressDialog.propTypes = {
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    progress: PropTypes.number.isRequired,
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};
