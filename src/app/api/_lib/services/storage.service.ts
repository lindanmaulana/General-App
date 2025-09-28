import { RESPONSE_MESSAGE } from "@/lib/constants/response-message"
import { customAPIError } from "@/lib/helpers/customAPIError"
import supabase from "@/lib/supabase"

export class StorageService {
    static bucketApp = "app_images"

    static async getLogo() {
        const result = await supabase.storage.from(this.bucketApp).list("public/logo", {
            limit: 10,
            offset: 0,
        })

        if(result.error) throw new customAPIError(`${RESPONSE_MESSAGE.error.read} list logo`, 401)

        return result.data
    }
}

// https://ioehpysldibnjemrnfch.supabase.co/storage/v1/object/public/app_images/public/logo/general.png