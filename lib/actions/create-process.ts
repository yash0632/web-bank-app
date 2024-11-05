"use server"
import { getServerSession } from "next-auth";
import { AuthOptions } from "../auth";
import { PrismaClient } from "@repo/db/client";

export default async function createOnProcessTransaction(
   amount:number,
   provider:string
){
    const session = await getServerSession(AuthOptions)
    const userId = Number(session?.user?.id)
    const prisma = new PrismaClient()
    const token = Math.random().toString()
    return await prisma.onRampTransaction.create({
        data:{
            amount:amount,
            provider:provider,
            transactionTime:new Date(),
            status:"Pending",
            token:token,
            userId:userId
        }
    })

}