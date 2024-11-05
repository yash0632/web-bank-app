"use server"
import {PrismaClient} from '@repo/db/client'
import { getServerSession } from 'next-auth'
import { AuthOptions } from '../auth'

export default async function p2pTransferAction(
    number:string,
    amount:number
){
    try{
    const session = await getServerSession(AuthOptions)
    const userId =Number(session?.user?.id)
    const prisma = new PrismaClient()
    await prisma.$transaction(async(tx)=>{

        const from:any= await tx.$queryRaw`SELECT * FROM "balances" WHERE "userId" = ${userId} FOR UPDATE`
        
        
        if(from == undefined){
            throw new Error('from undefined')
        }
        if(from?.amount < amount){
            throw new Error("Unsufficient Funds")
        }

        const to = await tx.user.findFirst({
            where:{
                number:number
            }
        })
        if(to == undefined){
            throw new Error(`user with phone number ${number} not found`)
        }

        await tx.balance.update({
            where:{
                userId:userId
            },
            data:{
                amount:{
                    decrement: amount
                }
            }
        })

        await tx.balance.update({
            where:{
                userId:to.id
            },
            data:{
                amount:{
                    increment: amount
                }
            }
        })

        await tx.p2PTransaction.create({
            data:{
                fromUserId:userId,
                toUserId:to.id,
                amount:amount,
                transactionTime:new Date(),
            }
        })
    })
    }
    catch(err:any){
        console.log("error : ",err.message)
    }
}

//check amount <= userbalance
//reduce user balance
//transaction user 
//increase number balance
//transaction number