import { RESPONSE_MESSAGE } from "@/lib/constants/response-message";
import { customAPIError } from "@/lib/helpers/customAPIError";
import supabase from "@/lib/supabase";
import {
    typePdfDocumentUpdateSettingSchema,
    typeProfileSettingSchema,
    typeSystemUpdateSettingSchema,
} from "@/lib/validations/settings";
import bcrypt from "bcrypt";
import { userService } from "./users.service";

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
    static tableSystem = "system_settings";

    static async get() {
        const result = await supabase.from(this.tableSystem).select("*").limit(1);

        if (result.error) throw new customAPIError(`${RESPONSE_MESSAGE.error.read} system setting`, result.status);

        return result.data[0];
    }

    static async update(req: typeSystemUpdateSettingSchema, id: string) {
        const docSystem = await this.checkSystem(id);

        const result = await supabase.from(this.tableSystem).update(req).eq("id", docSystem.id).single();

        if (result.error) throw new customAPIError(`${RESPONSE_MESSAGE.error.update} system setting`, result.status);

        return result.data;
    }

    static async checkSystem(id: string) {
        const result = await supabase.from(this.tableSystem).select("*").eq("id", id).single();

        if (result.error) throw new customAPIError(`${RESPONSE_MESSAGE.error.read} system settings`, result.status);

        return result.data;
    }
}

export class PdfDocumentSettingService {
    static tablePdfDocument = "pdf_document_settings";

    static async get() {
        const result = await supabase.from(this.tablePdfDocument).select("*").limit(1);

        if (result.error)
            throw new customAPIError(`${RESPONSE_MESSAGE.error.read} pdf document setting`, result.status);

        return result.data[0];
    }

    static async update(req: typePdfDocumentUpdateSettingSchema, id: string) {
        const docPdfDocument = await this.checkPdfDocument(id);

        const result = await supabase.from(this.tablePdfDocument).update(req).eq("id", docPdfDocument.id).single();

        if (result.error) throw new customAPIError(`${RESPONSE_MESSAGE.error.update} system setting`, result.status);

        return result.data;
    }

    static async checkPdfDocument(id: string) {
        const result = await supabase.from(this.tablePdfDocument).select("*").eq("id", id).single();

        if (result.error) throw new customAPIError(`${RESPONSE_MESSAGE.error.read} system settings`, result.status);

        return result.data;
    }
}
