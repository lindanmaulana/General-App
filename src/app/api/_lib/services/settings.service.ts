import { typeProfileSettingSchema } from "@/lib/validations/settings";
import { userService } from "./users.service";
import bcrypt from "bcrypt"
import supabase from "@/lib/supabase";

export class settingService {
    static tableProfile = "users"

    static async profile(req: typeProfileSettingSchema, id: string) {
        const checkUser = await userService.checkingUser(id)

        const updateProfile: Partial<typeProfileSettingSchema> = {}

        if(req.name) updateProfile.name = req.name

        if(req.email) {
            await userService.checkingDuplicateEmail(req.email, checkUser.id)

            updateProfile.email = req.email
        }

        if(req.password && checkUser.password) {
            const isSamePassword = await bcrypt.compare(req.password, checkUser.password)

            if(!isSamePassword) updateProfile.password = await bcrypt.hash(req.password, 10)
        }

        if(Object.keys(updateProfile).length === 0) throw new Error("No changes detected!")

        const result = await supabase.from(this.tableProfile).update(updateProfile).eq("id", checkUser.id).select()

        if(result.error) throw new Error("Gagal memperbarui profile anda")

        return result.data
    }
}