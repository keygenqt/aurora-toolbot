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
                textTransform: 'none',
                fontFamily: "'Ubuntu', sans-serif",
            }
        }
    },
    MuiButtonGroup: {
        styleOverrides: {
            root: ({ theme }) =>
                theme.unstable_sx({
                    '& .MuiButtonBase-root:not(.Mui-disabled) .MuiTypography-body2': {
                        color: 'text.secondary'
                    },
                    '& .MuiButtonBase-root:not(.Mui-disabled) .MuiAvatar-root': {
                        backgroundColor: 'var(--variant-outlinedColor)'
                    },
                }),
        }
    },
    MuiButtonBase: {
        styleOverrides: {
            root: ({ theme }) =>
                theme.unstable_sx({
                    borderRadius: '8px',
                    backgroundColor: window.isMobile ? 'transparent !important' : null,
                    '&.MuiButton-containedSizeLarge': {
                        borderRadius: 2
                    },
                    '&.MuiButton-contained.Mui-disabled': {
                        color: theme.palette.mode === 'dark' ? '#ffffffb3 !important' : '#000000de !important',
                    },
                    '&.Mui-disabled.MuiButton-sizeSmall .MuiButton-icon .MuiCircularProgress-root': {
                        marginLeft: '4px',
                        width: '14px !important',
                        height: '14px !important',
                    },
                    '&.MuiButton-sizeSmall': {
                        paddingBottom: '6px',
                    },
                    '&.MuiButton-sizeSmall .MuiButton-endIcon' : {
                        marginLeft: '4px !important',
                    },
                    '&.MuiButton-sizeSmall .MuiButton-icon': {
                        marginLeft: '2px',
                    },
                }),
        }
    },
    MuiIconButton: {
        styleOverrides: {
            root: ({ theme }) =>
                theme.unstable_sx({
                    '&.MuiIconButton-sizeMedium' : {
                        height: window.isMobile ? 32 : 24,
                        width: window.isMobile ? 32 : 24,
                        '& .MuiSvgIcon-root': {
                            fontSize: '16px',
                        },
                    },
                    '&.MuiIconButton-sizeLarge' : {
                        height: 46,
                        width: 46,
                    },
                    background: '#adadad45 !important',
                    '&:hover': {
                        background: theme.palette.mode === 'dark' ? '#4a4a4a' : '#dedede',
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
                    backgroundColor: '#ffffff08',
                },
            }
        }
    },
    MuiCard: {
        styleOverrides: {
            root: {
                width: '100%',
                borderRadius: 8,
                boxShadow: 'none !important',
                textTransform: 'none'
            }
        }
    },
    MuiFilledInput: {
        styleOverrides: {
            root: {
                borderTopLeftRadius: 8,
                borderTopRightRadius: 8,
            }
        }
    },
    MuiChip: {
        styleOverrides: {
            root: {
                borderRadius: 13,
                paddingLeft: 6,
                paddingRight: 6,
                '& .MuiSvgIcon-root': {
                    fontSize: 16,
                    paddingRight: 3,
                }
            }
        }
    },
    MuiAvatar: {
        styleOverrides: {
            root: {
                fontFamily: [
                    'Ubuntu',
                    'sans-serif',
                ].join(','),
            }
        }
    },
    MuiCardHeader: {
        styleOverrides: {
            root: {
                '& .MuiCardHeader-title': {
                    fontWeight: 'bold',
                }
            }
        }
    },
    MuiDrawer: {
        styleOverrides: {
            root: ({ theme }) =>
                // Fix Drawer round corners for Tauri
                window.isTauri ? theme.unstable_sx({
                    position: 'absolute',
                    borderRadius: '13px',
                    overflow: 'hidden',
                    '& .MuiBackdrop-root': {
                        position: 'absolute',
                        backgroundColor: '#000000b3',
                    },
                    '& .MuiPaper-root': {
                        position: 'absolute',
                        backgroundColor: 'transparent !important',
                        transform: 'none !important',
                        transition: 'none !important',
                        boxShadow: 'none',
                        '--Paper-overlay': 'none !important',
                    },
                    '& .MuiList-root': {
                        borderRadius: '13px',
                        overflow: 'hidden',
                        opacity: 0,
                        transition: 'all 280ms !important',
                        backgroundColor: theme.palette.background.default,
                    }
                }) : theme.unstable_sx({
                    '& .MuiPaper-root': {
                        borderTopLeftRadius: '13px',
                        borderTopRightRadius: '13px',
                    },
                }),
        }
    },
    MuiDialog: {
        styleOverrides: {
            root: ({ theme }) =>
                theme.unstable_sx({
                    position: 'absolute',
                    borderRadius: '13px',
                    overflow: 'hidden',
                    '& .MuiBackdrop-root': {
                        position: 'absolute',
                        backgroundColor: '#000000b3',
                    },
                    '& .MuiPaper-root': {
                        borderRadius: '13px',
                    },
                }),
        }
    },
}
