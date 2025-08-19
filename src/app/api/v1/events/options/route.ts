import { errorApiCatch } from "@/lib/helpers/errorApiCatch";
import { eventsService } from "@/lib/services/events.service";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    try {
        const result = await eventsService.getAllOptions()

        return NextResponse.json(result)
    } catch (err) {
        const error = errorApiCatch(err)

        return NextResponse.json({error: error.message}, {status: error.statusCode})
    }
}