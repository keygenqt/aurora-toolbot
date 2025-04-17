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

import {
    useTheme,
    ButtonGroup,
    Stack,
    Typography,
} from '@mui/material';

import {
    Task,
    Lock,
    Delete,
} from '@mui/icons-material';

import { AvatarButton } from '../../../base';
import { Methods } from '../../../modules';

export function PsdkGroupTools(props) {
    // components
    const { t } = useTranslation();
    const theme = useTheme();
    // data
    let {
        model,
        disabled,
    } = props;
    const color = theme.palette.secondary.main;
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
                    {t('psdk.t_group_tools_title')}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {t('psdk.t_group_tools_text')}
                </Typography>
            </Stack>
            <ButtonGroup
                disabled={disabled}
                orientation={'vertical'}
                color={'primaryPsdk'}
            >
                <AvatarButton
                    icon={Task}
                    title={t('psdk.t_btn_group_sign_title')}
                    text={t('psdk.t_btn_group_sign_text')}
                    onClick={async () => {
                        // @todo
                    }}
                />
                <AvatarButton
                    icon={Lock}
                    title={t('psdk.t_btn_group_add_sudoers_title')}
                    text={t('psdk.t_btn_group_add_sudoers_text')}
                    onClick={async () => {
                        // @todo
                    }}
                />
                <AvatarButton
                    icon={Delete}
                    title={t('psdk.t_btn_group_remove_title')}
                    text={t('psdk.t_btn_group_remove_text')}
                    onClick={async () => {
                        // @todo
                    }}
                />
            </ButtonGroup>
        </Stack >
    );
}

PsdkGroupTools.propTypes = {
    model: PropTypes.object.isRequired,
    disabled: PropTypes.bool.isRequired,
};
