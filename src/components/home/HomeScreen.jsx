import React, { useEffect } from "react"
import BigWeatherView from "../big-weather-view/BigWeatherView"
import "./HomeScreen.scss"
import { selectTempUnit, setUnit } from "../../features/tempUnit/tempUnitSlice"
import { useSelector, useDispatch } from "react-redux"
import SmallWeatherView from "../small-weather-view/SmallWeatherView"
import {
    fetchWeathersForLocation,
    selectDaysConsolidatedWeathers,
    selectWeatherStatus,
} from "../../features/currentWeather/currentWeatherSlice"
import Hightlights from "../hightlights/Hightlights"
import Footer from "../footer/Footer"
import { CircularProgress } from "react-cssfx-loading/lib"
import { useCookies } from "react-cookie"
import { debounce } from "throttle-debounce"
import { fetchLocationsByLatLng } from "../../apis/weatherApi"

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

    const [cookies, setCookie] = useCookies(["last_location_id"])

    const positionUnavailableText = "Position unavailable"

    const getLocationWeather = debounce(500, true, (onError) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                fetchLocationsByLatLng(
                    position.coords.latitude,
                    position.coords.longitude
                ).then((result) => {
                    if (result[0]) {
                        dispatch(fetchWeathersForLocation(result[0].woeid))
                        setCookie("last_location_id", result[0].woeid)
                    }
                })
            }, onError)
        } else {
            onError({ message: positionUnavailableText })
        }
    })

    useEffect(() => {
        getLocationWeather((e) => {
            if (cookies["last_location_id"]) {
                dispatch(fetchWeathersForLocation(cookies["last_location_id"]))
            } else {
                dispatch(fetchWeathersForLocation(44418))
            }
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <main className="main-container">
            <BigWeatherView
                onGetLocationWeather={() =>
                    getLocationWeather((e) => {
                        alert(e.message ?? "Something went wrong")
                    })
                }
            />
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
