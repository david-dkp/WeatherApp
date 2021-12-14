import React from "react"
import { NavigationRounded } from "@material-ui/icons"
import "./Direction.scss"

function Direction({ directionDegree, className }) {
    return (
        <div className={`direction-container ${className}`}>
            <NavigationRounded
                style={{ transform: `rotate(${directionDegree}deg)` }}
            />
        </div>
    )
}

export default Direction
