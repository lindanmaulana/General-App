import dayjs from "dayjs"

export const handleParsePrice = (price: number) => {
    return Intl.NumberFormat("id-ID", {
        currency: "IDR",
        style: "currency",
        maximumFractionDigits: 0
    }).format(price)
}


type formatDate = "MM/DD/YYYY" | "MMMM D, YYYY" | "MMM D, YYYY" | "dddd, MMMM D, YYYY h:mm A" | "YYYY-MM-DD"

export const handleParseDate = (date: Date | string, type: formatDate) => {
    return dayjs().format(type)
}