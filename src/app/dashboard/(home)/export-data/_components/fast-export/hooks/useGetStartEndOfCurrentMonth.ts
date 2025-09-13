"use client"

interface useGetStartEndOfCurrentMonthResponse {
    startDate: string
    endDate: string
}

export const useGetStartEndOfCurrentMonth = (): useGetStartEndOfCurrentMonthResponse => {
    const today = new Date()
    const year = today.getFullYear()
    const month = today.getMonth()

    const startDate = new Date(year, month, 1)
    const endDate = new Date(year, month + 1, 0)

    return {startDate: startDate.toISOString(), endDate: endDate.toISOString()}
}