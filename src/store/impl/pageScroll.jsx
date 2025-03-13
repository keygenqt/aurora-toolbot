import { createSlice } from '@reduxjs/toolkit'

export const pageScrollSlice = createSlice({
    name: 'pageScroll',
    initialState: {
        data: {}
    },
    reducers: {
        setData: (state, data) => {
            state.data[data.payload.pathname] = data.payload.y
        },
    },
})

export const { setData } = pageScrollSlice.actions

export default pageScrollSlice.reducer
