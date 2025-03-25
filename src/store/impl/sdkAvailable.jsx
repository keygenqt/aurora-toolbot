import { createSlice } from '@reduxjs/toolkit'

export const sdkAvailableSlice = createSlice({
    name: 'sdkAvailable',
    initialState: {
        value: undefined,
    },
    reducers: {
        setData: (state, data) => {
            state.value = data.payload
        },
    },
})

export const { setData } = sdkAvailableSlice.actions

export default sdkAvailableSlice.reducer
