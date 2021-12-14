import React, { useEffect } from "react"
import "./Hightlights.scss"
import WindStatus from "./wind-status/WindStatus"
import Humidity from "./humidity/Humidity"
import Visibility from "./visibility/Visibility"
import AirPressure from "./air-pressure/AirPressure"
import { useSelector } from "react-redux"
import {
    selectDaysConsolidatedWeathers,
    selectWeatherStatus,
} from "../../features/currentWeather/currentWeatherSlice"

function Hightlights() {
    const weatherStatus = useSelector(selectWeatherStatus)
    const todayConsolidatedWeather = useSelector(
        (state) => selectDaysConsolidatedWeathers(state)?.[0]
    )

    let mphValue
    let directionDegree
    let directionCompass

    let humidity

    let milesVisibility

    let mbAirPressure

    useEffect(() => {
        mphValue = 42
        directionDegree = 42
        directionCompass = "UP"
        humidity = 42
        milesVisibility = 42
        mbAirPressure = 42
    }, [])

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
