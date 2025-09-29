import z, { ZodType } from "zod";

const ACCEPTED_IMAGE_TYPES = [
    'image/jpeg',
    'image/jpg',
    'image/png'
]

const MAX_FILE_SIZE = 2000000 // 2mb

const imageSchema: ZodType = z.instanceof(File).refine(file => !!file, "File harus di isi")
.refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), "Hanya file JPEG, JPG, atau PNG yang di perbolehkan")
.refine((file) => file.size <= MAX_FILE_SIZE, "Ukuran file maksimal 2MB")

export const UploadImageSchema = z.object({
    image: imageSchema
});
export type typeUploadImageSchema = z.infer<typeof UploadImageSchema>;