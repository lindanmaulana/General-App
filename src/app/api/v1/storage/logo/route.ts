import { NextRequest, NextResponse } from "next/server";

import { customAPIErrorNextResponse } from "@/lib/helpers/customAPIErrorNextResponse";
import { StorageService } from "@/app/api/_lib/services/storage.service";

export const GET = async (req: NextRequest) => {
        try {
            const result = await StorageService.getLogo()

            return NextResponse.json(result)
        } catch (err) {
            const error = customAPIErrorNextResponse(err)

            return NextResponse.json({error: error.message}, {status: error.statusCode})
        }
}