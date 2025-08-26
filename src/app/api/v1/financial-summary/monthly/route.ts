import { authMiddleware } from "@/app/api/_lib/middleware/auth";
import { financialSummaryService } from "@/app/api/_lib/services/financial-summary.service";
import { customAPIErrorNextResponse } from "@/lib/helpers/customAPIErrorNextResponse";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    return authMiddleware(async () => {
        try {
            const result = await financialSummaryService.getMonthly()

            return NextResponse.json(result)
        } catch (err) {
            const error = customAPIErrorNextResponse(err)

            return NextResponse.json({error: error.message}, {status: error.statusCode})
        }
    })
}