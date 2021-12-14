import React from "react"
import "./MyInput.scss"

function MyInput({ startIcon, className, ...props }) {
    return (
        <div className={`input-container ${className}`}>
            {startIcon}
            <input {...props} />
        </div>
    )
}

export default MyInput
