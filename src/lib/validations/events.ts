import z from 'zod';
import { STATUS_EVENT } from '../constants/status-events';

export type TypeFieldEvents = 'code' | 'name' | 'description' | 'date' | 'status' | 'budget' | 'is_public';

export const eventsSchema = z.object({
  code: z.string({ error: 'Kode event tidak boleh kosong!' }).regex(/^[A-Z]{3}-[0-9]{3}$/, 'Format kode harus [XXX-111]'),
  name: z.string().min(1, 'Nama event tidak boleh kosong'),
  description: z.string().optional(),
  date: z.string().optional(),
  status: z.enum(STATUS_EVENT),
  budget: z.string().optional(),
  is_public: z.boolean().nullable(),
});

export type TypeEventsSchema = z.infer<typeof eventsSchema>;
