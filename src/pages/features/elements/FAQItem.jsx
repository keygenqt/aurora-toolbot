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
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";

import {
    useTheme,
    Typography,
    ListItem,
    CardActionArea,
    CardContent,
    Box,
} from '@mui/material';

import { AppUtils, CardGradient } from '../../../base';

export function FAQItem(props) {
    // components
    const { t } = useTranslation();
    const theme = useTheme();
    const navigate = useNavigate();
    // data
    const color = theme.palette.info.main;
    // item
    return (
        <ListItem>
            <CardGradient color={color}>
                <CardActionArea
                    onClick={() => {
                        AppUtils.openPageDelay(navigate, 'faq')
                    }}
                >
                    <CardContent>
                        <Box sx={{ paddingBottom: 1 }}>
                            <Typography variant="subtitle2" color={color} >
                                {t('features.faq.t_title')}
                            </Typography>
                        </Box>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {t('features.faq.t_text')}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </CardGradient>
        </ListItem>
    );
}

FAQItem.propTypes = {};
