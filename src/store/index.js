import { configureStore } from "@reduxjs/toolkit"
import tempUnitSlice from "../features/tempUnit/tempUnitSlice"
import currentWeatherSlice from "../features/currentWeather/currentWeatherSlice"

export default configureStore({
    reducer: {
        tempUnit: tempUnitSlice,
        currentWeather: currentWeatherSlice,
    },
})
