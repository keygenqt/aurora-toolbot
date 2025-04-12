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
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
    useTheme,
    ButtonGroup,
    Button,
    Typography,
    CardContent,
    Tooltip,
    IconButton,
    CircularProgress,
} from '@mui/material';

import { Terminal } from '@mui/icons-material';

import { DataImages, CardGradient } from '../../../base';
import { Methods } from '../../../modules';

// @todo
export function EmulatorGroupTerminal(props) {
    // components
    const { t } = useTranslation();
    const theme = useTheme();
    // data
    let {
        model,
        isUpdate,
        onUpdate,
        onRefresh,
    } = props;
    const color = theme.palette.secondary.main;
    // page
    return (
        <ButtonGroup
            orientation="vertical"
            aria-label="Vertical button group"
        >
            <Button
                color={'secondary'}
                sx={{ borderRadius: 2 }}
                key="one"
                startIcon={<Terminal color="inherit" />}
            >
                Open in terminal like User
            </Button>
            <Button
                color={'secondary'}
                sx={{ borderRadius: 2 }}
                key="one"
                startIcon={<Terminal color="error" />}
            >
                Open in terminal like Root
            </Button>
        </ButtonGroup>
    );
}

EmulatorGroupTerminal.propTypes = {
    model: PropTypes.object.isRequired,
    isUpdate: PropTypes.bool.isRequired,
    onUpdate: PropTypes.func.isRequired,
    onRefresh: PropTypes.func.isRequired,
};
