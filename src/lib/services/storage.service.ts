import { api } from "../axios-instance"
import { errorHandler } from "../helpers/errorHandler"

export const getStorageLogo = async () => {
    try {
        const response = await api.get("/storage/logo")

        return response.data
    } catch (err) {
        const errorMessage = errorHandler(err)

        throw new Error(errorMessage)
    }
}