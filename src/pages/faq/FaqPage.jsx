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
    useTheme,
    Stack,
    TextField,
    FormGroup,
    Button,
    Typography,
    List,
    ListItem,
    CardContent,
    CardActionArea,
    IconButton,
    Box,
} from '@mui/material';

import { Search, AccessTime, DeleteOutline } from '@mui/icons-material';

import { useEffectCache, AppUtils, CardGradient } from '../../base';

export function FaqPage(props) {
    // components
    const navigate = useNavigate();
    const { t } = useTranslation();
    const theme = useTheme();
    // data
    const keySearchHistory = "keySearchHistory"
    const [searchText, setSearchText] = React.useState('');
    const searchHistory = useEffectCache(keySearchHistory);
    // page
    return (
        <Stack
            sx={{ paddingTop: 4 }}
            spacing={4}
        >
            <Stack spacing={3} >
                <Typography
                    variant={'body1'}
                    color={'text.primary'}
                    textAlign={'center'}
                >
                    {t('faq.t_title')}
                </Typography>
                <FormGroup>
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
                                // Open page
                                AppUtils.openPage(navigate, 'faq', { state: { search: searchText } });
                                // Save cache
                                setTimeout(() => {
                                    if (!searchHistory || !Array.isArray(searchHistory)) {
                                        AppUtils.setCache(keySearchHistory, [searchText]);
                                    } else {
                                        if (searchHistory.length >= 7) {
                                            searchHistory.pop();
                                        }
                                        AppUtils.setCache(keySearchHistory, [searchText].concat(searchHistory));
                                    }
                                }, 10);
                            }}
                        >
                            <Search color={'text.primary'} />
                        </Button>
                    </Stack>
                </FormGroup>
            </Stack>

            {Array.isArray(searchHistory) && (
                <Stack>
                    <Stack
                        direction={'row'}
                        spacing={1}
                        alignItems={'center'}
                    >
                        <AccessTime fontSize={'small'} />
                        <Typography
                            variant={'body1'}
                            color={'text.primary'}
                        >
                            {t('faq.t_history_title')}
                        </Typography>
                        <Box sx={{ flexGrow: 1 }} />
                        <IconButton
                            color="inherit"
                            onClick={() => AppUtils.setCache(keySearchHistory, undefined)}
                        >
                            <DeleteOutline />
                        </IconButton>
                    </Stack>
                    <List>
                        {searchHistory.map((text, index) => (
                            <ListItem key={`index-${index}`}>
                                <CardGradient>
                                    <CardActionArea
                                        onClick={() => {
                                            AppUtils.openPage(navigate, 'faq', { state: { search: text } });
                                        }}
                                    >
                                        <CardContent sx={{
                                            '&:last-child': {
                                                paddingBottom: 2
                                            }
                                        }}>
                                            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                                                {text}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </CardGradient>
                            </ListItem>
                        ))}
                    </List>
                </Stack>
            )}
        </Stack>
    );
}

FaqPage.propTypes = {};
