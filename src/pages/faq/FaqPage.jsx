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
    Stack,
    TextField,
    FormGroup,
    Button,
    CircularProgress,
    Typography,
} from '@mui/material';

import { Search } from '@mui/icons-material';

export function FaqPage(props) {
    // components
    const { t } = useTranslation();
    // data
    const [searchText, setSearchText] = React.useState('');
    const [searchStart, setSearchStart] = React.useState(false);
    // Page
    return (
        <Stack
            sx={{ paddingTop: 2 }}
            spacing={2}
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
                        label={t('faq.t_field_search')}
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
                            <Search color={'text.primary'} sx={{ height: 18 }} />
                        )}
                    >
                        {t('faq.t_btn_search')}
                    </Button>
                </Stack>
            </FormGroup>
        </Stack>
    );
}

FaqPage.propTypes = {};
