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
import { useLocation } from "react-router";
import { useTranslation } from "react-i18next";

import { Stack, Typography } from '@mui/material';

import { LottieComingSoon } from '../../base';

export function SdkPage(props) {
    // components
    const { t } = useTranslation();
    // data
    let { state } = useLocation()
    // page
    return (
        <Stack
            height={1}
            sx={{ justifyContent: "center", alignItems: "center" }}
        >
            <Stack
                spacing={5}
                sx={{ alignItems: "center" }}
            >
                <LottieComingSoon />
                <Typography
                    variant={'body1'}
                    color={'text.primary'}
                    textAlign={'center'}
                >
                    {t('common.t_coming_soon')}
                </Typography>
                <Typography
                    variant={'body1'}
                    color={'text.primary'}
                    textAlign={'center'}
                >
                    ({state.model.versionFull})
                </Typography>
            </Stack>
        </Stack>
    );
}

SdkPage.propTypes = {};
