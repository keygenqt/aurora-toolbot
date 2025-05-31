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
    ReceiptLong,
    Delete,
} from '@mui/icons-material';

import { AppUtils, AvatarButton, MainDialog, SelectFileDialog, SelectDirDialog } from '../../../base';
import { Methods } from '../../../modules';

export function FlutterGroupTools(props) {
    // components
    const { t } = useTranslation();
    // data
    let {
        model,
        disabled,
        onAnimate,
    } = props;
    // states
    const [isDialogSelectDir, setIsDialogSelectDir] = React.useState(false);
    const [isDialogSelectFile, setIsDialogSelectFile] = React.useState(false);
    const [isDialogFormat, setIsDialogFormat] = React.useState(false);
    const [isDialogReport, setIsDialogReport] = React.useState(false);
    const [dialogProgress, setDialogProgress] = React.useState(undefined);
    const [dialogState, setDialogState] = React.useState('default');
    const [dialogBody, setDialogBody] = React.useState(undefined);
    // page
    return (
        <>
            <SelectDirDialog
                color={'primaryFlutter'}
                open={isDialogSelectDir}
            />
            <SelectFileDialog
                color={'primaryFlutter'}
                open={isDialogSelectFile}
            />
            <MainDialog
                icon={FormatIndentIncrease}
                color={'primaryFlutter'}
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
                    setDialogProgress(undefined);
                }}
            />
            <MainDialog
                icon={ReceiptLong}
                color={'primaryFlutter'}
                title={t('flutter.t_btn_group_gen_report_title')}
                body={dialogBody}
                state={dialogState}
                open={isDialogReport}
                progress={dialogProgress}
                onClickBtn={async () => {
                    setIsDialogReport(false);
                    // Delay close
                    await new Promise(r => setTimeout(r, 200));
                    // Cancel if progress
                    if (Boolean(dialogProgress) && dialogProgress !== 100) {
                        await Methods.restart_dbus();
                    }
                    // Clear
                    setDialogBody(undefined);
                    setDialogState('default');
                    setDialogProgress(undefined);
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
                        {t('flutter.t_group_tools_title')}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {t('flutter.t_group_tools_text')}
                    </Typography>
                </Stack>
                <ButtonGroup
                    disabled={disabled}
                    orientation={'vertical'}
                    color={'primaryFlutter'}
                >
                    <AvatarButton
                        icon={FormatIndentIncrease}
                        title={t('flutter.t_btn_group_format_title')}
                        text={t('flutter.t_btn_group_format_text')}
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
                                    let state = await Methods.flutter_project_format_by_id(path, model.id);
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
                        icon={ReceiptLong}
                        title={t('flutter.t_btn_group_gen_report_title')}
                        text={t('flutter.t_btn_group_gen_report_text')}
                        onClick={async () => {
                            setIsDialogSelectFile(true);
                            const path = await open({
                                multiple: false,
                                filters: [{
                                    name: 'pubspec',
                                    extensions: ['yaml']
                                }]
                            });
                            setIsDialogSelectFile(false);
                            if (path) {
                                setDialogProgress(0);
                                setIsDialogReport(true);
                                setDialogBody(t('common.t_dialog_body_connection'));
                                const unlisten = await Methods.dbus_state_listen((state) => {
                                    if (state.state == 'Progress') {
                                        setDialogProgress(parseInt(state.message));
                                    }
                                    if (state.state == 'State') {
                                        setDialogBody(AppUtils.formatMessage(state.message));
                                    }
                                })
                                if (unlisten) {
                                    try {
                                        const result = await Methods.flutter_project_report_path_by_id(path, model.id);
                                        await unlisten();
                                        await Methods.app_open_file(result.path);
                                        setDialogState('success');
                                        setDialogBody(t('flutter.t_dialog_success_report'));
                                    } catch (e) {
                                        await unlisten();
                                        setDialogState('error');
                                        setDialogBody(t('common.t_dialog_body_error'));
                                    }
                                }
                            }
                        }}
                    />
                    <AvatarButton
                        icon={Delete}
                        title={t('flutter.t_btn_group_remove_title')}
                        text={t('flutter.t_btn_group_remove_text')}
                        onClick={async () => {
                            // @todo dialog
                            // await Methods.flutter_uninstall();
                        }}
                    />
                </ButtonGroup>
            </Stack >
        </>
    );
}

FlutterGroupTools.propTypes = {
    model: PropTypes.object.isRequired,
    disabled: PropTypes.bool.isRequired,
    onAnimate: PropTypes.func.isRequired,
};
