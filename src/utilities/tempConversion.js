export const celToFar = (degreeCelsius) => {
    return (degreeCelsius * 9) / 5 + 32
}

export const farToCel = (degreeFahrenheit) => {
    return ((degreeFahrenheit - 32) * 5) / 9
}
