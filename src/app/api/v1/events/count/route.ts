import { errorApiCustom } from "@/lib/helpers/errorApiCustom";
import { errorHandler } from "@/lib/helpers/errorHandler";
import { eventsService } from "@/lib/services/events.service";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    try {
        const result = await eventsService.getCount()

        return NextResponse.json(result)
    } catch (err) {
        if(err instanceof errorApiCustom) {
            return NextResponse.json({error: err.message}, {status: err.statusCode})
        }

        const errorMessage = errorHandler(err)
        return NextResponse.json({
            error: errorMessage
        }, {status: 500})
    }
}