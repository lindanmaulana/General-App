"use server"

import { settingService, SystemSettingService } from "@/app/api/_lib/services/settings.service";
import { errorHandler } from "@/lib/helpers/errorHandler";
import { profileSettingSchema, typeSystemUpdateSettingSchema, type typeProfileSettingSchema } from "@/lib/validations/settings";

export const profileSetting = async (req: typeProfileSettingSchema, id: string) => {
    const validatedFields = profileSettingSchema.safeParse(req)

    if(validatedFields.error) throw new Error("Validation Invalid")

    try {
        const result = await settingService.profile(validatedFields.data, id)

        return result
    } catch (err) {
        const errorMessage = errorHandler(err)

        throw new Error(errorMessage)
    }
}

export const updateSystemSetting = async (req: typeSystemUpdateSettingSchema, id: string) => {
    try {
        const result = await SystemSettingService.update(req, id)

        return result
    } catch (err) {
        const errorMessage = errorHandler(err)

        throw new Error(errorMessage)
    }
}