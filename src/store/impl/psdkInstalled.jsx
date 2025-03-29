import { createSlice } from '@reduxjs/toolkit'

export const psdkInstalledSlice = createSlice({
    name: 'psdkInstalled',
    initialState: {
        value: undefined,
    },
    reducers: {
        setData: (state, data) => {
            state.value = data.payload
        },
    },
})

export const { setData } = psdkInstalledSlice.actions

export default psdkInstalledSlice.reducer
