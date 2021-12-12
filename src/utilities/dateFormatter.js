import { format } from "date-fns"

export const toShortDateString = (date) => {
    const pattern = "EEE', 'd' 'MMM"
    return format(date, pattern)
}
