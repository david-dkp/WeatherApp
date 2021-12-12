import React, { useEffect } from "react"
import BigWeatherView from "../big-weather-view/BigWeatherView"
import "./HomeScreen.scss"
import { selectTempUnit, setUnit } from "../../features/tempUnit/tempUnitSlice"
import { useSelector, useDispatch } from "react-redux"
import SmallWeatherView from "../small-weather-view/SmallWeatherView"
import add from "date-fns/add"

function HomeScreen() {
    const tempUnit = useSelector(selectTempUnit)
    const dispatch = useDispatch()

    const setTempUnit = (tempUnit) => {
        dispatch(setUnit(tempUnit))
    }

    const nextDaysWeather = [
        {
            date: add(new Date(Date.now()), { days: 1 }),
            minDegree: 11,
            maxDegree: 16,
            weatherState: "Light Rain",
        },
        {
            date: add(new Date(Date.now()), { days: 2 }),
            minDegree: 11,
            maxDegree: 16,
            weatherState: "Light Rain",
        },
        {
            date: add(new Date(Date.now()), { days: 3 }),
            minDegree: 11,
            maxDegree: 16,
            weatherState: "Light Rain",
        },
        {
            date: add(new Date(Date.now()), { days: 4 }),
            minDegree: 11,
            maxDegree: 16,
            weatherState: "Light Rain",
        },
        {
            date: add(new Date(Date.now()), { days: 5 }),
            minDegree: 11,
            maxDegree: 16,
            weatherState: "Light Rain",
        },
    ]

    return (
        <main className="main-container">
            <BigWeatherView />
            <section className="weather-details-section">
                <div className="weather-details-container">
                    <div className="temp-unit-selector-container">
                        <button
                            className={`round-icon temp-unit-button ${
                                tempUnit === "C"
                                    ? "temp-unit-button-selected"
                                    : ""
                            }`}
                            onClick={(e) => setTempUnit("C")}
                        >
                            °C
                        </button>
                        <button
                            className={`round-icon temp-unit-button ${
                                tempUnit === "F"
                                    ? "temp-unit-button-selected"
                                    : ""
                            }`}
                            onClick={(e) => setTempUnit("F")}
                        >
                            °F
                        </button>
                    </div>
                    <div className="days-weather-container">
                        {nextDaysWeather.map((e, i) => (
                            <SmallWeatherView key={i} weatherData={e} />
                        ))}
                    </div>
                    <div className="today-hightlights-container">
                        <h2 className="today-hightlights-title">
                            Today's Hightlights
                        </h2>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default HomeScreen
