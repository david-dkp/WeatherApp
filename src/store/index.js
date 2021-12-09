import { configureStore } from "@reduxjs/toolkit"
import tempUnitSlice from "../features/tempUnit/tempUnitSlice"

export default configureStore({
    reducer: {
        tempUnit: tempUnitSlice,
    },
})
