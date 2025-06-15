// Copyright 2025 Vitaliy Zarubin
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/// Urls api
pub const DBUS_BOT_DEST: &str = "com.keygenqt.aurora_bot.toolbot";
pub const DBUS_BOT_INTERFACE: &str = "com.keygenqt.aurora_bot";

/// Timeouts query
pub const TIMEOUT_SHORT: u64 = 5000 /* 5s */;
pub const TIMEOUT_SHORT_LONG: u64 = 60000 /* 1m */;
pub const TIMEOUT_MIDDLE: u64 = 1800000 /* 30m */;
pub const TIMEOUT_LONG: u64 = 86400000 /* 1d */;
