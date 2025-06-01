# Aurora Toolbot

> Subscribe and like ⭐

> The application is under development.

A [React](https://react.dev/) app that implements [Telegram Mini Apps](https://core.telegram.org/bots/webapps) and native apps using [Tauri](https://v2.tauri.app/) - GUI for [Aurora Bot](https://github.com/keygenqt/aurora-bot). An application that provides easy management of the Aurora OS ecosystem.

![preview](data/preview.png)

### Run Debian

1. Install Node.
2. Install Tauri dependency:

```shell
sudo apt update
sudo apt install libwebkit2gtk-4.1-dev \
  build-essential \
  curl \
  wget \
  file \
  libxdo-dev \
  libssl-dev \
  libayatana-appindicator3-dev \
  librsvg2-dev
```

3. Run dev

```shell
npm run tauri dev
```

### License

```
Copyright 2025 Vitaliy Zarubin

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    https://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```
