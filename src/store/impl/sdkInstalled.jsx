import { createSlice } from '@reduxjs/toolkit'

export const sdkInstalledSlice = createSlice({
    name: 'sdkInstalled',
    initialState: {
        value: undefined,
    },
    reducers: {
        setData: (state, data) => {
            state.value = data.payload
        },
    },
})

export const { setData } = sdkInstalledSlice.actions

export default sdkInstalledSlice.reducer
