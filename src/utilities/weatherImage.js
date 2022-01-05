import Snow from "../assets/Snow.png"
import Sleet from "../assets/Sleet.png"
import Hail from "../assets/Hail.png"
import Thunderstorm from "../assets/Thunderstorm.png"
import HeavyRain from "../assets/HeavyRain.png"
import LightRain from "../assets/LightRain.png"
import Showers from "../assets/Shower.png"
import HeavyCloud from "../assets/HeavyCloud.png"
import LightCloud from "../assets/LightCloud.png"
import Clear from "../assets/Clear.png"

function getWeatherImageUrl(name) {
    var url = ""

    switch (name) {
        case "Snow":
            url = Snow
            break
        case "Sleet":
            url = Sleet
            break
        case "Hail":
            url = Hail
            break
        case "Thunderstorm":
        case "Thunder":
            url = Thunderstorm
            break
        case "Heavy Rain":
            url = HeavyRain
            break
        case "Light Rain":
            url = LightRain
            break
        case "Showers":
            url = Showers
            break
        case "Heavy Cloud":
            url = HeavyCloud
            break
        case "Light Cloud":
            url = LightCloud
            break
        case "Clear":
            url = Clear
            break
        default:
            break
    }

    return url
}

export default getWeatherImageUrl
