import z from "zod";

export const profileSettingSchema = z.object({
    name: z.string().min(1),
    email: z.email(),
    password: z.string(),
});
export type typeProfileSettingSchema = z.infer<typeof profileSettingSchema>;

// setting system
export const SystemUpdateSettingSchema = z.object({
    app_name: z.string().nonempty({ error: "Nama aplikasi tidak boleh kosong!" }),
    logo_url: z.string().optional(),
    organization_address: z.string().optional(),
    tagline: z.string().optional(),
});
export type typeSystemUpdateSettingSchema = z.infer<typeof SystemUpdateSettingSchema>;