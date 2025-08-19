import { errorApiCatch } from "@/lib/helpers/errorApiCatch";
import { incomesService } from "@/lib/services/incomes.service";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    try {
        const result = await incomesService.getTotalAmountThisMonth()

        return NextResponse.json(result)
    } catch (err) {
        const error = errorApiCatch(err)

        return NextResponse.json({error: error.message}, {status: error.statusCode})
    }
}