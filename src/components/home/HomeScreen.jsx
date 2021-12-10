import React from "react"
import BigWeatherView from "../big-weather-view/BigWeatherView"
import "./HomeScreen.scss"
import { selectTempUnit, setUnit } from "../../features/tempUnit/tempUnitSlice"
import { useSelector, useDispatch } from "react-redux"

function HomeScreen() {
    const tempUnit = useSelector(selectTempUnit)
    const dispatch = useDispatch()

    const onTempUnitChange = (tempUnit) => {
        dispatch(setUnit(tempUnit))
    }

    const nextDaysWeather = [
        {
            date: new Date(Date.now() + 1),
            degree: 10,
            weatherState: "Light Rain",
        },
        {
            date: new Date(Date.now() + 2),
            degree: 10,
            weatherState: "Light Rain",
        },
        {
            date: new Date(Date.now() + 3),
            degree: 10,
            weatherState: "Light Rain",
        },
        {
            date: new Date(Date.now() + 4),
            degree: 10,
            weatherState: "Light Rain",
        },
        {
            date: new Date(Date.now() + 5),
            degree: 10,
            weatherState: "Light Rain",
        },
        {
            date: new Date(Date.now() + 6),
            degree: 10,
            weatherState: "Light Rain",
        },
    ]

    return (
        <main className="main-container">
            <BigWeatherView />
            <div className="weather-details-container">
                <div className="temp-unit-selector-container">
                    <button
                        className={`round-icon temp-unit-button ${
                            tempUnit === "C" ? "temp-unit-button-selected" : ""
                        }`}
                        onClick={(e) => onTempUnitChange("C")}
                    >
                        °C
                    </button>
                    <button
                        className={`round-icon temp-unit-button ${
                            tempUnit === "F" ? "temp-unit-button-selected" : ""
                        }`}
                        onClick={(e) => onTempUnitChange("F")}
                    >
                        °F
                    </button>
                </div>
                <div className="days-weather-container"></div>
                <div className="today-hightlights-container"></div>
            </div>
        </main>
    )
}

export default HomeScreen
