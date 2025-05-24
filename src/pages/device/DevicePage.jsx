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
import { useLocation } from "react-router";
import { useTranslation } from "react-i18next";

import { useSelector, useDispatch } from 'react-redux';
import { setData as setDevices } from '../../store/impl/devices';
import { keysStateBool } from '../../store/impl/stateBool';

import { Stack } from '@mui/material';

import { setEffectStateBool, _AlertDialog, SelectDialog, MainDialog } from '../../base';
import { ListLayout } from '../../layouts';
import { Methods } from '../../modules';

import { DeviceHeader } from './elements/DeviceHeader';
import { DeviceGroupTools } from './elements/DeviceGroupTools';

export function DevicePage(props) {
    // components
    const { t } = useTranslation();
    // components
    let { state } = useLocation();
    const dispatch = useDispatch();
    // data
    const reduxKey = keysStateBool.devicesUpdate;
    const [isUpdateItem, setIsUpdateItem] = React.useState(false);
    const [isAnimateLoading, setIsAnimateLoading] = React.useState(false);
    const [isSelectLoading, setIsSelectLoading] = React.useState(false);
    const [dialogError, setDialogError] = React.useState(null);
    const [dialogSuccess, setDialogSuccess] = React.useState(null);
    const [dialogLock, setDialogLock] = React.useState(null);
    // redux
    const devices = useSelector((state) => state.devices.value);
    // fun
    const updateStatesSilent = async () => {
        dispatch(setDevices(await Methods.device_info()));
    };
    const updateStates = async () => {
        setEffectStateBool(dispatch, reduxKey, true);
        await updateStatesSilent();
        await new Promise(r => setTimeout(r, 400)); // animation delay
        setEffectStateBool(dispatch, reduxKey, false);
    };
    // page
    return (
        <>
            <_AlertDialog
                open={isSelectLoading}
                title={t('common.t_dialog_select.title')}
                body={t('common.t_dialog_select.body')}
            />
            <_AlertDialog
                open={dialogError !== null}
                title={t('common.t_dialog_error_title')}
                body={dialogError}
                agreeText={'Ok'}
                agree={() => { }}
                onClose={() => {
                    setDialogError(null)
                }}
            />
            <_AlertDialog
                open={dialogSuccess !== null}
                title={t('common.t_dialog_success_title')}
                body={dialogSuccess}
                agreeText={'Ok'}
                agree={() => { }}
                onClose={() => {
                    setDialogSuccess(null)
                }}
            />

            {/* <SelectDialog color={'success'} open={true} /> */}

            <MainDialog
                title={'Установка Platform SDK'}
                body={'Начинаем загрузку...'}
                color={'primarySdk'}
                state={'default'}
                open={true}
                progress={50}
                onClickBtn={() => {
                    console.log('yes')
                }}
            />


            <ListLayout
                disable={isUpdateItem}
                animate={isAnimateLoading}
                models={devices}
                updateStates={updateStates}
                reduxKey={reduxKey}
                itemList={(model) => {
                    return model.id !== state.id ? null : (
                        <Stack
                            direction={'column'}
                            spacing={3}
                            sx={{ width: 1 }}
                        >
                            <DeviceHeader
                                model={model}
                                isUpdate={isUpdateItem || isAnimateLoading}
                                onUpdate={(state) => setIsUpdateItem(state)}
                                onAnimate={(state) => setIsAnimateLoading(state)}
                                onRefresh={updateStatesSilent}
                            />
                            <DeviceGroupTools
                                model={model}
                                disabled={isUpdateItem || isAnimateLoading || !model.is_available}
                                onLock={(state, message) => setIsSelectLoading(state)}
                                onSelect={(state) => setIsSelectLoading(state)}
                                onAnimate={(state, success, error) => {
                                    setIsAnimateLoading(state);
                                    if (success) {
                                        setDialogSuccess(success);
                                    }
                                    if (error) {
                                        setDialogError(error);
                                    }
                                }}
                            />
                        </Stack>
                    )
                }}
            />
        </>
    );
}

DevicePage.propTypes = {};
