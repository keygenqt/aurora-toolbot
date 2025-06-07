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

import { ThemeProvider, Box } from '@mui/material'

import { AppRoute } from './AppRoute'
import { ThemeLight } from './theme/ThemeLight'
import { ThemeDark } from './theme/ThemeDark'
import { ForbiddenPage } from './pages'
import { useEffectTheme, useEffectFocus } from './base'
import { BaseLayout } from './layouts'

function App() {
    const themeMode = useEffectTheme();
    const isFocus = useEffectFocus();
    return (
        <ThemeProvider theme={themeMode === 'dark' ? ThemeDark : ThemeLight}>
            <Box
                className={'MainBox ' + (isFocus ? 'WindowFocus' : 'WindowUnfocus')}
                height={1}
                sx={{
                    backgroundColor: 'background.default',
                    borderRadius: window.isTauri ? '13px' : 0,
                    overflow: 'hidden',
                }}
            >
                {window.isTauri || window.isMiniApp ? (
                    <AppRoute />
                ) : (
                    <BaseLayout>
                        <ForbiddenPage />
                    </BaseLayout>
                )}
            </Box>
        </ThemeProvider>
    );
}

export default App;
