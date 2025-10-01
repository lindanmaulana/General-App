import { api } from "../axios-instance"
import { errorHandler } from "../helpers/errorHandler"

export const getProfileUser = async (id: string) => {
    try {
        const response = await api.get(`/users/profile/${id}`)

        if(response.data.error) throw new Error(response.data.error)

        return response.data
    } catch (err) {
        const errorMessage = errorHandler(err)

        throw new Error(errorMessage)
    }
}

export const getSystemSetting = async () => {
    try {
        const response = await api.get("/settings/system")

        return response.data
    } catch (err) {
        const errorMessage = errorHandler(err)

        throw new Error(errorMessage)
    }
}

export const getPdfDocumentSetting = async () => {
    try {
        const response = await api.get("/settings/pdf-document")

        return response.data
    } catch (err) {
        const errorMessage = errorHandler(err)

        throw new Error(errorMessage)
    }
}