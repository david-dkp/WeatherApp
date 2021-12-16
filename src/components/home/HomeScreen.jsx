import React from "react"
import BigWeatherView from "../big-weather-view/BigWeatherView"
import "./HomeScreen.scss"
import { selectTempUnit, setUnit } from "../../features/tempUnit/tempUnitSlice"
import { useSelector, useDispatch } from "react-redux"
import SmallWeatherView from "../small-weather-view/SmallWeatherView"
import {
    selectDaysConsolidatedWeathers,
    selectWeatherStatus,
} from "../../features/currentWeather/currentWeatherSlice"
import Hightlights from "../hightlights/Hightlights"
import Footer from "../footer/Footer"
import { CircularProgress } from "react-cssfx-loading/lib"

function HomeScreen() {
    const weatherStatus = useSelector(selectWeatherStatus)

    const tempUnit = useSelector(selectTempUnit)

    const dispatch = useDispatch()

    const setTempUnit = (tempUnit) => {
        dispatch(setUnit(tempUnit))
    }

    const nextDaysWeather = useSelector(selectDaysConsolidatedWeathers)
        ?.slice(1, 6)
        ?.map((weather) => {
            return {
                date: Date.parse(weather["applicable_date"]),
                minDegree: Math.round(weather["min_temp"]),
                maxDegree: Math.round(weather["max_temp"]),
                weatherState: weather["weather_state_name"],
            }
        })

    return (
        <main className="main-container">
            <BigWeatherView />
            <section className="weather-details-section">
                {weatherStatus === "loading" ? (
                    <div className="loading-progress">
                        <CircularProgress color="#e7e7eb" />
                    </div>
                ) : (
                    <>
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
                                {nextDaysWeather &&
                                    nextDaysWeather.map((e, i) => (
                                        <SmallWeatherView
                                            key={i}
                                            weatherData={e}
                                        />
                                    ))}
                            </div>
                            <div className="today-hightlights-container">
                                <h2 className="today-hightlights-title">
                                    Today's Hightlights
                                </h2>
                                {weatherStatus === "succeeded" && (
                                    <Hightlights />
                                )}
                            </div>
                            <Footer />
                        </div>
                    </>
                )}
            </section>
        </main>
    )
}

export default HomeScreen
