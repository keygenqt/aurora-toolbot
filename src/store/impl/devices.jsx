import { createSlice } from '@reduxjs/toolkit'

export const devicesSlice = createSlice({
    name: 'devices',
    initialState: {
        value: undefined,
    },
    reducers: {
        setData: (state, data) => {
            state.value = data.payload
        },
    },
})

export const { setData } = devicesSlice.actions

export default devicesSlice.reducer
