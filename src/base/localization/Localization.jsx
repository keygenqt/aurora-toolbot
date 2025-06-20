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
                    /// PAGE: device
                    demoApps: {
                        t_dialog_install_title: 'Установка приложения',
                        t_dialog_install_success: 'Установка успешно выполнена.',
                    },
                    /// PAGE: device
                    device: {
                        t_open_config: 'Конфигурационный файл',
                        t_btn_screenshot: 'Сделать скриншот',
                        t_btn_terminal_user: 'SSH Терминал user',
                        t_group_tools_title: 'Tools',
                        t_group_tools_text: 'Инструменты которые позволяют легко управлять данными и приложениями на вашем устройстве.',
                        t_btn_group_tools_app_title: 'Установка приложений',
                        t_btn_group_tools_app_text: 'Установка предварительно собранных демонстрационных приложений.',
                        t_btn_group_tools_rpm_title: 'Установка пакета',
                        t_btn_group_tools_rpm_text: 'Загрузка и установка пакета RPM на ваше устройство.',
                        t_btn_group_tools_uninstall_title: 'Удаление пакета',
                        t_btn_group_tools_uninstall_text: 'Удалите установленный пакет с вашего устройства.',
                        t_btn_group_tools_run_app_title: 'Запуск пакета',
                        t_btn_group_tools_run_app_text: 'Запустите в песочнице приложение на устройстве.',
                        t_btn_group_tools_upload_title: 'Загрузка файла',
                        t_btn_group_tools_upload_text: 'Загрузите файл на ваше устройство.',
                        t_dialog_success_install: 'Установка успешно выполнена.',
                        t_dialog_success_uninstall: 'Удаление успешно выполнено.',
                        t_dialog_success_upload: 'Загрузка успешно выполнена.',
                    },
                    /// PAGE: devices
                    devices: {
                        t_not_connection: 'Нет соединения',
                        t_btn_terminal_user: 'SSH Терминал user',
                    },
                    /// PAGE: emulator
                    emulator: {
                        t_btn_run: 'Запустить эмулятор',
                        t_btn_stop: 'Остановить эмулятор',
                        t_btn_terminal_user: 'SSH Терминал user',
                        t_btn_terminal_root: 'SSH Терминал root',
                        t_btn_screenshot: 'Сделать скриншот',
                        t_btn_record_run: 'Запись видео',
                        t_btn_record_stop_mp4: 'Сохранить видео',
                        t_group_tools_title: 'Tools',
                        t_group_tools_text: 'Инструменты которые позволяют легко управлять данными и приложениями на вашем эмуляторе.',
                        t_btn_group_tools_app_title: 'Установка приложений',
                        t_btn_group_tools_app_text: 'Установка предварительно собранных демонстрационных приложений.',
                        t_btn_group_tools_rpm_title: 'Установка пакета',
                        t_btn_group_tools_rpm_text: 'Загрузка и установка пакета RPM на ваш эмулятор.',
                        t_btn_group_tools_uninstall_title: 'Удаление пакета',
                        t_btn_group_tools_uninstall_text: 'Удалите установленный пакет с вашего эмулятора.',
                        t_btn_group_tools_run_app_title: 'Запуск пакета',
                        t_btn_group_tools_run_app_text: 'Запустите в песочнице приложение на эмуляторе.',
                        t_btn_group_tools_upload_title: 'Загрузка файла',
                        t_btn_group_tools_upload_text: 'Загрузите файл на ваш эмулятор.',
                        t_dialog_success_install: 'Установка успешно выполнена.',
                        t_dialog_success_uninstall: 'Удаление успешно выполнено.',
                        t_dialog_success_upload: 'Загрузка успешно выполнена.',
                        t_dialog_record_title: 'Сохранение видео',
                    },
                    /// PAGE: emulators
                    emulators: {
                        t_btn_run: 'Запустить эмулятор',
                        t_btn_stop: 'Остановить эмулятор',
                        t_btn_terminal_user: 'SSH Терминал user',
                        t_btn_terminal_root: 'SSH Терминал root',
                    },
                    /// PAGE: error
                    error: {
                        t_text: 'Хм, такой станицы не существует.'
                    },
                    /// PAGE: faq
                    faq: {
                        t_title: 'Задайте вопрос и релевантный поиск найдет в Aurora Dataset ответ на него.',
                        t_history_title: 'История запросов',
                        t_field_search: 'Ваш вопрос',
                    },
                    /// PAGE: faqs
                    faqs: {

                    },
                    /// PAGE: features
                    features: {
                        devices: {
                            t_title: 'Устройства',
                            t_text: 'Управляйте вашими устройствами и эмуляторами с операционной системой Аврора.',
                        },
                        device: {
                            t_title: 'Devices',
                            t_text: 'Управление вашими устройствами с операционной системой Аврора.',
                            t_not_found: 'Устройства не найдены, проврете настройки конфигурационного файла.',
                            t_open_config: 'Конфигурационный файл'
                        },
                        emulator: {
                            t_title: 'Emulators',
                            t_text: 'Управление вашими эмуляторами входящими в состав Аврора SDK.',
                            t_not_found: 'Эмуляторы не найдены, установите и запустите синхронизацию.',
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
                    /// PAGE: flutter
                    flutter: {
                        t_btn_terminal: 'Терминал Flutter',
                        t_group_tools_title: 'Tools',
                        t_group_tools_text: 'Инструменты Flutter SDK.',
                        t_btn_group_format_title: 'Формат',
                        t_btn_group_format_text: 'Форматирование проекта Flutter на Dart и C++.',
                        t_btn_group_gen_report_title: 'Отчет',
                        t_btn_group_gen_report_text: 'Генерация отчета по плагинам проекта Flutter.',
                        t_btn_group_remove_title: 'Удалить',
                        t_btn_group_remove_text: 'Удалить установленную версию Flutter SDK.',
                        t_dialog_remove_title: 'Удаление Flutter SDK',
                        t_dialog_success_report: 'Отчет успешно создан.',
                        t_dialog_success_remove: 'Flutter SDK утилизирован успешно. Согласен, пора двигать на KMP ;)',
                    },
                    /// PAGE: fluttersAvailable
                    fluttersAvailable: {
                        t_text: 'Фреймворк для создания красивых, изначально скомпилированных, приложений на основе единой кодовой базы с поддержкой ОС Аврора.',
                        t_dialog_download_title: 'Загрузка Flutter SDK',
                        t_dialog_install_title: 'Установка Flutter SDK',
                    },
                    /// PAGE: fluttersInstalled
                    fluttersInstalled: {
                        t_btn_terminal: 'Терминал Flutter',
                    },
                    /// PAGE: forbidden
                    forbidden: {
                        t_hello: 'Добро пожаловать в приложение Aurora Toolbot!',
                        t_info: 'Это не безопасная зона, и здесь приложение не доступно, воспользуйтесь Telegram Mini-app.',
                    },
                    /// PAGE: main
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
                            t_btn_force_dark: 'Force Dark Mode',
                            t_btn_docs: 'Документация',
                            t_btn_about: 'О Aurora Toolbot',
                        },
                        dialog_info: {
                            t_desc: 'Приложение обеспечивающие лёгкое управление экосистемой ОС Аврора.',
                        }
                    },
                    /// PAGE: psdk
                    psdk: {
                        t_btn_terminal: 'Терминал PSDK',
                        t_group_targets_title: 'Targets',
                        t_group_targets_text: 'Список целевых архитектур Platform SDK.',
                        t_group_tools_title: 'Tools',
                        t_group_tools_text: 'Инструменты Platform SDK.',
                        t_btn_group_sign_title: 'Подписать пакет',
                        t_btn_group_sign_text: 'Подписать RPM пакет публичным ключом.',
                        t_btn_group_remove_title: 'Удалить',
                        t_btn_group_remove_text: 'Удалить установленную версию Platform SDK.',
                        t_dialog_success_sign: 'Пакет успешно подписан.',
                        t_dialog_remove_title: 'Удаление Platform SDK',
                        t_dialog_remove_body: 'Удаление Platform SDK требует повышенных привилегий. Для удаления открыт терминал.',
                        t_dialog_success_remove: 'Ошибок не обнаружено.',
                    },
                    /// PAGE: psdksAvailable
                    psdksAvailable: {
                        t_text: 'Набор инструментов для разработки, отладки и тестирования компонентов ОС Аврора предназначенного для CI.',
                        t_dialog_download_title: 'Загрузка Platform SDK',
                        t_dialog_install_title: 'Установка Platform SDK',
                        t_dialog_install_body: 'Установка Platform SDK требует повышенных привилегий. Для выполнения установки открыт терминал.',
                        t_dialog_install_body_success: 'Ошибок не обнаружено.'
                    },
                    /// PAGE: psdksInstalled
                    psdksInstalled: {
                        t_btn_terminal: 'Терминал PSDK',
                    },
                    /// PAGE: psdkTarget
                    psdkTarget: {
                        t_group_tools_title: 'Tools',
                        t_group_tools_text: 'Инструменты которые позволяют управлять пакетами таргета Platform SDK.',
                        t_btn_group_tools_rpm_title: 'Установка пакета',
                        t_btn_group_tools_rpm_text: 'Установка пакета RPM в таргет.',
                        t_btn_group_tools_uninstall_title: 'Удаление пакета',
                        t_btn_group_tools_uninstall_text: 'Удаление пакета RPM из таргета.',
                        t_dialog_success_install_start: 'Установка пакета...',
                        t_dialog_success_install: 'Установка успешно выполнена.',
                    },
                    /// PAGE: sdk
                    sdk: {
                        t_btn_tools: 'Maintenance Tool',
                        t_btn_run: 'Запустить Аврора IDE',
                        t_btn_stop: 'Остановить Аврора IDE',
                        t_group_tools_title: 'Tools',
                        t_group_tools_text: 'Инструменты Аврора SDK.',
                        t_btn_group_format_title: 'Формат',
                        t_btn_group_format_text: 'Форматирование проекта ОС Аврора Qt/C++.',
                        t_btn_group_remove_title: 'Удалить',
                        t_btn_group_remove_text: 'Удалить установленную версию Аврора SDK.',
                        t_dialog_remove_title: 'Удаление Аврора SDK',
                        t_dialog_remove_body: 'Для удаления Аврора SDK открыт Maintenance Tool.',
                        t_dialog_success_remove: 'Ошибок не обнаружено.',
                    },
                    /// PAGE: sdksAvailable
                    sdksAvailable: {
                        t_item_mb2: 'Набор инструментов для сборки, разработки, отладки и тестирования прикладного ПО для ОС Аврора, использующий инструмент mb2.',
                        t_item_bt: 'Набор инструментов для разработки, отладки, сборки и тестирования прикладного ПО для ОС Аврора, использующий инструменты для кросс-компиляции Аврора Build Tools.',
                        t_dialog_download_title: 'Загрузка Аврора SDK',
                        t_dialog_install_title: 'Установка Аврора SDK',
                        t_dialog_install_body_success: 'Ошибок не обнаружено.'
                    },
                    /// PAGE: sdksInstalled
                    sdksInstalled: {
                        t_btn_tools: 'Maintenance Tool',
                    },
                    // Common text for pages
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
                        t_not_found: 'Ничего не найдено.',
                        t_error_data: 'Ошибка получения данных!',
                        t_dialog_body_connection: 'Выполняем подключение...',
                        t_dialog_body_error: 'Не удалось выполнить задачу.',
                        t_dialog_body_download_success: 'Данные успешно загружены в директорию ~/Downloads.',
                        t_dialog_body_run_success: 'Приложение успешно запущено.',
                        t_dialog_body_install_success: 'Установка выполнена успешно.',
                        t_dialog_body_format_start: 'Поиск файлов в директории для форматирования...',
                        t_dialog_btn_default: 'Отмена',
                        t_dialog_btn_error: 'Закрыть',
                        t_dialog_btn_success: 'Ok',
                        t_dialog_btn_select: 'Выбрать',
                        t_dialog_btn_lock: 'Остановить',
                        t_dialog_empty_data: {
                            body: "Ничего не найдено..."
                        },
                        t_dialog_search_package: {
                            title: "Поиск пакета",
                        },
                        t_dialog_select_file: {
                            title: "Выбор файла",
                            body: "Выберите необходимый файл..."
                        },
                        t_dialog_select_dir: {
                            title: "Выбор директории",
                            body: "Выберите директорию проекта..."
                        },
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
