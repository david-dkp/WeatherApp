import React from "react"
import HightlightTitle from "../common/hightlight-title/HightlightTitle"
import HightlightValue from "../common/hightlight-value/HightlightValue"
import "./Visibility.scss"

function Visibility({ milesVisibility }) {
    return (
        <div className="hightlight-visibility-container">
            <HightlightTitle title="Visibility" />
            <HightlightValue value={milesVisibility} unit="  miles" />
        </div>
    )
}

export default Visibility
