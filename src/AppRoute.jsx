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

import { ActionBack, ActionMenu, ActionRefresh } from './base'
import { AppBarLayout } from './layouts'
import {
    AuthPage,
    DevicePage,
    DevicesPage,
    EmulatorPage,
    EmulatorsPage,
    ErrorPage,
    FaqPage,
    FeaturesPage,
    FlutterPage,
    FluttersAvailablePage,
    FluttersInstalledPage,
    MainPage,
    PsdkPage,
    PsdksAvailablePage,
    PsdksInstalledPage,
    SdkPage,
    SdksAvailablePage,
    SdksInstalledPage,
} from './pages'
import { Stack } from '@mui/material';

export function AppRoute() {
    const [showMenuMain, setShowMenuMain] = React.useState(undefined);
    const [featuresRefresh, setFeaturesRefresh] = React.useState(undefined);
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={(
                    <AppBarLayout actions={showMenuMain === undefined ? null : showMenuMain ? (
                        <Stack direction={'row'} spacing={1}>
                            <ActionMenu />
                            <ActionRefresh />
                        </Stack>
                    ) : (
                        <ActionRefresh />
                    )} >
                        <MainPage onStateConnect={(state) => setShowMenuMain(state)} />
                    </AppBarLayout>
                )} />
                <Route path="auth" element={(
                    <AppBarLayout actions={<ActionBack />} >
                        <AuthPage />
                    </AppBarLayout>
                )} />
                <Route path="features">
                    <Route index padding={0} element={(
                        <AppBarLayout actions={featuresRefresh ? (
                            <Stack direction={'row'} spacing={1}>
                                <ActionMenu />
                                <ActionRefresh />
                            </Stack>
                        ) : (
                            <ActionMenu />
                        )} >
                            <FeaturesPage
                                onStateRefresh={(state) => setFeaturesRefresh(state)}
                            />
                        </AppBarLayout>
                    )} />
                    <Route path="devices">
                        <Route index padding={0} element={(
                            <AppBarLayout index actions={<ActionBack />} >
                                <DevicesPage />
                            </AppBarLayout>
                        )} />
                        <Route path=":key" element={(
                            <AppBarLayout actions={<ActionBack />} >
                                <DevicePage />
                            </AppBarLayout>
                        )} />
                    </Route>
                    <Route path="emulators">
                        <Route index padding={0} element={(
                            <AppBarLayout index actions={<ActionBack />} >
                                <EmulatorsPage />
                            </AppBarLayout>
                        )} />
                        <Route path=":key" element={(
                            <AppBarLayout actions={<ActionBack />} >
                                <EmulatorPage />
                            </AppBarLayout>
                        )} />
                    </Route>
                    {/* Save state */}
                    <Route path="faq" element={(
                        <AppBarLayout actions={<ActionBack />} >
                            <FaqPage />
                        </AppBarLayout>
                    )} />
                    <Route path="fluttersAvailable" element={(
                        <AppBarLayout actions={<ActionBack />} >
                            <FluttersAvailablePage />
                        </AppBarLayout>
                    )} />
                    {/* Not save state */}
                    <Route path="fluttersInstalled">
                        <Route index padding={0} element={(
                            <AppBarLayout index actions={<ActionBack />} >
                                <FluttersInstalledPage />
                            </AppBarLayout>
                        )} />
                        <Route path=":key" element={(
                            <AppBarLayout actions={<ActionBack />} >
                                <FlutterPage />
                            </AppBarLayout>
                        )} />
                    </Route>
                    <Route path="psdksAvailable" element={(
                        <AppBarLayout actions={<ActionBack />} >
                            <PsdksAvailablePage />
                        </AppBarLayout>
                    )} />
                    <Route path="psdksInstalled">
                        <Route index padding={0} element={(
                            <AppBarLayout index actions={<ActionBack />} >
                                <PsdksInstalledPage />
                            </AppBarLayout>
                        )} />
                        <Route path=":key" element={(
                            <AppBarLayout actions={<ActionBack />} >
                                <PsdkPage />
                            </AppBarLayout>
                        )} />
                    </Route>
                    <Route path="sdksAvailable" element={(
                        <AppBarLayout actions={<ActionBack />} >
                            <SdksAvailablePage />
                        </AppBarLayout>
                    )} />
                    <Route path="sdksInstalled">
                        <Route index padding={0} element={(
                            <AppBarLayout index actions={<ActionBack />} >
                                <SdksInstalledPage />
                            </AppBarLayout>
                        )} />
                        <Route path=":key" element={(
                            <AppBarLayout actions={<ActionBack />} >
                                <SdkPage />
                            </AppBarLayout>
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
