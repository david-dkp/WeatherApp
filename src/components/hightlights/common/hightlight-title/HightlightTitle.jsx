import React from "react"
import "./HightlightTitle.scss"

function HightlightTitle({ title, className }) {
    return <h5 className={`hightlight-title ${className}`}>{title}</h5>
}

export default HightlightTitle
