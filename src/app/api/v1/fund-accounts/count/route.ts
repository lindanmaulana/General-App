import { errorHandler } from '@/lib/helpers/errorHandler';
import { fundAccountsService } from '@/lib/services/fund-accounts.service';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
  try {
    const result = await fundAccountsService.getAllIsActive();

    return NextResponse.json(result);
  } catch (err) {
    const errorMessage = errorHandler(err);

    return NextResponse.json(
      {
        error: errorMessage,
      },
      { status: 404 }
    );
  }
};
