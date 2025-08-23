'use server';

import { errorHandler } from '@/lib/helpers/errorHandler';
import { expenses } from '@/app/api/_lib/models/expenses';
import { expensesService } from '@/app/api/_lib/services/expenses.service';
import { expensesSchema, TypeExpensesSchema } from '@/lib/validations/expenses';

export const createExpenses = async (req: TypeExpensesSchema): Promise<expenses> => {
  const validatedFields = expensesSchema.safeParse(req);

  if (!validatedFields.success) throw new Error('Validation invalid');

  const date = validatedFields.data.date ? new Date(validatedFields.data.date) : undefined;
  const amount = Number(validatedFields.data.amount);
  try {
    const result = await expensesService.create({ ...validatedFields.data, date, amount });

    return result;
  } catch (err) {
    const errorMessage = errorHandler(err);

    throw new Error(errorMessage);
  }
};

export const updateExpenses = async (req: TypeExpensesSchema, id: string): Promise<expenses> => {
  const validatedFields = expensesSchema.safeParse(req);

  if (validatedFields.error) throw new Error('Validation invalid');

  try {
    const result = await expensesService.update(validatedFields.data, id);

    return result;
  } catch (err) {
    const errorMessage = errorHandler(err);

    throw new Error(errorMessage);
  }
};

export const deleteExpenses = async (id: string): Promise<expenses> => {
  try {
    const result = await expensesService.delete(id);

    return result;
  } catch (err) {
    const errorMessage = errorHandler(err);

    throw new Error(errorMessage);
  }
};
