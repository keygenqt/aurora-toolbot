import { createSlice } from '@reduxjs/toolkit'

export const flutterAvailableSlice = createSlice({
    name: 'flutterAvailable',
    initialState: {
        value: undefined,
    },
    reducers: {
        setData: (state, data) => {
            state.value = data.payload
        },
    },
})

export const { setData } = flutterAvailableSlice.actions

export default flutterAvailableSlice.reducer
