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
import { open } from '@tauri-apps/plugin-dialog';

import {
    ButtonGroup,
    Stack,
    Typography,
} from '@mui/material';

import {
    FormatIndentIncrease,
    Delete,
} from '@mui/icons-material';

import { AppUtils, AvatarButton, MainDialog, SelectDirDialog } from '../../../base';
import { Methods } from '../../../modules';

export function SdkGroupTools(props) {
    // components
    const { t } = useTranslation();
    // states
    const [isDialogSelectDir, setIsDialogSelectDir] = React.useState(false);
    const [isDialogFormat, setIsDialogFormat] = React.useState(false);
    const [isDialogRemove, setIsDialogRemove] = React.useState(false);
    const [dialogState, setDialogState] = React.useState('default');
    const [dialogBody, setDialogBody] = React.useState(undefined);
    // data
    let {
        model,
        disabled,
        onRemove,
    } = props;
    // page
    return (
        <>
            <SelectDirDialog
                color={'primarySdk'}
                open={isDialogSelectDir}
            />
            <MainDialog
                icon={FormatIndentIncrease}
                color={'primarySdk'}
                title={t('sdk.t_btn_group_format_title')}
                body={dialogBody}
                state={dialogState}
                open={isDialogFormat}
                onClickBtn={async () => {
                    setIsDialogFormat(false);
                    // Delay close
                    await new Promise(r => setTimeout(r, 200));
                    // Clear
                    setDialogBody(undefined);
                    setDialogState('default');
                }}
            />
            <MainDialog
                icon={Delete}
                color={'primarySdk'}
                title={t('sdk.t_dialog_remove_title')}
                body={dialogBody}
                state={dialogState}
                open={isDialogRemove}
                onClickBtn={async () => {
                    setIsDialogRemove(false);
                    // Delay close
                    await new Promise(r => setTimeout(r, 200));
                    // Clear
                    setDialogBody(undefined);
                    setDialogState('default');
                    // Refresh and back
                    if (dialogState != 'error') {
                        onRemove();
                    }
                }}
            />
            <Stack
                direction={'column'}
                spacing={2}
            >
                <Stack
                    direction={'column'}
                    spacing={0.5}
                >
                    <Typography variant="subtitle2" sx={{ color: 'text.primary' }} >
                        {t('sdk.t_group_tools_title')}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {t('sdk.t_group_tools_text')}
                    </Typography>
                </Stack>
                <ButtonGroup
                    disabled={disabled}
                    orientation={'vertical'}
                    color={'primarySdk'}
                >
                    <AvatarButton
                        icon={FormatIndentIncrease}
                        title={t('sdk.t_btn_group_format_title')}
                        text={t('sdk.t_btn_group_format_text')}
                        onClick={async () => {
                            setIsDialogSelectDir(true);
                            const path = await open({
                                multiple: false,
                                directory: true,
                            });
                            setIsDialogSelectDir(false);
                            if (path) {
                                setIsDialogFormat(true);
                                setDialogBody(t('common.t_dialog_body_format_start'));
                                try {
                                    let state = await Methods.sdk_project_format_by_id(path, model.id);
                                    setDialogState('success');
                                    setDialogBody(AppUtils.formatMessage(state.message, '.'));
                                } catch (e) {
                                    setDialogState('error');
                                    setDialogBody(t('common.t_dialog_body_error'));
                                }
                            }
                        }}
                    />
                    <AvatarButton
                        icon={Delete}
                        title={t('sdk.t_btn_group_remove_title')}
                        text={t('sdk.t_btn_group_remove_text')}
                        onClick={async () => {
                            setIsDialogRemove(true);
                            setDialogBody(t('common.t_dialog_body_connection'));
                            const unlisten = await Methods.dbus_state_listen((state) => {
                                if (state.state == 'State') {
                                    setDialogBody(AppUtils.formatMessage(state.message));
                                }
                            })
                            if (unlisten) {
                                setDialogBody(t('sdk.t_dialog_remove_body'));
                                try {
                                    const result = await Methods.sdk_uninstall_by_id(model.id);
                                    await unlisten();
                                    if (result.state == "Warning") {
                                        setDialogState('error');
                                        setDialogBody(AppUtils.formatMessage(result.message));
                                    } else {
                                        setDialogState('success');
                                        setDialogBody(t('sdk.t_dialog_success_remove'));
                                    }
                                } catch (e) {
                                    await unlisten();
                                    setDialogState('error');
                                    setDialogBody(t('common.t_dialog_body_error'));
                                }
                            }
                        }}
                    />
                </ButtonGroup>
            </Stack >
        </>
    );
}

SdkGroupTools.propTypes = {
    model: PropTypes.object.isRequired,
    disabled: PropTypes.bool.isRequired,
    onRemove: PropTypes.func.isRequired,
};
