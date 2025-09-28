import z from "zod";

export const profileSettingSchema = z.object({
    name: z.string().min(1),
    email: z.email(),
    password: z.string(),
});
export type typeProfileSettingSchema = z.infer<typeof profileSettingSchema>;

// setting system

const ACCEPTED_IMAGE_TYPES = [
    'image/jpeg',
    'image/jpg',
    'image/png'
]

const MAX_FILE_SIZE = 2000000 // 2mb

export const SystemUpdateSettingSchema = z.object({
    app_name: z.string().nonempty({ error: "Nama aplikasi tidak boleh kosong!" }),
    // logo_url: z.string().optional(),
    organization_address: z.string().optional(),
    tagline: z.string().optional(),
    logo_url: z.any().refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), "Image harus bertype jpeg, jpg, png, svg").refine((file) => file.size <= MAX_FILE_SIZE, "Ukuran maksimal 2 mb").optional()
});
export type typeSystemUpdateSettingSchema = z.infer<typeof SystemUpdateSettingSchema>;