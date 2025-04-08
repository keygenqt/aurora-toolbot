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
                        menu: {
                            t_title_settings: 'Настройки',
                            t_title_info: 'Информация',
                            t_btn_auth: 'Авторизация',
                            t_btn_force_dark: 'Force Dark Mode',
                            t_btn_docs: 'Документация',
                            t_btn_about: 'О Aurora Toolbot',
                        },
                        dialog_info: {
                            t_desc: 'Приложение обеспечивающие лёгкое управление экосистемой ОС Аврора.',
                        }
                    },
                    forbidden: {
                        t_hello: 'Добро пожаловать в приложение Aurora Toolbot!',
                        t_info: 'Это не безопасная зона, и здесь приложение не доступно, воспользуйтесь Telegram Mini-app.',
                    },
                    error: {
                        t_text: 'Хм, такой станицы не существует.'
                    },
                    features: {
                        devices: {
                            t_title: 'Устройства',
                            t_text: 'Управление вашими устройствами и эмуляторами с операционной системой Аврора.',
                        },
                        emulator: {
                            t_title: 'Emulators',
                            t_text: 'Работа с эмуляторами ОС Аврора предоставляемыми Аврора SDK.',
                            t_not_found: 'Эмуляторы не найдены, установите и запустите синхронизацию установленных эмуляторов.',
                        },
                        tools: {
                            t_title: 'Инструменты разработки',
                            t_text: 'В этом разделе вы можете управлять доступными инструментами разработки для ОС Aurora.',
                        },
                        sdk: {
                            t_title: 'Аврора SDK',
                            t_text: 'Набор инструментов для сборки, разработки, отладки и тестирования прикладного ПО для ОС Аврора.',
                        },
                        psdk: {
                            t_title: 'Platform SDK',
                            t_text: 'Набор инструментов для разработки, отладки и тестирования компонентов ОС Аврора предназначенного для CI.',
                        },
                        flutter: {
                            t_title: 'Flutter SDK',
                            t_text: 'Фреймворк для создания красивых, изначально скомпилированных, приложений на основе единой кодовой базы с поддержкой ОС Аврора.',
                        },
                        assistant: {
                            t_title: 'Assistant',
                            t_text: 'Умные инструменты которые помогут вам узнать больше об ОС Аврора.',
                        },
                        faq: {
                            t_title: 'FAQ',
                            t_text: 'В этом разделе вы можете задавать вопросы а релевантный поиск найдет ответы на них.',
                        },
                    },
                    emulators: {
                        t_btn_run: 'Запустить эмулятор',
                        t_btn_stop: 'Остановить эмулятор',
                        t_btn_terminal_user: 'SSH Терминал user',
                        t_btn_terminal_root: 'SSH Терминал root',
                    },
                    fluttersInstalled: {
                        t_btn_terminal: 'Терминал Flutter',
                    },
                    psdksInstalled: {
                        t_btn_terminal: 'Терминал PSDK',
                    },
                    sdksInstalled: {
                        t_btn_tools: 'Maintenance Tool',
                    },
                    fluttersAvailable: {
                        t_text: 'Фреймворк для создания красивых, изначально скомпилированных, приложений на основе единой кодовой базы с поддержкой ОС Аврора.',
                    },
                    psdksAvailable: {
                        t_text: 'Набор инструментов для разработки, отладки и тестирования компонентов ОС Аврора предназначенного для CI.',
                    },
                    sdksAvailable: {
                        t_dialog_download_title: 'Скачать Аврора SDK',
                        t_dialog_download_body: 'Будет запущен процесс скачивания установочного файла Аврора SDK в директорию загрузок.',
                        t_item_mb2: 'Набор инструментов для сборки, разработки, отладки и тестирования прикладного ПО для ОС Аврора, использующий инструмент mb2.',
                        t_item_bt: 'Набор инструментов для разработки, отладки, сборки и тестирования прикладного ПО для ОС Аврора, использующий инструменты для кросс-компиляции Аврора Build Tools.'
                    },
                    common: {
                        t_sync: 'Синхронизация',
                        t_download: 'Скачать',
                        t_open_repo: 'Репозиторий',
                        t_link_to_file: 'Ссылка',
                        t_install: 'Установить',
                        t_available: 'Все версии',
                        t_app_name: 'Aurora Toolbot',
                        t_new_version: 'Доступна новая версия.',
                        t_open: 'Перейти',
                        t_btn_close: 'Закрыть',
                        t_btn_start: 'Начать',
                        t_btn_open_dir: 'Открыть директорию',
                        t_btn_cancel: 'Отменить',
                        t_coming_soon: 'Этого функционала пока нет, будет реализован позже.',
                        t_not_found: 'Ничего не найдено.',
                        t_error_data: 'Ошибка получения данных!'
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
