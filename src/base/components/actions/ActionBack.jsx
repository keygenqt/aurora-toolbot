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
import { useNavigate } from 'react-router';

import { IconButton } from '@mui/material'
import { ArrowBack } from '@mui/icons-material';

import { AppUtils } from '../../../base';

export function ActionBack(props) {
    const navigate = useNavigate();
    return (
        <IconButton
            disabled={props.disabled}
            color="inherit"
            onClick={() => AppUtils.openPage(navigate, -1)}
        >
            <ArrowBack />
        </IconButton>
    );
}

ActionBack.propTypes = {
    disabled: PropTypes.bool,
};
