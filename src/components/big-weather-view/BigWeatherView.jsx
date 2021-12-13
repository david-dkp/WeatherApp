import React, { useEffect } from "react"
import "./BigWeatherView.scss"
import { useSelector, useDispatch } from "react-redux"
import { selectTempUnit } from "../../features/tempUnit/tempUnitSlice.js"
import {
    selectWeatherData,
    selectWeatherStatus,
    fetchWeathersForLocation,
} from "../../features/currentWeather/currentWeatherSlice"

import { MyLocation, LocationOn } from "@material-ui/icons"
import { celToFar } from "../../utilities/tempConversion"
import getWeatherImageUrl from "../../utilities/weatherImage"
import { toShortDateString } from "../../utilities/dateFormatter"
import { useCookies } from "react-cookie"
import { fetchLocationsByLatLng } from "../../apis/weatherApi"
import { throttle } from "throttle-debounce"

function BigWeatherView({ ...props }) {
    const dispatch = useDispatch()

    const tempUnit = useSelector(selectTempUnit)
    const weatherStatus = useSelector(selectWeatherStatus)
    const weatherData = useSelector(selectWeatherData)

    let weatherImageUrl
    let temp
    let weatherStateName
    let dateString
    let location

    if (weatherStatus === "succeeded") {
        const todayConsolidatedWeather =
            weatherData.weather["consolidated_weather"][0]
        weatherStateName = todayConsolidatedWeather["weather_state_name"]
        weatherImageUrl = getWeatherImageUrl(weatherStateName)

        const todayTemp = todayConsolidatedWeather["max_temp"]
        temp = Math.round(tempUnit === "C" ? todayTemp : celToFar(todayTemp))
        location = weatherData.weather["title"]
        dateString = toShortDateString(Date.parse(weatherData.weather["time"]))
    } else if (weatherStatus === "idle") {
        weatherImageUrl = ""
        temp = tempUnit === "C" ? 0 : celToFar(0)
        weatherStateName = "None"
        dateString = toShortDateString(new Date(Date.now()))
        location = "Paradise"
    }

    const [cookies, setCookie] = useCookies(["last_location_id"])

    const getLocationWeather = throttle(1000, () => {
        if (weatherStatus === "loading") return
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
            })
        }
    })

    useEffect(() => {
        navigator.permissions.query({ name: "geolocation" }).then((status) => {
            if (status.state === "granted") {
                getLocationWeather()
            } else if (status.state === "denied") {
                //TODO: show error
            }
        })

        if (cookies["last_location_id"]) {
            dispatch(fetchWeathersForLocation(cookies.last_location_id))
        } else {
            getLocationWeather()
        }
    }, [])

    return (
        <div className="container" {...props}>
            <div className="search-container">
                <button>Search for places</button>
                <button
                    className="round-icon"
                    onClick={(e) => getLocationWeather()}
                >
                    <MyLocation titleAccess="Weather from my position" />
                </button>
            </div>
            <div className="weather-image-container">
                <div className="weather-background-image" />
                <img src={weatherImageUrl} alt="" className="weather-image" />
            </div>
            <h1 className="today-temp">
                {temp}
                <span className="temp-unit">
                    <span className="degre-symbol">°</span>
                    {tempUnit}
                </span>
            </h1>
            <h2 className="weather-desc">{weatherStateName}</h2>
            <div className="date-container">
                <h3 className="today">Today</h3>
                <div className="centered-dot">•</div>
                <h3 className="date-short">{dateString}</h3>
            </div>
            <div className="location-container">
                <LocationOn className="location-on" />
                <h3 className="location">{location}</h3>
            </div>
        </div>
    )
}

export default BigWeatherView
