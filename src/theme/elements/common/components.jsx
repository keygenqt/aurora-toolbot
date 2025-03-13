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
export const components = {
    MuiToolbar: {
        styleOverrides: {
            root: {
                minHeight: '45px !important',
                paddingLeft: '12px !important',
                paddingRight: '12px !important',
            }
        }
    },
    MuiButton: {
        styleOverrides: {
            root: {
                borderRadius: 50,
                boxShadow: 'none !important',
                textTransform: 'none'
            }
        }
    },
    MuiIconButton: {
        styleOverrides: {
            root: ({ theme }) =>
                theme.unstable_sx({
                    height: window.isMobile ? '32px' : '24px',
                    width: window.isMobile ? '32px' : '24px',
                    background: theme.palette.mode === 'dark' ? '#414141' : '#e7e7e7',
                    '&:hover': {
                        background: theme.palette.mode === 'dark' ? '#4a4a4a' : '#dedede',
                    },
                    '& .MuiSvgIcon-root': {
                        fontSize: '16px',
                    },
                }),
        }
    },
    MuiList: {
        styleOverrides: {
            root: {
                width: '100%',
                boxSizing: 'border-box',
            }
        }
    },
    MuiListItem: {
        styleOverrides: {
            root: {
                paddingLeft: '0',
                paddingRight: '0',
                '& .MuiPaper-root': {
                    backgroundColor: 'rgba(255, 255, 255, 0.03)',
                },
            }
        }
    },
    MuiCard: {
        styleOverrides: {
            root: {
                width: '100%',
                borderRadius: 13,
                boxShadow: 'none !important',
                textTransform: 'none'
            }
        }
    }
}
