import { authMiddleware } from "@/app/api/_lib/middleware/auth";
import { ExportDataService } from "@/app/api/_lib/services/export-data.service";
import { customAPIErrorNextResponse } from "@/lib/helpers/customAPIErrorNextResponse";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    // return authMiddleware(async () => {
        try {
            const reqBody = await req.json()
            const result = await ExportDataService.custom(reqBody)

            return NextResponse.json(result)
        } catch (err) {
            const error = customAPIErrorNextResponse(err)

            return NextResponse.json({error: error.message}, {status: error.statusCode})
        }
    // })
}