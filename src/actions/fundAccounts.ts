'use server';

import { errorHandler } from '@/lib/helpers/errorHandler';
import { fundAccounts } from '@/lib/models/fund-accounts';
import { fundAccountsService } from '@/lib/services/fund-accounts.service';
import { fundAccountsCreateSchema, fundAccountsUpdateSchema, TypeFundAccountsCreateSchema, TypeFundAccountsUpdateSchema } from '@/lib/validations/fund-accounts';

export const createFundAccounts = async (req: TypeFundAccountsCreateSchema): Promise<fundAccounts> => {
  const validatedFields = fundAccountsCreateSchema.safeParse(req);

  if (!validatedFields.success) throw new Error('Validation Invalid');

  const is_active = validatedFields.data.is_active === '1' ? true : false;

  try {
    const result = await fundAccountsService.create({ ...validatedFields.data, is_active });

    return result;
  } catch (err) {
    const errorMessage = errorHandler(err);

    throw new Error(errorMessage);
  }
};

export const updateFundAccounts = async (req: TypeFundAccountsUpdateSchema, id: string): Promise<fundAccounts> => {
  const validatedFields = fundAccountsUpdateSchema.safeParse(req);

  if (validatedFields.error) throw new Error('Validation invalid');

  const is_active = validatedFields.data.is_active === '1' ? true : false;

  try {
    const result = await fundAccountsService.update({ ...validatedFields.data, is_active }, id);

    return result.data;
  } catch (err) {
    const errorMessage = errorHandler(err);

    throw new Error(errorMessage);
  }
};

export const deleteFundAccounts = async (id: string): Promise<fundAccounts> => {
    try {
        const result = await fundAccountsService.delete(id)

        return result
    } catch (err) {
        const errorMessage = errorHandler(err)
        throw new Error(errorMessage)
    }
}