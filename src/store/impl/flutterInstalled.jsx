import { createSlice } from '@reduxjs/toolkit'

export const flutterInstalledSlice = createSlice({
    name: 'flutterInstalled',
    initialState: {
        value: undefined,
    },
    reducers: {
        setData: (state, data) => {
            state.value = data.payload
        },
    },
})

export const { setData } = flutterInstalledSlice.actions

export default flutterInstalledSlice.reducer
