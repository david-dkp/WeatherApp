import React, { useState } from "react"
import {
    ArrowForwardIosRounded,
    CloseRounded,
    SearchRounded,
} from "@material-ui/icons"
import { debounce } from "throttle-debounce"
import "./SearchPanel.scss"
import { fetchLocationsByQuery } from "../../apis/weatherApi"
import MyInput from "../common/my-input/MyInput"
import { useDispatch } from "react-redux"
import { fetchWeathersForLocation } from "../../features/currentWeather/currentWeatherSlice"
import { CircularProgress } from "react-cssfx-loading/lib"

function SearchPanel({ onClose }) {
    const dispatch = useDispatch()

    const [results, setResults] = useState([])
    const [loading, setLoading] = useState(false)
    const [query, setQuery] = useState("")

    const validQuery = (query) => {
        return query.length > 0
    }

    const onSearchClick = debounce(700, true, () => {
        const cleanQuery = query.trim()
        if (!validQuery(cleanQuery)) return
        setLoading(true)
        fetchLocationsByQuery(encodeURI(cleanQuery)).then((response) => {
            setLoading(false)
            setResults(response)
        })
    })

    const onLocationClick = (locationId) => {
        dispatch(fetchWeathersForLocation(locationId))
        onClose && onClose()
    }

    const resultItem = (locationId, locationName) => {
        return (
            <button
                onClick={(e) => onLocationClick(locationId)}
                key={locationId}
                className="search-result-item-container"
            >
                <p className="search-result-item-title">{locationName}</p>
                <ArrowForwardIosRounded className="search-result-item-arrow" />
            </button>
        )
    }

    const handleOnSearchKeyPress = (e) => {
        if (e.key === "Enter") {
            onSearchClick()
        }
    }

    return (
        <div className="search-panel-container">
            <CloseRounded
                className="close-search"
                onClick={(e) => onClose && onClose()}
            />
            <div className="search-bar-input-container">
                <MyInput
                    className="location-search"
                    placeholder="search location"
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyPress={handleOnSearchKeyPress}
                    startIcon={<SearchRounded />}
                />
                <button
                    onClick={(e) => onSearchClick()}
                    className="search-button"
                >
                    Search
                </button>
            </div>
            <div className="search-result-container">
                {loading ? (
                    <div className="search-loading-progress">
                        <CircularProgress color="#e7e7eb" />
                    </div>
                ) : (
                    <div className="search-result-subcontainer">
                        {results.map((result, i) => {
                            return resultItem(result["woeid"], result["title"])
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}

export default SearchPanel
