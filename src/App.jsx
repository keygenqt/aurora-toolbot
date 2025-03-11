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

import { ThemeLight } from './theme/ThemeLight'
import { ThemeDark } from './theme/ThemeDark'
import { MainPage, ForbiddenPage } from './pages'
import { useEffectTheme, useEffectFocus } from './base'
import { BaseLayout, AppBarLayout } from './layouts'

function App() {
    const darkMode = useEffectTheme();
    const isFocus = useEffectFocus();
    return (
        <ThemeProvider theme={darkMode === 'dark' ? ThemeDark : ThemeLight}>
            <Box
                className={'MainBox ' + (isFocus ? 'WindowFocus' : 'WindowUnfocus')}
                height={1}
                sx={{
                    backgroundColor: 'background.default',
                    borderRadius: '10px',
                    overflow: 'hidden',
                }}
            >
                {window.isTauri || window.isMiniApp ? (
                    <AppBarLayout>
                        <MainPage />
                    </AppBarLayout>
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
