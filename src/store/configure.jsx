import { configureStore } from '@reduxjs/toolkit'

import appInfoReducer from './impl/appInfo'
import pageScrollReducer from './impl/pageScroll'

export default configureStore({
  reducer: {
    appInfo: appInfoReducer,
    pageScroll: pageScrollReducer,
  },
})
