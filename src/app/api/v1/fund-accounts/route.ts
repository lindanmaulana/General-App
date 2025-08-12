import { errorHandler } from "@/lib/helpers/errorHandler";
import { FundAccountsService } from "@/lib/services/fundAccounts.service";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    try {
        const result = await FundAccountsService.getAll(req)

        return NextResponse.json(result)
    } catch (err) {
        const errorMessage = errorHandler(err)

        return NextResponse.json({
            error: errorMessage
        }, {status: 404})
    }
}