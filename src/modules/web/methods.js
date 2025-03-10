import axios from 'axios';
import { AppInfoModel, EmulatorInfoModel } from '../../models';

// https://core.telegram.org/bots/webapps#validating-data-received-via-the-mini-app

// console.log('=============================')
// console.log(window.Telegram.WebApp.initDataUnsafe.user.id)
// console.log(window.Telegram.WebApp.colorScheme)
// console.log('=============================')

export const MethodsWeb = {
    appInfo: async function() {
        return AppInfoModel.parse((await axios.get('/api/test/appInfo')).data);
    },
    emulatorInfo: async function() {
        return EmulatorInfoModel.parse((await axios.get('/api/test/emulatorInfo')).data);
    },
    log: function(message) {
        console.log(message)
    }
}
