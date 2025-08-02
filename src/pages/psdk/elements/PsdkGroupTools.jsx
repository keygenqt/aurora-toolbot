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
    Task,
    Delete,
} from '@mui/icons-material';

import { AvatarButton, MainDialog, SelectFileDialog } from '../../../base';
import { Methods } from '../../../modules';

export function PsdkGroupTools(props) {
    // components
    const { t } = useTranslation();
    // states
    const [isDialogSelectFile, setIsDialogSelectFile] = React.useState(false);
    const [isDialogSign, setIsDialogSign] = React.useState(false);
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
            <SelectFileDialog
                color={'primaryPsdk'}
                open={isDialogSelectFile}
            />
            <MainDialog
                icon={Task}
                color={'primaryPsdk'}
                title={t('psdk.t_btn_group_sign_title')}
                body={dialogBody}
                state={dialogState}
                open={isDialogSign}
                onClickBtn={async () => {
                    setIsDialogSign(false);
                    // Delay close
                    await new Promise(r => setTimeout(r, 200));
                    // Clear
                    setDialogBody(undefined);
                    setDialogState('default');
                }}
            />
            <MainDialog
                icon={Delete}
                color={'primaryPsdk'}
                title={t('psdk.t_dialog_remove_title')}
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
                    onRemove();
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
                    /** Not work in flatpak - psdk can't mount files  */
                    {/* <AvatarButton
                        icon={Task}
                        title={t('psdk.t_btn_group_sign_title')}
                        text={t('psdk.t_btn_group_sign_text')}
                        onClick={async () => {
                            setIsDialogSelectFile(true);
                            const path = await open({
                                multiple: false,
                                filters: [{
                                    name: 'Package RPM',
                                    extensions: ['rpm']
                                }]
                            });
                            setIsDialogSelectFile(false);
                            if (path) {
                                setIsDialogSign(true);
                                setDialogBody(t('common.t_dialog_body_connection'));
                                try {
                                    await Methods.psdk_package_sign_by_id(path, model.id);
                                    await new Promise(r => setTimeout(r, 500)); // animation delay
                                    setDialogState('success');
                                    setDialogBody(t('psdk.t_dialog_success_sign'));
                                } catch (e) {
                                    setDialogState('error');
                                    setDialogBody(t('common.t_dialog_body_error'));
                                }
                            }
                        }}
                    /> */}
                    <AvatarButton
                        icon={Delete}
                        title={t('psdk.t_btn_group_remove_title')}
                        text={t('psdk.t_btn_group_remove_text')}
                        onClick={async () => {
                            setIsDialogRemove(true);
                            setDialogBody(t('psdk.t_dialog_remove_body'));
                            try {
                                await Methods.psdk_uninstall_by_id(model.id);
                                setDialogState('success');
                                setDialogBody(t('psdk.t_dialog_success_remove'));
                            } catch (e) {
                                setDialogState('error');
                                setDialogBody(t('common.t_dialog_body_error'));
                            }
                        }}
                    />
                </ButtonGroup>
            </Stack >
        </>
    );
}

PsdkGroupTools.propTypes = {
    model: PropTypes.object.isRequired,
    disabled: PropTypes.bool.isRequired,
    onRemove: PropTypes.func.isRequired,
};
