import { api } from "../axios-instance"
import { errorHandler } from "../helpers/errorHandler"

interface eventsParams {
    params?: string
}

export const getAllEvents = async ({params}: eventsParams) => {
    try {
        const response = await api.get(`/events?${params}`)

        if(response.data.error) throw new Error(response.data.error)

        return response.data
    } catch (err) {
        const errorMessage = errorHandler(err)

        throw new Error(errorMessage)
    }
}

export const getEventOptions = async () => {
    try {
        const response = await api.get(`/events/options`)

        if(response.data.error) throw new Error(response.data.error)

        return response.data
    } catch (err) {
        const errorMessage = errorHandler(err)

        throw new Error(errorMessage)
    }
}

export const getEventCount = async () => {
    try {
        const response = await api.get("/events/count")

        return response.data
    } catch (err) {
        const errorMessage = errorHandler(err)

        throw new Error(errorMessage)
    }
}

export const getPublicEventCount = async () => {
    try {
        const response = await api.get(`/events/public/count`)

        return response.data
    } catch (err) {
        const errorMessage = errorHandler(err)

        throw new Error(errorMessage)
    }
}

export const getEventTotalBudget = async () => {
    try {
        const response = await api.get('/events/budget/total')

        return response.data
    } catch (err) {
        const errorMessage = errorHandler(err)

        throw new Error(errorMessage)
    }
}