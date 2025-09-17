import { api } from "../axios-instance";
import { errorHandler } from "../helpers/errorHandler";
import { typeExportDataCustomSchema } from "../validations/export-data";


export const PostExportDataCustom = async (req: typeExportDataCustomSchema) => {
    try {
        const response = await api.post(`/export-data/custom`, req)

        return response.data
    } catch (err) {
        const errorMessage = errorHandler(err)

        throw new Error(errorMessage)
    }
}