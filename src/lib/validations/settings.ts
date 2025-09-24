import z from 'zod';

export const profileSettingSchema = z.object({
  name: z.string().min(1),
  email: z.email(),
  password: z.string(),
});
export type typeProfileSettingSchema = z.infer<typeof profileSettingSchema>


// setting system
export const brandSystemSettingSchema = z.object({
  appName: z.string().nonempty({error: "Nama aplikasi tidak boleh kosong!"}),
  logoUrl: z.string().optional(),
  organizationAddress: z.string().optional(),
  tagline: z.string().optional(),
})

export type typeBrandSystemSettingSchema = z.infer<typeof brandSystemSettingSchema>

export const appearanceSystemSettingSchema = z.object({
  welcomeMessageLogin: z.string().nonempty({error: "Pesan selamat datang di login tidak boleh kosong!"}),
  welcomeMessageDashboard: z.string().nonempty({error: "Pesan selamat datang di dashboard tidak boleh kosong!"}),
})
export type typeAppearanceSystemSettingSchema = z.infer<typeof appearanceSystemSettingSchema>


export const SystemSettingSchema = z.object({
  appName: z.string().nonempty({error: "Nama aplikasi tidak boleh kosong!"}),
  logoUrl: z.string().optional(),
  organizationAddress: z.string().optional(),
  tagline: z.string().optional(),
  welcomeMessageLogin: z.string().nonempty({error: "Pesan selamat datang di login tidak boleh kosong!"}),
  welcomeMessageDashboard: z.string().nonempty({error: "Pesan selamat datang di dashboard tidak boleh kosong!"}),
})

export type typeSystemSettingSchema = z.infer<typeof SystemSettingSchema>