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
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
    .use(initReactI18next)
    .init({
        resources: {
            ru: {
                translation: {
                    main: {
                        t_hello: 'Добро пожаловать в приложение Aurora Toolbot!',
                        t_connect_success: 'Соединение успешно установлено.',
                        t_connect_success_info_t: 'D-Bus: v{{version}}',
                        t_connect_success_info_w: 'Aurora Bot: v{{version}}',
                        t_connect_btn_start: 'Инструменты',
                        t_connect_error: 'Не удалось установить соединение.',
                        t_connect_error_info_t: 'Установите актуальную версию приложения Aurora Bot.',
                        t_connect_error_info_w: 'Необходимо установить актуальную версию приложения Aurora Bot и активировать соединение с сервером.',
                        t_connect_btn_doc: 'Документация',
                    },
                    forbidden: {
                        t_hello: 'Добро пожаловать в приложение Aurora Toolbot!',
                        t_info: 'Это не безопасная зона, и здесь приложение не доступно, воспользуйтесь Telegram Mini-app.',
                    },
                    error: {
                        t_text: 'Хм, такой станицы не существует.'
                    },
                    common: {
                        t_coming_soon: 'Этого функционала пока нет, будет реализован позже.'
                    }
                },
            },
        },
        lng: "ru",
        fallbackLng: "ru",
        interpolation: {
            escapeValue: false
        }
    });
