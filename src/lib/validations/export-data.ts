import z from 'zod';

const dateFileSchema = z.object({
  start_date: z.string(),
  end_date: z.string(),
});

const categoryDataSchema = z.object({
  incomes: z.boolean(),
  expenses: z.boolean(),
});

export const exportDataCustomSchema = z.object({
  date_file: dateFileSchema,
  category_data: categoryDataSchema,
  events: z.string().array(),
});

export type typeExportDataCustomSchema = z.infer<typeof exportDataCustomSchema>;