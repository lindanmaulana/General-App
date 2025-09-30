import { RESPONSE_MESSAGE } from "@/lib/constants/response-message"
import { customAPIError } from "@/lib/helpers/customAPIError"
import supabase from "@/lib/supabase"
import { typeUploadImageSchema, UploadImageSchema } from "@/lib/validations/images"

export class StorageService {
    static bucketApp = "app_images"

    static async getLogo() {
        const result = await supabase.storage.from(this.bucketApp).list("public/logo", {
            limit: 10,
            offset: 0,
        })

        if(result.error) throw new customAPIError(`${RESPONSE_MESSAGE.error.read} list logo`, 400)

        return result.data
    }

    static async uploadLogo(req: typeUploadImageSchema) {
        const validatedFields = UploadImageSchema.safeParse(req)

        if(validatedFields.error) throw new customAPIError(validatedFields.error.message, 400)

        const file = validatedFields.data.image as File
        const fileName = `${Date.now()}-${file.name}`

        const result = await supabase.storage.from(this.bucketApp).upload(`/public/logo/${fileName}`, file, {
            cacheControl: "3600",
            upsert: false
        })

        console.log({result, validatedFields: validatedFields.data, fileName, file})

        if(result.error) throw new customAPIError(`${RESPONSE_MESSAGE.error.create} upload logo`, 400)

        return result.data
    }
}