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

import { IconButton, Tooltip } from '@mui/material'

import { Cached } from '@mui/icons-material';

export function IconButtonLoading(props) {
    return (
        <Tooltip title={!props.tooltip ? null : props.tooltip} placement="left-start">
            <span>
                <IconButton
                    disabled={props.animate}
                    onClick={props.onClick}
                >
                    <Cached className={props.animate ? 'spin' : ''} />
                </IconButton>
            </span>
        </Tooltip>
    );
}

IconButtonLoading.propTypes = {
    tooltip: PropTypes.string,
    animate: PropTypes.bool,
    onClick: PropTypes.func,
};
