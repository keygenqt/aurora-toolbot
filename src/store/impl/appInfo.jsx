import { createSlice } from '@reduxjs/toolkit'

export const appInfoSlice = createSlice({
  name: 'appInfo',
  initialState: {
    value: undefined,
  },
  reducers: {
    setData: (state, model) => {
        state.value = model
    },
  },
})

export const { setData } = appInfoSlice.actions

export default appInfoSlice.reducer
