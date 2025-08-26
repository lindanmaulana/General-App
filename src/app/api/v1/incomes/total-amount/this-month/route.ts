import { authMiddleware } from '@/app/api/_lib/middleware/auth';
import { incomesService } from '@/app/api/_lib/services/incomes.service';
import { customAPIErrorNextResponse } from '@/lib/helpers/customAPIErrorNextResponse';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
  return authMiddleware(async () => {
    try {
      const result = await incomesService.getTotalThisMonth();

      return NextResponse.json(result);
    } catch (err) {
      const error = customAPIErrorNextResponse(err);

      return NextResponse.json({ error: error.message }, { status: error.statusCode });
    }
  })
};
