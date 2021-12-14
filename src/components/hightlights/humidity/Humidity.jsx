import React from "react"
import "./Humidity.scss"
import HightlightTitle from "../common/hightlight-title/HightlightTitle"
import HightlightValue from "../common/hightlight-value/HightlightValue"
import ProgressBar from "../../common/progress-bar/ProgressBar"

function Humidity({ percent }) {
    return (
        <div className="humidity-container">
            <HightlightTitle title="Humidity" />
            <HightlightValue value={percent} unit="%" />
            <ProgressBar progress={percent} className="humidity-progress-bar" />
        </div>
    )
}

export default Humidity
