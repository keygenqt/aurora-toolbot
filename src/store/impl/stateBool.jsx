import { createSlice } from '@reduxjs/toolkit'

export const stateBoolSlice = createSlice({
    name: 'stateBool',
    initialState: {
        data: {}
    },
    reducers: {
        setData: (state, data) => {
            console.log(data)
            state.data[data.payload.key] = data.payload.value
        },
    },
})

export const { setData } = stateBoolSlice.actions

export default stateBoolSlice.reducer
