import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { fetchLocationWeathers } from "../../apis/weatherApi"

export const fetchWeathersForLocation = createAsyncThunk(
    "weathers/fetchWeathersForLocation",
    async (locationId) => {
        const weathers = await fetchLocationWeathers(locationId)
        return weathers
    }
)

export const currentWeatherSlice = createSlice({
    name: "currentWeather",
    initialState: {
        status: "idle",
        weather: {},
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchWeathersForLocation.pending, (state, action) => {
                state.status = "loading"
            })
            .addCase(fetchWeathersForLocation.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.error.message
            })
            .addCase(fetchWeathersForLocation.fulfilled, (state, action) => {
                state.status = "succeeded"
                state.weather = action.payload
            })
    },
})

export default currentWeatherSlice.reducer
