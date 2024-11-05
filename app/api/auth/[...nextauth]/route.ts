import { AuthOptions } from "../../../../lib/auth";
import NextAuth from "next-auth";
import { NextRequest, NextResponse } from "next/server";

const handler = NextAuth(AuthOptions)

export async function GET(req:NextRequest,res:NextResponse){
    return handler(req,res)
}

export async function POST(req:NextRequest,res:NextResponse){
    return handler(req,res)
}

