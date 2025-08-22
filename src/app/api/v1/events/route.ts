import { errorApiCatch } from "@/lib/helpers/errorApiCatch";
import { eventsService } from "@/lib/services/events.service";
import { NextRequest, NextResponse } from "next/server";
import { authMiddleware } from "../../_lib/middleware/auth";

export const GET = async (req: NextRequest) => {
    return authMiddleware(async () => {
        try {
            const result = await eventsService.getAll(req)

            return NextResponse.json(result)
        } catch (err) {
            const error = errorApiCatch(err)

            return NextResponse.json({error: error.message}, {status: error.statusCode})
        }
    })
}