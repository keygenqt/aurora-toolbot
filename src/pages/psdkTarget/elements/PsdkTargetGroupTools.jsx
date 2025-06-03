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
    Search,
    PlaylistAdd,
    PlaylistRemove,
} from '@mui/icons-material';

import { AvatarButton, SelectItemDialog, TextFieldDialog, SelectFileDialog, MainDialog } from '../../../base';
import { Methods } from '../../../modules';

export function PsdkTargetGroupTools(props) {
    // components
    const { t } = useTranslation();
    // data
    let {
        model,
        target,
        disabled,
        onAnimate,
    } = props;
    // states
    const [isDialogSelectFile, setIsDialogSelectFile] = React.useState(false);
    const [dialogSelectItems, setDialogSelectItems] = React.useState(undefined);
    const [isDialogTextField, setIsDialogTextField] = React.useState(false);
    const [dialogTextFiledValue, setDialogTextFiledValue] = React.useState(undefined);

    const [isDialogSelectItemUninstall, setIsDialogSelectItemUninstall] = React.useState(false);
    const [dialogSelectItemUninstall, setDialogSelectItemUninstall] = React.useState(undefined);

    const [isDialogInstall, setIsDialogInstall] = React.useState(false);
    const [isDialogUninstall, setIsDialogUninstall] = React.useState(false);
    const [dialogProgress, setDialogProgress] = React.useState(undefined);
    const [dialogState, setDialogState] = React.useState('default');
    const [dialogBody, setDialogBody] = React.useState(undefined);
    // uninstall app find
    React.useEffect(() => {
        if (dialogTextFiledValue) {
            (async function () {
                try {
                    onAnimate(true);
                    setDialogSelectItems((await Methods.psdk_target_package_find_target_by_id(dialogTextFiledValue, target.id, model.id)).packages.map((e) => {
                        return {
                            id: e.id,
                            value: e.name,
                        }
                    }));
                    setDialogTextFiledValue(undefined);
                    setIsDialogSelectItemUninstall(true);
                    setTimeout(() => onAnimate(false), 300);
                } catch (e) {
                    onAnimate(false);
                }
            })();
        }
    }, [dialogTextFiledValue]);
    // uninstall app
    React.useEffect(() => {
        if (dialogSelectItemUninstall) {
            (async function () {
                setIsDialogUninstall(true);
                setDialogBody(t('common.t_dialog_body_connection'));
                try {
                    await Methods.psdk_target_package_uninstall_target_by_id(dialogSelectItemUninstall.value, target.id, model.id);
                    setDialogState('success');
                    setDialogBody(t('emulator.t_dialog_success_uninstall'));
                } catch (e) {
                    setDialogState('error');
                    setDialogBody(t('common.t_dialog_body_error'));
                }
            })();
        }
    }, [dialogSelectItemUninstall]);
    // page
    return (
        <>
            <SelectFileDialog
                color={'primaryPsdkTarget'}
                open={isDialogSelectFile}
            />
            <TextFieldDialog
                icon={Search}
                color={'primaryPsdkTarget'}
                title={t('common.t_dialog_search_package.title')}
                placeholder={'flutter-embedder'}
                open={isDialogTextField}
                onClickBtn={async (text) => {

                    console.log(text)

                    setDialogTextFiledValue(text);
                    setIsDialogTextField(false);
                }}
            />
            <MainDialog
                icon={PlaylistAdd}
                color={'primaryPsdkTarget'}
                title={t('psdkTarget.t_btn_group_tools_rpm_title')}
                body={dialogBody}
                state={dialogState}
                open={isDialogInstall}
                progress={dialogProgress}
                onClickBtn={async () => {
                    setIsDialogInstall(false);
                    // Delay close
                    await new Promise(r => setTimeout(r, 200));
                    // Clear
                    setDialogBody(undefined);
                    setDialogState('default');
                    setDialogProgress(undefined);
                }}
            />
            <SelectItemDialog
                icon={PlaylistRemove}
                color={'primaryPsdkTarget'}
                title={t('psdkTarget.t_btn_group_tools_uninstall_title')}
                open={isDialogSelectItemUninstall}
                data={dialogSelectItems}
                onClickBtn={async (item) => {
                    setIsDialogSelectItemUninstall(false);
                    setDialogSelectItemUninstall(item);
                    // Delay close
                    await new Promise(r => setTimeout(r, 200));
                    // Clear
                    setDialogSelectItems(undefined);
                }}
            />
            <MainDialog
                icon={PlaylistRemove}
                color={'primaryPsdkTarget'}
                title={t('psdkTarget.t_btn_group_tools_uninstall_title')}
                body={dialogBody}
                state={dialogState}
                open={isDialogUninstall}
                onClickBtn={async () => {
                    setIsDialogUninstall(false);
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
                                setIsDialogInstall(true);
                                setDialogBody(t('psdkTarget.t_dialog_success_install_start'));
                                await new Promise(r => setTimeout(r, 500)); // animation delay
                                try {
                                    await Methods.psdk_target_package_install_by_id(path, model.id);
                                    await new Promise(r => setTimeout(r, 500)); // animation delay
                                    setDialogState('success');
                                    setDialogBody(t('psdkTarget.t_dialog_success_install'));
                                } catch (e) {
                                    setDialogState('error');
                                    setDialogBody(t('common.t_dialog_body_error'));
                                }
                            }
                        }}
                    />
                    <AvatarButton
                        icon={PlaylistRemove}
                        title={t('psdkTarget.t_btn_group_tools_uninstall_title')}
                        text={t('psdkTarget.t_btn_group_tools_uninstall_text')}
                        onClick={async () => {
                            setIsDialogTextField(true);
                        }}
                    />
                </ButtonGroup>
            </Stack >
        </>
    );
}

PsdkTargetGroupTools.propTypes = {
    model: PropTypes.object.isRequired,
    target: PropTypes.object.isRequired,
    disabled: PropTypes.bool.isRequired,
    onAnimate: PropTypes.func.isRequired,
};
