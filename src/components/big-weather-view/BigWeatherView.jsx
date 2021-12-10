import React from 'react';
import "./BigWeatherView.scss"
import { useSelector } from 'react-redux';
import { selectTempUnit } from "../../features/tempUnit/tempUnitSlice.js"
import { MyLocation, LocationOn  } from "@material-ui/icons"
import HeavyCloud from "../../assets/HeavyCloud.png"

function BigWeatherView({...props}) {
    const tempUnit = useSelector(selectTempUnit)

    return (
        <div className="container" {...props}>
            <div className="search-container">
                <button>Search for places</button>
                <button className="round-icon">
                    <MyLocation titleAccess="Weather from my position" />
                </button>
            </div>
            <div className="weather-image-container"> 
                <div className="weather-background-image" />
                <img src={HeavyCloud} alt="" className="weather-image" />
            </div>
            <h1 className="today-temp">15<span className="temp-unit"><span className="degre-symbol">°</span>{tempUnit}</span></h1>
            <h2 className="weather-desc">Shower</h2>
            <div className="date-container">
                <h3 className="today">Today</h3>
                <div className="centered-dot">•</div>
                <h3 className="date-short">Fri, 5 Jun</h3>
            </div>
            <div className="location-container">
                <LocationOn className="location-on" />
                <h3 className="location">Helsinki</h3>
            </div>
        </div>
    )
}

export default BigWeatherView