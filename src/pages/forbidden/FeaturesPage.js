import {useTranslation} from "react-i18next";

import {Box, Stack, Typography} from '@mui/material';

import {DataImages} from '../../base';

export function ForbiddenPage(props) {
    const { t } = useTranslation();
    return (
        <Stack
            direction="column"
            spacing={3}
            height={1}
            sx={{
                justifyContent: "space-between",
                alignItems: "stretch",
            }}
        >
            <Box/>
            <Box sx={{textAlign: "center"}}>
                <img
                    style={{width: '100%', maxWidth: '200px', maxHeight: '200px'}}
                    src={DataImages.iconBeta}
                    alt='Icon' />
            </Box>
            <Stack
                direction="column"
                spacing={4}
                sx={{
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Typography
                    variant={'h5'}
                    sx={{
                        fontWeight: 'bold',
                        color: '#262626',
                        textAlign: "center"
                    }}
                >
                    {t('forbidden.t_hello')}
                </Typography>

                <Typography
                    variant={'text1'}
                    sx={{
                        color: '#4A4A4A',
                        textAlign: "center"
                    }}
                >
                    {t('forbidden.t_info')}
                </Typography>
            </Stack>
            <Box/>
        </Stack>
    );
}

ForbiddenPage.propTypes = {};
