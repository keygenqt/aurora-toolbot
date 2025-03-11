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
import { useTranslation } from "react-i18next";

import { Box, Stack, Typography } from '@mui/material';

import { DataImages } from '../../base';

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
            <Box />
            <Box sx={{ textAlign: "center" }}>
                <img
                    style={{ width: '100%', maxWidth: '180px', maxHeight: '180px' }}
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
            <Box />
        </Stack>
    );
}

ForbiddenPage.propTypes = {};
