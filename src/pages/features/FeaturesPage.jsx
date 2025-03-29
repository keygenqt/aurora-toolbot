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
import { useTranslation } from "react-i18next";

import { useSelector, useDispatch } from 'react-redux';
import { setData as setEmulators } from '../../store/impl/emulators';
import { setData as setSdkInstalled } from '../../store/impl/sdkInstalled';
import { setData as setSdkAvailable } from '../../store/impl/sdkAvailable';
import { setData as setPsdkInstalled } from '../../store/impl/psdkInstalled';
import { setData as setPsdkAvailable } from '../../store/impl/psdkAvailable';
import { setData as setFlutterInstalled } from '../../store/impl/flutterInstalled';
import { setData as setFlutterAvailable } from '../../store/impl/flutterAvailable';

import { List } from '@mui/material';

import { useEffectSingle, } from '../../base';
import { Methods } from '../../modules';

import { EmulatorItem } from './elements/EmulatorItem';
import { FAQItem } from './elements/FAQItem';
import { FlutterItem } from './elements/FlutterItem';
import { GroupWidget } from './elements/GroupWidget';
import { PsdkItem } from './elements/PsdkItem';
import { SdkItem } from './elements/SdkItem';


export function FeaturesPage(props) {
    // components
    const { t } = useTranslation();
    const dispatch = useDispatch();
    // redux
    const emulators = useSelector((state) => state.emulators.value);
    const sdkInstalled = useSelector((state) => state.sdkInstalled.value);
    const sdkAvailable = useSelector((state) => state.sdkAvailable.value);
    const psdkInstalled = useSelector((state) => state.psdkInstalled.value);
    const psdkAvailable = useSelector((state) => state.psdkAvailable.value);
    const flutterInstalled = useSelector((state) => state.flutterInstalled.value);
    const flutterAvailable = useSelector((state) => state.flutterAvailable.value);
    // init
    useEffectSingle(() => {
        (async function () {
            if (!emulators) {
                try {
                    dispatch(setEmulators(await Methods.emulators()));
                } catch (e) {
                    dispatch(setEmulators(null));
                }
            }
            if (!sdkInstalled) {
                try {
                    dispatch(setSdkInstalled(await Methods.sdkInstalled()));
                } catch (e) {
                    dispatch(setSdkInstalled(null));
                }
            }
            if (!sdkAvailable) {
                try {
                    dispatch(setSdkAvailable(await Methods.sdkAvailable()));
                } catch (e) {
                    dispatch(setSdkAvailable(null));
                }
            }
            if (!psdkInstalled) {
                try {
                    dispatch(setPsdkInstalled(await Methods.psdkInstalled()));
                } catch (e) {
                    dispatch(setPsdkInstalled(null));
                }
            }
            if (!psdkAvailable) {
                try {
                    dispatch(setPsdkAvailable(await Methods.psdkAvailable()));
                } catch (e) {
                    dispatch(setPsdkAvailable(null));
                }
            }
            if (!flutterInstalled) {
                try {
                    dispatch(setFlutterInstalled(await Methods.flutterInstalled()));
                } catch (e) {
                    dispatch(setFlutterInstalled(null));
                }
            }
            if (!flutterAvailable) {
                try {
                    dispatch(setFlutterAvailable(await Methods.flutterAvailable()));
                } catch (e) {
                    dispatch(setFlutterAvailable(null));
                }
            }
        })();
    });
    // page
    return (
        <List>
            <GroupWidget
                title={t('features.devices.t_title')}
                text={t('features.devices.t_text')}
            />
            <EmulatorItem
                emulators={emulators}
            />
            <GroupWidget
                title={t('features.tools.t_title')}
                text={t('features.tools.t_text')}
            />
            <SdkItem
                sdkInstalled={sdkInstalled}
                sdkAvailable={sdkAvailable}
            />
            <PsdkItem
                psdkInstalled={psdkInstalled}
                psdkAvailable={psdkAvailable}
            />
            <FlutterItem
                flutterInstalled={flutterInstalled}
                flutterAvailable={flutterAvailable}
            />
            <GroupWidget
                title={t('features.assistant.t_title')}
                text={t('features.assistant.t_text')}
            />
            <FAQItem />
        </List>
    );
}

FeaturesPage.propTypes = {};
