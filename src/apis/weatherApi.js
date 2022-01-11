const baseUrl =
    "https://weather-app-300202.herokuapp.com/https://www.metaweather.com/api/location"

export const fetchLocationWeathers = async (locationId) => {
    const response = await fetch(`${baseUrl}/${locationId}`)
    const weathers = await response.json()
    return weathers
}

export const fetchLocationsByQuery = async (query) => {
    const response = await fetch(
        `${baseUrl}/search/?query=${encodeURIComponent(query)}`
    )
    const locations = await response.json()
    return locations
}

export const fetchLocationsByLatLng = async (lat, lng) => {
    const response = await fetch(`${baseUrl}/search/?lattlong=${lat},${lng}`)
    const locations = await response.json()
    return locations
}
