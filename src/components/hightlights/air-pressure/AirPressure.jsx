import React from "react"
import HightlightTitle from "../common/hightlight-title/HightlightTitle"
import HightlightValue from "../common/hightlight-value/HightlightValue"
import "./AirPressure.scss"

function AirPressure({ mbAirPressure }) {
    return (
        <div className="hightlight-airpressure-container">
            <HightlightTitle title="Air Pressure" />
            <HightlightValue value={mbAirPressure} unit="  mb" />
        </div>
    )
}

export default AirPressure
