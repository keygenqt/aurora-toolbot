import { createSlice } from '@reduxjs/toolkit'

export const appInfoSlice = createSlice({
    name: 'appInfo',
    initialState: {
        value: undefined,
    },
    reducers: {
        setData: (state, data) => {
            state.value = data.payload
        },
    },
})

export const { setData } = appInfoSlice.actions

export default appInfoSlice.reducer
