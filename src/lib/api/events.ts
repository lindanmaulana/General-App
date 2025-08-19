import { api } from "../axios-instance"
import { errorHandler } from "../helpers/errorHandler"

interface eventsParams {
    params?: string
}

export const apiEventsGetAll = async ({params}: eventsParams) => {
    try {
        const response = await api.get(`/events?${params}`)

        if(response.data.error) throw new Error(response.data.error)

        return response.data
    } catch (err) {
        const errorMessage = errorHandler(err)

        throw new Error(errorMessage)
    }
}

export const apiEventsgetAllOptions = async () => {
    try {
        const response = await api.get(`/events/options`)

        if(response.data.error) throw new Error(response.data.error)

        return response.data
    } catch (err) {
        const errorMessage = errorHandler(err)

        throw new Error(errorMessage)
    }
}

export const apiEventsGetCount = async () => {
    try {
        const response = await api.get("/events/count")

        return response.data
    } catch (err) {
        const errorMessage = errorHandler(err)

        throw new Error(errorMessage)
    }
}

export const apiEventsGetCountIsPublic = async () => {
    try {
        const response = await api.get(`/events/public/count`)

        return response.data
    } catch (err) {
        const errorMessage = errorHandler(err)

        throw new Error(errorMessage)
    }
}

export const apiEventsGetTotalBudget = async () => {
    try {
        const response = await api.get('/events/budget')

        if(response.data.error) throw new Error(response.data.error)

        return response.data
    } catch (err) {
        const errorMessage = errorHandler(err)

        throw new Error(errorMessage)
    }
}