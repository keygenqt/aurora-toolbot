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

import { AppUtils, AvatarButton, MainDialog, SelectFileDialog, SelectItemDialog } from '../../../base';
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
        onAnimate,
    } = props;
    // states
    const [isDialogSelectFile, setIsDialogSelectFile] = React.useState(false);
    const [dialogSelectItems, setDialogSelectItems] = React.useState(undefined);
    const [isDialogSelectItemRun, setIsDialogSelectItemRun] = React.useState(false);
    const [isDialogSelectItemUninstall, setIsDialogSelectItemUninstall] = React.useState(false);
    const [dialogSelectItemRun, setDialogSelectItemRun] = React.useState(undefined);
    const [dialogSelectItemUninstall, setDialogSelectItemUninstall] = React.useState(undefined);
    // run app
    React.useEffect(() => {
        if (dialogSelectItemRun) {
            console.log(dialogSelectItemRun)
        }
    }, [dialogSelectItemRun]);
    // uninstall app
    React.useEffect(() => {
        if (dialogSelectItemUninstall) {
            console.log(dialogSelectItemUninstall)
        }
    }, [dialogSelectItemUninstall]);
    // page
    return (
        <>
            <SelectFileDialog
                color={'success'}
                open={isDialogSelectFile}
            />
            <SelectItemDialog
                icon={ChargingStation}
                color={'success'}
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
            <SelectItemDialog
                icon={AppBlocking}
                color={'success'}
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
                        title={t('device.t_btn_group_tools_app_title')}
                        text={t('device.t_btn_group_tools_app_text')}
                        onClick={async () => {
                            AppUtils.openPage(navigate, 'appsInstall', { state: { id: model.id } });
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
                            console.log(path);
                            // @todo
                            // if (path) {
                            //     onAnimate(true);
                            //     try {
                            //         await Methods.device_package_install_path_by_id(path, model.id);
                            //         onAnimate(false, t('device.t_dialog_success_install'), null);
                            //     } catch (e) {
                            //         onAnimate(false, null, t('device.t_dialog_error_install'));
                            //     }
                            // }
                        }}
                    />
                    <AvatarButton
                        icon={ChargingStation}
                        title={t('device.t_btn_group_tools_run_app_title')}
                        text={t('device.t_btn_group_tools_run_app_text')}
                        onClick={async () => {
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
                            // @todo
                            // try {
                            //     onLock(true, 'запуск')
                            //     console.log(await Methods.device_package_run_by_id(model.id))
                            //     console.log(await Methods.device_package_run_package_by_id('ru.omp.TinyPdfViewer', model.id))
                            // } catch (e) {
                            //     console.log(e)
                            // }
                        }}
                    />
                    <AvatarButton
                        icon={AppBlocking}
                        title={t('device.t_btn_group_tools_uninstall_title')}
                        text={t('device.t_btn_group_tools_uninstall_text')}
                        onClick={async () => {
                            try {
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
                            setIsDialogSelectFile(true);
                            const path = await open({
                                multiple: false,
                            });
                            setIsDialogSelectFile(false);
                            console.log(false);
                            // @todo
                            // if (path) {
                            //     onAnimate(true);
                            //     try {
                            //         await Methods.device_upload_path_by_id(path, model.id);
                            //         onAnimate(false, t('device.t_dialog_success_upload'), null);
                            //     } catch (e) {
                            //         onAnimate(false, null, t('device.t_dialog_error_upload'));
                            //     }
                            //     onAnimate(false);
                            // }
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
