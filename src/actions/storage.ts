"use server"

import { StorageService } from "@/app/api/_lib/services/storage.service"
import { errorHandler } from "@/lib/helpers/errorHandler"
import { typeUploadImageSchema } from "@/lib/validations/images"

export const uploadLogoStorage = async (req: typeUploadImageSchema) => {
    try {
        const result = await StorageService.uploadLogo(req)

        return result
    } catch (err) {
        const errorMessage = errorHandler(err)

        throw new Error(errorMessage)
    }
}