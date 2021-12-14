import React from "react"
import "./Hightlights.scss"
import WindStatus from "./wind-status/WindStatus"
import Humidity from "./humidity/Humidity"
import Visibility from "./visibility/Visibility"
import AirPressure from "./air-pressure/AirPressure"
import { useSelector } from "react-redux"
import { selectDaysConsolidatedWeathers } from "../../features/currentWeather/currentWeatherSlice"

function Hightlights() {
    const todayConsolidatedWeather = useSelector(
        (state) => selectDaysConsolidatedWeathers(state)?.[0]
    )

    let mphValue = 42
    let directionDegree = 42
    let directionCompass = "UP"
    let humidity = 42
    let milesVisibility = 42
    let mbAirPressure = 42

    if (todayConsolidatedWeather) {
        mphValue = Math.round(todayConsolidatedWeather["wind_speed"])
        directionDegree = Math.round(todayConsolidatedWeather["wind_direction"])
        directionCompass = todayConsolidatedWeather["wind_direction_compass"]
        humidity = todayConsolidatedWeather["humidity"]
        milesVisibility =
            Math.round(todayConsolidatedWeather["visibility"] * 10) / 10
        mbAirPressure = todayConsolidatedWeather["air_pressure"]
    }

    return (
        <div className="today-hightlights-items-container">
            <WindStatus
                mphValue={mphValue}
                directionDegree={directionDegree}
                directionCompass={directionCompass}
            />
            <Humidity percent={humidity} />
            <Visibility milesVisibility={milesVisibility} />
            <AirPressure mbAirPressure={mbAirPressure} />
        </div>
    )
}

export default Hightlights
