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
                    height: '24px',
                    width: '24px',
                    background: theme.palette.mode === 'dark' ? '#414141' : '#e7e7e7',
                    '&:hover': {
                        background: theme.palette.mode === 'dark' ? '#4a4a4a' : '#dedede',
                    },
                    '& .MuiSvgIcon-root': {
                        fontSize: '16px',
                    },
                }),
        }
    }
}
