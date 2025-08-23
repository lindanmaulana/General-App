import { eventsService } from '@/app/api/_lib/services/events.service';
import { customAPIErrorNextResponse } from '@/lib/helpers/customAPIErrorNextResponse';
import { NextRequest, NextResponse } from 'next/server';
import { authMiddleware } from '../../_lib/middleware/auth';

export const GET = async (req: NextRequest) => {
  return authMiddleware(async () => {
    try {
      const result = await eventsService.getAll(req);

      return NextResponse.json(result);
    } catch (err) {
      const error = customAPIErrorNextResponse(err);

      return NextResponse.json({ error: error.message }, { status: error.statusCode });
    }
  });
};
