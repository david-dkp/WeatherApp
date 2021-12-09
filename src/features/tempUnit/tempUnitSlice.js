import { createSlice } from "@reduxjs/toolkit"

export const tempUnitSlice = createSlice({
    name: "tempUnit",
    initialState: {
        value: "C",
    },
    reducers: {
        setUnit: (state, action) => {
            state.value = action.payload
        },
    },
})

export const selectTempUnit = (state) => state.tempUnit.value

export default tempUnitSlice.reducer

export const { setUnit } = tempUnitSlice.actions
