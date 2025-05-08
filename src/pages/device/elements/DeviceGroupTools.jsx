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
    useTheme,
    ButtonGroup,
    Stack,
    Typography,
} from '@mui/material';

import {
    Aod,
    SecurityUpdate,
    AppBlocking,
    ChargingStation,
    UploadFile,
} from '@mui/icons-material';

import { AppUtils, AvatarButton } from '../../../base';
import { Methods } from '../../../modules';

export function DeviceGroupTools(props) {
    // components
    const { t } = useTranslation();
    const navigate = useNavigate();
    const theme = useTheme();
    // data
    let {
        model,
        disabled,
    } = props;
    const color = theme.palette.success.main;
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
                    {t('device.t_group_tools_title')}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {t('device.t_group_tools_text')}
                </Typography>
            </Stack>
            <ButtonGroup
                disabled={disabled}
                orientation={'vertical'}
                color={'success'}
            >
                <AvatarButton
                    icon={Aod}
                    title={t('device.t_btn_group_install_app_title')}
                    text={t('device.t_btn_group_install_app_text')}
                    onClick={async () => {
                        AppUtils.openPage(navigate, 'appsInstall', { state: { id: model.id } });
                    }}
                />
                <AvatarButton
                    icon={SecurityUpdate}
                    title={t('device.t_btn_group_install_rpm_title')}
                    text={t('device.t_btn_group_install_rpm_text')}
                    onClick={async () => {
                        // @todo
                    }}
                />
                <AvatarButton
                    icon={AppBlocking}
                    title={t('device.t_btn_group_install_uninstall_title')}
                    text={t('device.t_btn_group_install_uninstall_text')}
                    onClick={async () => {
                        // @todo
                    }}
                />
                <AvatarButton
                    icon={ChargingStation}
                    title={t('device.t_btn_group_install_run_app_title')}
                    text={t('device.t_btn_group_install_run_app_text')}
                    onClick={async () => {
                        // @todo
                    }}
                />
                <AvatarButton
                    icon={UploadFile}
                    title={t('device.t_btn_group_install_upload_title')}
                    text={t('device.t_btn_group_install_upload_text')}
                    onClick={async () => {
                        // @todo
                    }}
                />
            </ButtonGroup>
        </Stack >
    );
}

DeviceGroupTools.propTypes = {
    model: PropTypes.object.isRequired,
    disabled: PropTypes.bool.isRequired,
};
