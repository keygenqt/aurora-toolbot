import { createSlice } from '@reduxjs/toolkit'

export const keysStateBool = {
    emulatorsSync: 'emulatorsSync',
    emulatorsUpdate: 'emulatorsUpdate',
    emulatorLoading: 'emulatorLoading',
    fluttersSync: 'fluttersSync',
    fluttersUpdate: 'fluttersUpdate',
    flutterLoading: 'flutterLoading',
    psdksSync: 'psdksSync',
    psdksUpdate: 'psdksUpdate',
    psdkLoading: 'psdkLoading',
    sdksSync: 'sdksSync',
    sdksUpdate: 'sdksUpdate',
    sdkLoading: 'sdkLoading',
}

export const stateBoolSlice = createSlice({
    name: 'stateBool',
    initialState: {
        data: {}
    },
    reducers: {
        setData: (state, data) => {
            state.data[data.payload.key] = data.payload.value
        },
    },
})

export const { setData } = stateBoolSlice.actions

export default stateBoolSlice.reducer
