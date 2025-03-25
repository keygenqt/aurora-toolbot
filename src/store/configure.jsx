import { configureStore } from '@reduxjs/toolkit'

import appInfoReducer from './impl/appInfo'
import sdkAvailableReducer from './impl/sdkAvailable'
import psdkAvailableReducer from './impl/psdkAvailable'
import flutterAvailableReducer from './impl/flutterAvailable'

import pageScrollReducer from './impl/pageScroll'

export default configureStore({
  reducer: {
    appInfo: appInfoReducer,
    sdkAvailable: sdkAvailableReducer,
    psdkAvailable: psdkAvailableReducer,
    flutterAvailable: flutterAvailableReducer,
    pageScroll: pageScrollReducer,
  },
})
