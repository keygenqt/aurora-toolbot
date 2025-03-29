import { createSlice } from '@reduxjs/toolkit'

export const emulatorsSlice = createSlice({
    name: 'emulators',
    initialState: {
        value: undefined,
    },
    reducers: {
        setData: (state, data) => {
            state.value = data.payload
        },
    },
})

export const { setData } = emulatorsSlice.actions

export default emulatorsSlice.reducer
