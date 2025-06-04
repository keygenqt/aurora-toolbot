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
import { open } from '@tauri-apps/plugin-dialog';

import {
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

import { AppUtils, AvatarButton, MainDialog, SelectFileDialog, SelectItemDialog } from '../../../base';
import { Methods } from '../../../modules';

export function DeviceGroupTools(props) {
    // components
    const { t } = useTranslation();
    const navigate = useNavigate();
    // data
    let {
        model,
        disabled,
        onAnimate,
    } = props;
    // states
    const [isDialogSelectFile, setIsDialogSelectFile] = React.useState(false);
    const [dialogSelectItems, setDialogSelectItems] = React.useState(undefined);

    const [isDialogSelectItemRun, setIsDialogSelectItemRun] = React.useState(false);
    const [dialogSelectItemRun, setDialogSelectItemRun] = React.useState(undefined);

    const [isDialogSelectItemUninstall, setIsDialogSelectItemUninstall] = React.useState(false);
    const [dialogSelectItemUninstall, setDialogSelectItemUninstall] = React.useState(undefined);

    const [isDialogInstall, setIsDialogInstall] = React.useState(false);
    const [isDialogRun, setIsDialogRun] = React.useState(false);
    const [isDialogUninstall, setIsDialogUninstall] = React.useState(false);
    const [isDialogUpload, setIsDialogUpload] = React.useState(false);
    const [dialogProgress, setDialogProgress] = React.useState(undefined);
    const [dialogState, setDialogState] = React.useState('default');
    const [dialogBody, setDialogBody] = React.useState(undefined);
    // run app
    React.useEffect(() => {
        if (dialogSelectItemRun) {
            (async function () {
                setIsDialogRun(true);
                setDialogState('lock');
                setDialogBody(t('common.t_dialog_body_run_success'));
                try {
                    await Methods.device_package_run_package_by_id(dialogSelectItemRun.value, model.id);
                } catch (e) {
                    setDialogState('error');
                    setDialogBody(t('common.t_dialog_body_error'));
                }
            })();
        }
    }, [dialogSelectItemRun]);
    // uninstall app
    React.useEffect(() => {
        if (dialogSelectItemUninstall) {
            (async function () {
                setIsDialogUninstall(true);
                setDialogBody(t('common.t_dialog_body_connection'));
                try {
                    await Methods.device_package_uninstall_package_by_id(dialogSelectItemUninstall.value, model.id);
                    setDialogState('success');
                    setDialogBody(t('device.t_dialog_success_uninstall'));
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
                color={'primaryDevice'}
                open={isDialogSelectFile}
            />
            <MainDialog
                icon={SecurityUpdate}
                color={'primaryDevice'}
                title={t('device.t_btn_group_tools_rpm_title')}
                body={dialogBody}
                state={dialogState}
                open={isDialogInstall}
                progress={dialogProgress}
                onClickBtn={async () => {
                    setIsDialogInstall(false);
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
            <SelectItemDialog
                icon={ChargingStation}
                color={'primaryDevice'}
                title={t('device.t_btn_group_tools_run_app_title')}
                open={isDialogSelectItemRun}
                data={dialogSelectItems}
                onClickBtn={async (item) => {
                    setIsDialogSelectItemRun(false);
                    setDialogSelectItemRun(item);
                    // Delay close
                    await new Promise(r => setTimeout(r, 200));
                    // Clear
                    setDialogSelectItems(undefined);
                }}
            />
            <MainDialog
                icon={ChargingStation}
                color={'primaryDevice'}
                title={t('device.t_btn_group_tools_run_app_title')}
                body={dialogBody}
                state={dialogState}
                open={isDialogRun}
                onClickBtn={async () => {
                    setIsDialogRun(false);
                    // Delay close
                    await new Promise(r => setTimeout(r, 200));
                    // Cancel connect
                    await Methods.restart_dbus();
                    // Clear
                    setDialogBody(undefined);
                    setDialogState('default');
                }}
            />
            <SelectItemDialog
                icon={AppBlocking}
                color={'primaryDevice'}
                title={t('device.t_btn_group_tools_uninstall_title')}
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
                icon={AppBlocking}
                color={'primaryDevice'}
                title={t('device.t_btn_group_tools_uninstall_title')}
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
            <MainDialog
                icon={UploadFile}
                color={'primaryDevice'}
                title={t('device.t_btn_group_tools_upload_title')}
                body={dialogBody}
                state={dialogState}
                open={isDialogUpload}
                progress={dialogProgress}
                onClickBtn={async () => {
                    setIsDialogUpload(false);
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
                        {t('device.t_group_tools_title')}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {t('device.t_group_tools_text')}
                    </Typography>
                </Stack>
                <ButtonGroup
                    disabled={disabled}
                    orientation={'vertical'}
                    color={'primaryDevice'}
                >
                    <AvatarButton
                        icon={Aod}
                        title={t('device.t_btn_group_tools_app_title')}
                        text={t('device.t_btn_group_tools_app_text')}
                        onClick={async () => {
                            AppUtils.openPage(navigate, 'appsInstall', {
                                state: {
                                    id: model.id,
                                    type: 'device',
                                    color: 'primaryDevice',
                                }
                            });
                        }}
                    />
                    <AvatarButton
                        icon={SecurityUpdate}
                        title={t('device.t_btn_group_tools_rpm_title')}
                        text={t('device.t_btn_group_tools_rpm_text')}
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
                                setDialogProgress(0);
                                setIsDialogInstall(true);
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
                                        await Methods.device_package_install_path_by_id(path, model.id);
                                        await unlisten();
                                        await new Promise(r => setTimeout(r, 500)); // animation delay
                                        setDialogState('success');
                                        setDialogBody(t('device.t_dialog_success_install'));
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
                        icon={ChargingStation}
                        title={t('device.t_btn_group_tools_run_app_title')}
                        text={t('device.t_btn_group_tools_run_app_text')}
                        onClick={async () => {
                            // Done
                            try {
                                onAnimate(true);
                                setDialogSelectItems((await Methods.device_package_run_by_id(model.id)).variants.map((e) => {
                                    return {
                                        id: e.incoming.id,
                                        value: e.incoming.package,
                                    }
                                }));
                                setIsDialogSelectItemRun(true);
                                setTimeout(() => onAnimate(false), 300);
                            } catch (e) {
                                console.log(e)
                            }
                        }}
                    />
                    <AvatarButton
                        icon={AppBlocking}
                        title={t('device.t_btn_group_tools_uninstall_title')}
                        text={t('device.t_btn_group_tools_uninstall_text')}
                        onClick={async () => {
                            try {
                                // Done
                                onAnimate(true);
                                setDialogSelectItems((await Methods.device_package_uninstall_by_id(model.id)).variants.map((e) => {
                                    return {
                                        id: e.incoming.id,
                                        value: e.incoming.package,
                                    }
                                }));
                                setIsDialogSelectItemUninstall(true);
                                setTimeout(() => onAnimate(false), 300);
                            } catch (e) {
                                console.log(e)
                            }
                        }}
                    />
                    <AvatarButton
                        icon={UploadFile}
                        title={t('device.t_btn_group_tools_upload_title')}
                        text={t('device.t_btn_group_tools_upload_text')}
                        onClick={async () => {
                            // Done
                            setIsDialogSelectFile(true);
                            const path = await open({
                                multiple: false,
                            });
                            setIsDialogSelectFile(false);
                            if (path) {
                                setDialogProgress(0);
                                setIsDialogUpload(true);
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
                                        await Methods.device_upload_path_by_id(path, model.id);
                                        await unlisten();
                                        await new Promise(r => setTimeout(r, 500)); // animation delay
                                        setDialogState('success');
                                        setDialogBody(t('device.t_dialog_success_upload'));
                                    } catch (e) {
                                        await unlisten();
                                        setDialogState('error');
                                        setDialogBody(t('common.t_dialog_body_error'));
                                    }
                                }
                            }
                        }}
                    />
                </ButtonGroup>
            </Stack >
        </>
    );
}

DeviceGroupTools.propTypes = {
    model: PropTypes.object.isRequired,
    disabled: PropTypes.bool.isRequired,
    onAnimate: PropTypes.func.isRequired,
};
