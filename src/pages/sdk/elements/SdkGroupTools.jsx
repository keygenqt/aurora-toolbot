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
    useTheme,
    ButtonGroup,
    Stack,
    Typography,
} from '@mui/material';

import {
    FormatIndentIncrease,
    Delete,
} from '@mui/icons-material';

import { AppUtils, AvatarButton, MainDialog, SelectFileDialog } from '../../../base';
import { Methods } from '../../../modules';

export function SdkGroupTools(props) {
    // components
    const { t } = useTranslation();
    const theme = useTheme();
    // states
    const [isDialogSelectFile, setIsDialogSelectFile] = React.useState(false);
    const [dialogSelectItems, setDialogSelectItems] = React.useState(undefined);

    const [isDialogFormat, setIsDialogFormat] = React.useState(false);
    const [dialogState, setDialogState] = React.useState('default');
    const [dialogBody, setDialogBody] = React.useState(undefined);
    // data
    let {
        model,
        disabled,
        onAnimate,
    } = props;
    const color = theme.palette.secondary.main;
    // page
    return (
        <>
            <SelectFileDialog
                color={'primarySdk'}
                open={isDialogSelectFile}
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
                            setIsDialogSelectFile(true);
                            const path = await open({
                                multiple: false,
                                directory: true,
                            });
                            setIsDialogSelectFile(false);
                            if (path) {
                                setIsDialogFormat(true);
                                setDialogBody(t('sdk.t_dialog_format_start'));
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
                            // @todo dialog
                            await Methods.sdk_uninstall_by_id(model.id);
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
    onAnimate: PropTypes.func.isRequired,
};
