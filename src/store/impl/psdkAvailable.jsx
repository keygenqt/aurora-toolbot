import { createSlice } from '@reduxjs/toolkit'

export const psdkAvailableSlice = createSlice({
    name: 'psdkAvailable',
    initialState: {
        value: undefined,
    },
    reducers: {
        setData: (state, data) => {
            state.value = data.payload
        },
    },
})

export const { setData } = psdkAvailableSlice.actions

export default psdkAvailableSlice.reducer
