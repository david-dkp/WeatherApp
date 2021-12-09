import "./App.css"
import { useSelector, useDispatch } from "react-redux"
import { setUnit, selectTempUnit } from "./features/tempUnit/tempUnitSlice"

function App() {
    const tempUnit = useSelector(selectTempUnit)
    const dispatcher = useDispatch()

    return (
        <div
            className="App"
            onClick={(e) => {
                dispatcher(setUnit(tempUnit === "C" ? "F" : "C"))
            }}
        >
            {tempUnit}
        </div>
    )
}

export default App
