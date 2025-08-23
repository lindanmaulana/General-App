'use server';

import { errorHandler } from '@/lib/helpers/errorHandler';
import { incomes } from '@/app/api/_lib/models/incomes';
import { incomesService } from '@/app/api/_lib/services/incomes.service';
import { incomesShcema, TypeIncomesSchema } from '@/lib/validations/incomes';

export const createIncomes = async (req: TypeIncomesSchema): Promise<incomes> => {
  const validatedFields = incomesShcema.safeParse(req);

  if (!validatedFields.success) throw new Error('Validation invalid');

  const date = validatedFields.data.date ? new Date(validatedFields.data.date) : undefined;
  const amount = Number(validatedFields.data.amount);
  try {
    const result = await incomesService.create({ ...validatedFields.data, date, amount });

    return result;
  } catch (err) {
    const errorMessage = errorHandler(err);

    throw new Error(errorMessage);
  }
};

export const updateIncomes = async (req: TypeIncomesSchema, id: string): Promise<incomes> => {
  const validatedFields = incomesShcema.safeParse(req);

  if (validatedFields.error) throw new Error('Validation invalid');

  try {
    const result = await incomesService.update(validatedFields.data, id);

    return result;
  } catch (err) {
    const errorMessage = errorHandler(err);

    throw new Error(errorMessage);
  }
};

export const deleteIncomes = async (id: string): Promise<incomes> => {
  try {
    const result = await incomesService.delete(id);

    return result;
  } catch (err) {
    const errorMessage = errorHandler(err);

    throw new Error(errorMessage);
  }
};
