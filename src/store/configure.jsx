import { configureStore } from '@reduxjs/toolkit'

import appInfoReducer from './impl/appInfo'

export default configureStore({
  reducer: {
    appInfo: appInfoReducer,
  },
})
