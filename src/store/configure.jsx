import { configureStore } from '@reduxjs/toolkit'

import appInfoReducer from './impl/appInfo'
import emulatorsReducer from './impl/emulators'
import sdkAvailableReducer from './impl/sdkAvailable'
import sdkInstalledReducer from './impl/sdkInstalled'
import psdkAvailableReducer from './impl/psdkAvailable'
import psdkInstalledReducer from './impl/psdkInstalled'
import flutterAvailableReducer from './impl/flutterAvailable'
import flutterInstalledReducer from './impl/flutterInstalled'
import pageScrollReducer from './impl/pageScroll'
import stateBoolReducer from './impl/stateBool'

export default configureStore({
  reducer: {
    appInfo: appInfoReducer,
    emulators: emulatorsReducer,
    sdkAvailable: sdkAvailableReducer,
    sdkInstalled: sdkInstalledReducer,
    psdkAvailable: psdkAvailableReducer,
    psdkInstalled: psdkInstalledReducer,
    flutterAvailable: flutterAvailableReducer,
    flutterInstalled: flutterInstalledReducer,
    pageScroll: pageScrollReducer,
    stateBool: stateBoolReducer,
  },
})
