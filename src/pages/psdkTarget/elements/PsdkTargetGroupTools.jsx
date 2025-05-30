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
    ButtonGroup,
    Stack,
    Typography,
} from '@mui/material';

import {
    PlaylistAdd,
    PlaylistRemove,
} from '@mui/icons-material';

import { AvatarButton } from '../../../base';
import { Methods } from '../../../modules';

export function PsdkTargetGroupTools(props) {
    // components
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
                    {t('psdkTarget.t_group_tools_title')}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {t('psdkTarget.t_group_tools_text')}
                </Typography>
            </Stack>
            <ButtonGroup
                disabled={disabled}
                orientation={'vertical'}
                color={'primaryPsdkTarget'}
            >
                <AvatarButton
                    icon={PlaylistAdd}
                    title={t('psdkTarget.t_btn_group_tools_rpm_title')}
                    text={t('psdkTarget.t_btn_group_tools_rpm_text')}
                    onClick={async () => {
                        // @todo
                    }}
                />
                <AvatarButton
                    icon={PlaylistRemove}
                    title={t('psdkTarget.t_btn_group_tools_uninstall_title')}
                    text={t('psdkTarget.t_btn_group_tools_uninstall_text')}
                    onClick={async () => {
                        // @todo
                    }}
                />
            </ButtonGroup>
        </Stack >
    );
}

PsdkTargetGroupTools.propTypes = {
    model: PropTypes.object.isRequired,
    target: PropTypes.object.isRequired,
    disabled: PropTypes.bool.isRequired,
};
