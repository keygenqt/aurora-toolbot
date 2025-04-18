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
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";

import {
    ButtonGroup,
    Stack,
    Typography,
} from '@mui/material';

import {
    Memory,
} from '@mui/icons-material';

import { AppUtils, AvatarButton } from '../../../base';

export function PsdkGroupTargets(props) {
    // components
    const navigate = useNavigate();
    const { t } = useTranslation();
    // data
    let {
        model,
        disabled,
    } = props;
    // page
    return (
        <Stack
            direction={'column'}
            spacing={2}
        >
            <Stack
                direction={'column'}
                spacing={0.5}
            >
                <Typography variant="subtitle2" sx={{ color: 'text.primary' }} >
                    {t('psdk.t_group_targets_title')}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {t('psdk.t_group_targets_text')}
                </Typography>
            </Stack>
            <ButtonGroup
                disabled={disabled}
                orientation={'vertical'}
                color={'primaryPsdkTarget'}
            >
                {model.targets.map((target) => (
                    <AvatarButton
                        key={`index-${target.id}`}
                        icon={Memory}
                        title={target.name}
                        text={target.arch}
                        onClick={async () => {
                            AppUtils.openPage(navigate, 'psdkTarget', {
                                state: {
                                    id: model.id,
                                    idTarget: target.id
                                }
                            });
                        }}
                    />
                ))}
            </ButtonGroup>
        </Stack >
    );
}

PsdkGroupTargets.propTypes = {
    model: PropTypes.object.isRequired,
    disabled: PropTypes.bool.isRequired,
};
