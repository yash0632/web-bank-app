import { AuthOptions } from "../../../lib/auth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(){
    const session = await getServerSession(AuthOptions)
    if (!session) {
        // If there is no session, return a 401 Unauthorized response
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    if(session.user){
        return NextResponse.json({
            user:session.user
        })
    }
    return NextResponse.json({
        message:"you are not logged in"
    },{
        status:403
    })
}