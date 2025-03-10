import { openUrl } from '@tauri-apps/plugin-opener';

import {AppConf} from '../../conf/AppConf'

export const AppUtils = {
    checkVersion: function(model) {
        if (window.isTauri) {
            let mVersion1 = AppConf.apiVersion.split('.').slice(0, 2).join("");
            let mVersion2 = model.apiVersion.split('.').slice(0, 2).join("");
            return mVersion1 === mVersion2;
        } else {
            let mVersion1 = AppConf.appVersion.split('.').slice(0, 2).join("");
            let mVersion2 = model.appVersion.split('.').slice(0, 2).join("");
            return mVersion1 === mVersion2;
        }
    },
    openUrl: async function(url) {
        if (window.isTauri) {
            await openUrl(url);
        } else {
            window.open(url, '_blank', 'noopener,noreferrer')
        }
    }
}
