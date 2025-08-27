import z from 'zod';

export const profileSettingSchema = z.object({
  name: z.string().min(1),
  email: z.email(),
  password: z.string(),
});
export type typeProfileSettingSchema = z.infer<typeof profileSettingSchema>
