import { userService } from "@/app/api/_lib/services/users.service";
import { customAPIErrorNextResponse } from "@/lib/helpers/customAPIErrorNextResponse";
import { NextRequest, NextResponse } from "next/server";

interface UserProfileParams {
    params: {
        id: string
    }
}
export const GET = async (req: NextRequest, params: UserProfileParams) => {
    try {
        const {id} = await params.params

        const result = await userService.getOne(id)

        return NextResponse.json(result)
    } catch (err) {
        const error = customAPIErrorNextResponse(err)

        return NextResponse.json({error: error.message}, {status: error.statusCode})
    }
}