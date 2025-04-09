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
import { useNavigate } from "react-router";

import {
    Stack,
    TextField,
    FormGroup,
    Button,
    Typography,
} from '@mui/material';

import { Search } from '@mui/icons-material';

import { AppUtils } from '../../base';

export function FaqPage(props) {
    // components
    const navigate = useNavigate();
    const { t } = useTranslation();
    // data
    const [searchText, setSearchText] = React.useState('');
    // page
    return (
        <Stack
            sx={{ paddingTop: 2 }}
            spacing={2}
        >
            <FormGroup>
                <Stack
                    sx={{ paddingTop: 2 }}
                    spacing={3}
                >
                    <Typography
                        variant={'body1'}
                        color={'text.primary'}
                        textAlign={'center'}
                    >
                        {t('faq.t_title')}
                    </Typography>

                    <Stack
                        direction={'row'}
                        spacing={2}
                    >
                        <TextField
                            color={'info'}
                            sx={{ width: 1 }}
                            label={t('faq.t_field_search')}
                            variant={'filled'}
                            value={searchText}
                            onChange={(event) => setSearchText(event.target.value)}
                        />
                        <Button
                            sx={{ borderRadius: 1.2 }}
                            disabled={searchText.length === 0}
                            color={'info'}
                            variant={'contained'}
                            size={'large'}
                            onClick={() => {
                                AppUtils.openPage(navigate, 'faq', { state: { search: searchText } });
                            }}
                        >
                            <Search color={'text.primary'} />
                        </Button>
                    </Stack>
                </Stack>
            </FormGroup>
        </Stack>
    );
}

FaqPage.propTypes = {};
