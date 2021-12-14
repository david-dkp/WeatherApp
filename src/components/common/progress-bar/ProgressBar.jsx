import React from "react"
import "./ProgressBar.scss"

function ProgressBar({ progress, className }) {
    return (
        <div className={`progress-bar-container ${className}`}>
            <div className="progress-bar-numbers-container">
                <div className="progress-bar-number">0</div>
                <div className="progress-bar-number fifty-percent">50</div>
                <div className="progress-bar-number">100</div>
            </div>
            <div className="bar-container">
                <div
                    className="bar-indicator"
                    style={{ width: progress.toString().concat("%") }}
                />
            </div>
            <p className="percent progress-bar-number">%</p>
        </div>
    )
}

export default ProgressBar
