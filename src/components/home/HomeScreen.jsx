import React from "react"
import BigWeatherView from "../big-weather-view/BigWeatherView"
import "./HomeScreen.scss"
import { selectTempUnit, setUnit } from "../../features/tempUnit/tempUnitSlice"
import { useSelector, useDispatch } from "react-redux"
import SmallWeatherView from "../small-weather-view/SmallWeatherView"
import add from "date-fns/add"
import WindStatus from "../hightlights/wind-status/WindStatus"
import { selectDaysConsolidatedWeathers } from "../../features/currentWeather/currentWeatherSlice"
import Humidity from "../hightlights/humidity/Humidity"

function HomeScreen() {
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
                                <SmallWeatherView key={i} weatherData={e} />
                            ))}
                    </div>
                    <div className="today-hightlights-container">
                        <h2 className="today-hightlights-title">
                            Today's Hightlights
                        </h2>
                        <div className="today-hightlights-items-container">
                            <WindStatus
                                mphValue="7"
                                directionDegree={200}
                                directionCompass="WSW"
                            />
                            <Humidity percent="50" />
                            <WindStatus
                                mphValue="7"
                                directionDegree={200}
                                directionCompass="WSW"
                            />
                            <WindStatus
                                mphValue="7"
                                directionDegree={200}
                                directionCompass="WSW"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default HomeScreen
