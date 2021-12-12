import React from "react"
import { Navigation } from "@material-ui/icons"
import "./Direction.scss"

function Direction({ directionDegree, className }) {
    return (
        <div className={`direction-container ${className}`}>
            <Navigation
                style={{ transform: `rotate(${directionDegree}deg)` }}
            />
        </div>
    )
}

export default Direction
