import React from "react"
import "./SmallWeatherView.scss"
import { useSelector, useDispatch } from "react-redux"
import { selectTempUnit } from "../../features/tempUnit/tempUnitSlice"
import { isTomorrow } from "date-fns"
import { toShortDateString } from "../../utilities/dateFormatter"
import { celToFar, farToCel } from "../../utilities/tempConversion"
import getWeatherImageUrl from "../../utilities/weatherImage"

function SmallWeatherView({
    weatherData: { date, maxDegree, minDegree, weatherState },
}) {
    const tempUnit = useSelector(selectTempUnit)

    const formattedDateString = isTomorrow(date)
        ? "Tomorrow"
        : toShortDateString(date)

    const maxTemp =
        tempUnit === "C" ? maxDegree : Math.round(celToFar(maxDegree))
    const minTemp =
        tempUnit === "C" ? minDegree : Math.round(celToFar(minDegree))

    const maxTempText = maxTemp + "°" + tempUnit
    const minTempText = minTemp + "°" + tempUnit

    const weatherImageUrl = getWeatherImageUrl(weatherState)

    return (
        <div className="small-weather-container">
            <h4 className="weather-date">{formattedDateString}</h4>
            <img
                src={weatherImageUrl}
                alt={weatherState}
                className="weather-image"
            />
            <div className="min-max-temp-container">
                <p className="max-temp">{maxTempText}</p>
                <p className="min-temp">{minTempText}</p>
            </div>
        </div>
    )
}

export default SmallWeatherView
