import React from "react"
import "./WindStatus.scss"
import HightlightTitle from "../common/hightlight-title/HightlightTitle"
import HightlightValue from "../common/hightlight-value/HightlightValue"
import Direction from "../common/direction/Direction"

function WindStatus({
    mphValue,
    directionDegree,
    directionCompass,
    className,
}) {
    return (
        <div className={`windstatus-container ${className}`}>
            <HightlightTitle title="Wind Status" />
            <HightlightValue value={mphValue} unit="mph" />
            <div className="wind-direction-container">
                <Direction
                    className="windstatus-direction-icon"
                    directionDegree={directionDegree}
                />
                <p className="direction-compass">{directionCompass}</p>
            </div>
        </div>
    )
}

export default WindStatus
