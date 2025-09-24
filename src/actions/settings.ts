"use server"

import { settingService } from "@/app/api/_lib/services/settings.service";
import { errorHandler } from "@/lib/helpers/errorHandler";
import { brandSystemSettingSchema, profileSettingSchema, typeBrandSystemSettingSchema, type typeProfileSettingSchema } from "@/lib/validations/settings";

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

export const brandSystemSetting = async (req: typeBrandSystemSettingSchema) => {
    const validatedFields = brandSystemSettingSchema.safeParse(req)

    if(validatedFields.error) throw new Error("Validation Invalid")

    try {
        // const result = await 
    } catch (err) {
        
    }
}