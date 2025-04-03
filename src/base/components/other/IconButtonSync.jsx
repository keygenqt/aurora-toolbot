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
import PropTypes from 'prop-types';

import { IconButton, Tooltip } from '@mui/material'

import { Cached } from '@mui/icons-material';

export function IconButtonSync(props) {
    // components
    const { t } = useTranslation();
    // page
    return (
        <Tooltip title={t('common.t_sync')} placement="left-start">
            <IconButton
                disabled={props.isLoading}
                onClick={props.onClick}
            >
                <Cached className={props.isLoading ? 'spin' : ''} />
            </IconButton>
        </Tooltip>
    );
}

IconButtonSync.propTypes = {
    isLoading: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
};
