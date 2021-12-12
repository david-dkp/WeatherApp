import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

export const currentWeatherSlice = createSlice({
    name: "currentWeather",
    initialState: {
        status: "idle",
        weathers: [],
        error: null,
    },
    extraReducers: (builder) => {
        builder.addCase()
    },
})

export const fetchWeatherForLocation = createAsyncThunk(
    "weathers/fetchWeathers",
    async () => {
        const weathers = await fetch()
    }
)
