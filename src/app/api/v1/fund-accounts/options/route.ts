import { fundAccountsService } from '@/app/api/_lib/services/fund-accounts.service';
import { customAPIErrorNextResponse } from '@/lib/helpers/customAPIErrorNextResponse';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
  try {
    const result = await fundAccountsService.getAllOptions();

    return NextResponse.json(result);
  } catch (err) {
    const error = customAPIErrorNextResponse(err);

    return NextResponse.json({ error: error.message }, { status: error.statusCode });
  }
};
