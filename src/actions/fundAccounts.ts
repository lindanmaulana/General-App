'use server';

import { errorHandler } from '@/lib/helpers/errorHandler';
import { FundAccounts } from '@/lib/models/fund-accounts';
import { fundAccountsService } from '@/lib/services/fund-accounts.service';
import { fundAccountsCreateSchema, fundAccountsUpdateSchema, TypeFundAccountsCreateSchema, TypeFundAccountsUpdateSchema } from '@/lib/validations/fund-accounts';

export const createFundAccounts = async (req: TypeFundAccountsCreateSchema): Promise<FundAccounts> => {
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

export const updateFundAccounts = async (req: TypeFundAccountsUpdateSchema, id: string): Promise<FundAccounts> => {
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

export const deleteFundAccounts = async (id: string): Promise<FundAccounts> => {
    try {
        const result = await fundAccountsService.delete(id)

        return result.data
    } catch (err) {
        const errorMessage = errorHandler(err)
        throw new Error(errorMessage)
    }
}


//   id varchar [primary key]
//   code varchar [unique]
//   name varchar
//   description text
//   date date
//   status status_event [default: "SCHEDULED"]
//   budget decimal [default: 0]
//   is_public boolean [default: false]
//   created_at timestamp
//   updated_at timestamp

//   SCHEDULED
//   RUNNING
//   COMPLETED
//   CANCELLED
