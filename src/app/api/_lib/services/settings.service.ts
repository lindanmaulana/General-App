import { typeAppearanceSystemSettingSchema, typeBrandSystemSettingSchema, typeProfileSettingSchema } from "@/lib/validations/settings";
import { userService } from "./users.service";
import bcrypt from "bcrypt";
import supabase from "@/lib/supabase";
import { customAPIError } from "@/lib/helpers/customAPIError";
import { RESPONSE_MESSAGE } from "@/lib/constants/response-message";

export class settingService {
    static tableProfile = "users";

    static async profile(req: typeProfileSettingSchema, id: string) {
        const checkUser = await userService.checkingUser(id);

        const updateProfile: Partial<typeProfileSettingSchema> = {};

        if (req.name) updateProfile.name = req.name;

        if (req.email) {
            await userService.checkingDuplicateEmail(req.email, checkUser.id);

            updateProfile.email = req.email;
        }

        if (req.password && checkUser.password) {
            const isSamePassword = await bcrypt.compare(req.password, checkUser.password);

            if (!isSamePassword) updateProfile.password = await bcrypt.hash(req.password, 10);
        }

        if (Object.keys(updateProfile).length === 0) throw new Error("No changes detected!");

        const result = await supabase.from(this.tableProfile).update(updateProfile).eq("id", checkUser.id).select();

        if (result.error) throw new Error("Gagal memperbarui profile anda");

        return result.data;
    }
}

export class SystemSettingService {
    // branding
    static tableBranding = "branding_settings";

    static async getBranding() {
        const result = await supabase.from(this.tableBranding).select("*").limit(1);

        if (result.error) throw new customAPIError(`${RESPONSE_MESSAGE.error.read} branding setting`, result.status);

        return result.data[0]
    }

    static async updateBranding(req: typeBrandSystemSettingSchema, id: string) {
        const docBranding = await this.checkBranding(id);

        const result = await supabase.from(this.tableBranding).update(req).eq("id", docBranding.id).single();

        if (result.error) throw new customAPIError(`${RESPONSE_MESSAGE.error.update} branding setting`, result.status);

        return result.data;
    }

    static async checkBranding(id: string) {
        const result = await supabase.from(this.tableBranding).select("*").eq("id", id).single();

        if (result.error) throw new customAPIError(`${RESPONSE_MESSAGE.error.read} branding settings`, result.status);

        return result.data;
    }


    // appearance
    static tableAppearance = "appearance_settings"

    static async getAppearance() {
        const result = await supabase.from(this.tableAppearance).select("*").limit(1)

        if (result.error) throw new customAPIError(`${RESPONSE_MESSAGE.error.read} appearance setting`, result.status);

        return result.data[0]
    }

    static async updateAppearance(req: typeAppearanceSystemSettingSchema, id: string) {
        const docAppearance = await this.checkAppearance(id)

        const result = await supabase.from(this.tableAppearance).update(req).eq("id", docAppearance.id).single()

        if (result.error) throw new customAPIError(`${RESPONSE_MESSAGE.error.update} appearance setting`, result.status);

        return result.data
    }

    static async checkAppearance(id: string) {
        const result = await supabase.from(this.tableAppearance).select("*").eq("id", id).single()

        if (result.error) throw new customAPIError(`${RESPONSE_MESSAGE.error.read} appearance notfound`, result.status);

        return result.data
    }
}