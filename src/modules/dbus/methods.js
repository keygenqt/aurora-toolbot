import { debug } from '@tauri-apps/plugin-log';
import { invoke } from "@tauri-apps/api/core";
import { AppInfoModel, EmulatorInfoModel } from '../../models';

export const MethodsDbus = {
    appInfo: async function() {
        return AppInfoModel.parse(await invoke("app_info", {}));
    },
    emulatorInfo: async function() {
        return EmulatorInfoModel.parse(await invoke("emulator_info", {}));
    },
    log: function(message) {
        debug(message)
    }
}
