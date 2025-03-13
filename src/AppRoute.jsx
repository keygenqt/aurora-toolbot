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

import { ActionBack, ActionMenu } from './base'
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
    FluttersPage,
    MainPage,
    PsdkPage,
    PsdksPage,
    SdkPage,
    SdksPage,
} from './pages'

export function AppRoute() {
    const [showMenuMain, setShowMenuMain] = React.useState(false);
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={(
                    <AppBarLayout actions={showMenuMain ? <ActionMenu /> : null} >
                        <MainPage onStateConnect={(connect) => setShowMenuMain(connect)} />
                    </AppBarLayout>
                )} />
                <Route path="auth" element={(
                    <AppBarLayout actions={<ActionBack />} >
                        <AuthPage />
                    </AppBarLayout>
                )} />
                <Route path="features">
                    <Route index padding={0} element={(
                        <AppBarLayout actions={<ActionBack />} >
                            <FeaturesPage />
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
                    {/* Not save state */}
                    <Route path="flutter">
                        <Route index padding={0} element={(
                            <AppBarLayout index actions={<ActionBack />} >
                                <FluttersPage />
                            </AppBarLayout>
                        )} />
                        <Route path=":key" element={(
                            <AppBarLayout actions={<ActionBack />} >
                                <FlutterPage />
                            </AppBarLayout>
                        )} />
                    </Route>
                    <Route path="psdk">
                        <Route index padding={0} element={(
                            <AppBarLayout index actions={<ActionBack />} >
                                <PsdksPage />
                            </AppBarLayout>
                        )} />
                        <Route path=":key" element={(
                            <AppBarLayout actions={<ActionBack />} >
                                <PsdkPage />
                            </AppBarLayout>
                        )} />
                    </Route>
                    <Route path="sdk">
                        <Route index padding={0} element={(
                            <AppBarLayout index actions={<ActionBack />} >
                                <SdksPage />
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
