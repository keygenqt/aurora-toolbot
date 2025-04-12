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
import * as React from 'react';
import { useTranslation } from "react-i18next";

import {
    useTheme,
    Box,
    Stack,
    TextField,
    FormGroup,
    Button,
    CircularProgress,
    Typography,
} from '@mui/material';

import { Send } from '@mui/icons-material';

export function AuthPage(props) {
    // components
    const { t } = useTranslation();
    const theme = useTheme();
    // data
    const color = theme.palette.secondary.main;
    const [searchText, setSearchText] = React.useState('');
    const [searchStart, setSearchStart] = React.useState(false);
    // page
    return (
        <Stack
            height={1}
            sx={{
                alignItems: 'center',
            }}
        >
            <Box
                sx={{
                    padding: 2,
                    borderRadius: 2,
                    border: `1px solid ${color}5e`,
                }}
            >
                <FormGroup>
                    <Stack
                        sx={{ paddingTop: 2 }}
                        spacing={2}
                    >
                        <Typography
                            variant={'body1'}
                            color={'text.primary'}
                            textAlign={'center'}
                        >
                            {t('common.t_coming_soon')}
                        </Typography>

                        <TextField
                            disabled={searchText}
                            label={t('auth.t_field_token')}
                            variant={'filled'}
                            value={searchText}
                            onChange={(event) => setSearchText(event.target.value)}
                        />

                        <Button
                            sx={{
                                borderRadius: 1
                            }}
                            type={'submit'}
                            variant={'contained'}
                            size={'large'}
                            disabled={searchStart}
                            onClick={() => {
                                setSearchStart(true)
                            }}
                            endIcon={searchStart ? (
                                <CircularProgress sx={{
                                    mr: 0.5,
                                    height: '18px !important',
                                    width: '18px !important'
                                }} />
                            ) : (
                                <Send color={'text.primary'} sx={{ height: 18 }} />
                            )}
                        >
                            {t('auth.t_btn_auth')}
                        </Button>
                    </Stack>
                </FormGroup>
            </Box>
        </Stack>
    );
}

AuthPage.propTypes = {};
