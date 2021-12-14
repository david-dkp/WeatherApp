import React from "react"
import "./Footer.scss"

function Footer({ className }) {
    return (
        <p className={`footer-text ${className}`}>
            created by <span className="name">David</span> - devChallenges.io
        </p>
    )
}

export default Footer
