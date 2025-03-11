import axios from 'axios';
import { AppInfoModel, EmulatorInfoModel } from '../../models';

// https://core.telegram.org/bots/webapps#validating-data-received-via-the-mini-app
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
