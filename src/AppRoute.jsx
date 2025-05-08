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
import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router";

import { ActionBack } from './base'
import { AppBarLayout } from './layouts'
import {
    DemoAppsPage,
    DevicePage,
    DevicesPage,
    EmulatorPage,
    EmulatorsPage,
    ErrorPage,
    FaqPage,
    FaqsPage,
    FeaturesPage,
    FlutterPage,
    FluttersAvailablePage,
    FluttersInstalledPage,
    MainPage,
    PsdkPage,
    PsdkTargetPage,
    PsdksAvailablePage,
    PsdksInstalledPage,
    SdkPage,
    SdksAvailablePage,
    SdksInstalledPage,
} from './pages'

export function AppRoute() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={(
                    <MainPage />
                )} />
                <Route path="features">
                    <Route index element={(
                        <FeaturesPage />
                    )} />
                    <Route path="devices">
                        <Route index element={(
                            <DevicesPage />
                        )} />
                        <Route path="device">
                            <Route index element={(
                                <DevicePage />
                            )} />
                            <Route path="appsInstall">
                                <Route index element={(
                                    <DemoAppsPage />
                                )} />
                            </Route>
                        </Route>
                    </Route>
                    <Route path="device">
                        <Route index element={(
                            <DevicePage />
                        )} />
                        <Route path="appsInstall">
                            <Route index element={(
                                <DemoAppsPage />
                            )} />
                        </Route>
                    </Route>
                    <Route path="emulators">
                        <Route index element={(
                            <EmulatorsPage />
                        )} />
                        <Route path="emulator">
                            <Route index element={(
                                <EmulatorPage />
                            )} />
                            <Route path="appsInstall">
                                <Route index element={(
                                    <DemoAppsPage />
                                )} />
                            </Route>
                        </Route>
                    </Route>
                    <Route path="emulator">
                        <Route index element={(
                            <EmulatorPage />
                        )} />
                        <Route path="appsInstall">
                            <Route index element={(
                                <DemoAppsPage />
                            )} />
                        </Route>
                    </Route>
                    <Route path="faq">
                        <Route index element={(
                            <AppBarLayout
                                bg={'faq'}
                                actions={<ActionBack />}
                            >
                                <FaqPage />
                            </AppBarLayout>
                        )} />
                        <Route path=":key" element={(
                            <FaqsPage />
                        )} />
                    </Route>
                    <Route path="fluttersAvailable" element={(
                        <FluttersAvailablePage />
                    )} />
                    <Route path="fluttersInstalled">
                        <Route index element={(
                            <FluttersInstalledPage />
                        )} />
                        <Route path=":key" element={(
                            <FlutterPage />
                        )} />
                    </Route>
                    <Route path="flutter">
                        <Route index element={(
                            <FlutterPage />
                        )} />
                    </Route>
                    <Route path="psdksAvailable" element={(
                        <PsdksAvailablePage />
                    )} />
                    <Route path="psdksInstalled">
                        <Route index element={(
                            <PsdksInstalledPage />
                        )} />
                        <Route path="psdk">
                            <Route index element={(
                                <PsdkPage />
                            )} />
                            <Route path="psdkTarget">
                                <Route index element={(
                                    <PsdkTargetPage />
                                )} />
                            </Route>
                        </Route>
                    </Route>
                    <Route path="psdk">
                        <Route index element={(
                            <PsdkPage />
                        )} />
                        <Route path="psdkTarget">
                            <Route index element={(
                                <PsdkTargetPage />
                            )} />
                        </Route>
                    </Route>
                    <Route path="sdksAvailable" element={(
                        <SdksAvailablePage />
                    )} />
                    <Route path="sdksInstalled">
                        <Route index element={(
                            <SdksInstalledPage />
                        )} />
                        <Route path=":key" element={(
                            <SdkPage />
                        )} />
                    </Route>
                    <Route path="sdk">
                        <Route index element={(
                            <SdkPage />
                        )} />
                    </Route>
                </Route>
                <Route path="*" element={(
                    <AppBarLayout actions={<ActionBack />} >
                        <ErrorPage />
                    </AppBarLayout>
                )} />
            </Routes>
        </BrowserRouter>
    );
}
