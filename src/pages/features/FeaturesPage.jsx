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

import { useTheme, Typography, ListItem, List, Card, CardActionArea, CardContent, Stack } from '@mui/material';

import { DataImages, AppUtils } from '../../base'

export function FeaturesPage(props) {
    // components
    const theme = useTheme();
    const navigate = useNavigate();
    // data
    const list = [
        {
            'title': 'Устройства',
            'desc': 'Управление вашими устройствами и эмуляторами с операционной системой Аврора.',
        },
        // @todo
        // {
        //     'title': 'Devices',
        //     'desc': 'Работа с эмуляторами ОС Аврора предоставляемыми Аврора SDK.',
        //     'color': theme.palette.secondary.main,
        //     'route': 'devices',
        // },
        {
            'title': 'Emulators',
            'desc': 'Работа с эмуляторами ОС Аврора предоставляемыми Аврора SDK.',
            'color': theme.palette.secondary.main,
            'route': 'emulators',
        },
        {
            'title': 'Инструменты разработки',
            'desc': 'В этом разделе вы можете управлять доступными инструментами разработки для ОС Aurora.',
        },
        {
            'icon': DataImages.iconSdk,
            'title': 'Аврора SDK',
            'desc': 'Набор инструментов для сборки, разработки, отладки и тестирования прикладного ПО для ОС Аврора.',
            'color': theme.palette.mode === 'dark' ? '#c19df2' : '#4c0ea1',
            'route': 'sdk',
        },
        {
            'icon': DataImages.iconPsdk,
            'title': 'Platform SDK',
            'desc': 'Набор инструментов для разработки, отладки и тестирования компонентов ОС Аврора предназначенного для CI.',
            'color': theme.palette.mode === 'dark' ? '#2895a8' : '#00457C',
            'route': 'psdk',
        },
        {
            'icon': DataImages.iconFlutter,
            'title': 'Flutter SDK',
            'desc': 'Фреймворк для создания красивых, изначально скомпилированных, приложений на основе единой кодовой базы с поддержкой ОС Аврора.',
            'color': theme.palette.mode === 'dark' ? '#379ded' : '#0075d0',
            'route': 'flutter',
        },
        {
            'title': 'Assistant',
            'desc': 'Умные инструменты которые помогут вам узнать больше об ОС Аврора.',
        },
        {
            'title': 'FAQ',
            'desc': 'В этом разделе вы можете задавать вопросы а релевантный поиск найдет ответы на них.',
            'color': theme.palette.info.main,
            'route': 'faq',
        },
    ];
    // Page
    return (
        <List>
            {list.map((e, index) => (e.color ? (
                <ListItem key={`key-${index}`}>
                    <Card
                        sx={{
                            border: `1px solid ${e.color}5e`,
                            background: `linear-gradient(to right, transparent 0%, ${e.color}1c 100%)`
                        }}
                    >
                        <CardActionArea
                            onClick={() => {
                                AppUtils.openPageDelay(navigate, e.route)
                            }}
                        >
                            <CardContent>
                                <Stack
                                    direction="row"
                                    spacing={1}
                                    sx={{
                                        paddingBottom: 1,
                                        alignItems: "center",
                                    }}
                                >
                                    {e.icon && (
                                        <img
                                            style={{ width: '16px', height: '16px' }}
                                            src={e.icon}
                                            alt='Icon' />
                                    )}
                                    <Typography
                                        variant="subtitle2"
                                        color={e.color}
                                    >
                                        {e.title}
                                    </Typography>
                                </Stack>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    {e.desc}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </ListItem>
            ) : (
                <ListItem key={`key-${index}`}>
                    <CardContent sx={{ p: '0 !important' }}>
                        <Typography
                            gutterBottom
                            variant="subtitle2"
                            color={'text.primary'}
                        >
                            {e.title}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {e.desc}
                        </Typography>
                    </CardContent>
                </ListItem>
            )))}
        </List>
    );
}

FeaturesPage.propTypes = {};
