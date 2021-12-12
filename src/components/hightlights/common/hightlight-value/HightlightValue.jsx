import React from "react"
import "./HightlightValue.scss"

function HightlightValue({ value, unit, className }) {
    return (
        <p className={className}>
            <span className="hightlight-value">{value}</span>
            <span className="hightlight-unit">{unit}</span>
        </p>
    )
}

export default HightlightValue
