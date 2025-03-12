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
import { Route, Routes } from "react-router";

import { ActionBack, ActionMenu } from './base'
import { AboutPage, FeaturesPage, MainPage, SettingsPage } from './pages'
import { AppBarLayout } from './layouts'

export function AppRoute() {
    const [showMenuMain, setShowMenuMain] = React.useState(false);
    return (
        <Routes>
            <Route path="about" element={(
                <AppBarLayout actions={<ActionBack />} >
                    <AboutPage />
                </AppBarLayout>
            )} />
            <Route path="features" element={(
                <AppBarLayout actions={<ActionBack />} >
                    <FeaturesPage />
                </AppBarLayout>
            )} />
            <Route path="/" element={(
                <AppBarLayout actions={showMenuMain ? <ActionMenu /> : null} >
                    <MainPage onStateConnect={(connect) => setShowMenuMain(connect)} />
                </AppBarLayout>
            )} />
            <Route path="settings" element={(
                <AppBarLayout actions={<ActionBack />} >
                    <SettingsPage />
                </AppBarLayout>
            )} />

        </Routes>
    );
}
