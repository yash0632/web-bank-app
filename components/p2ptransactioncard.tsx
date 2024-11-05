
import { getServerSession } from "next-auth";
import { AuthOptions } from "../lib/auth";
import { PrismaClient } from "@repo/db/client";
import { Card } from "@repo/ui/card";

interface transactionProps {
    amount:number,
    toUserName:string,
    toUserPhone:string,
    time:Date,
    fromUserId:number,
    toUserId:number,
    fromUserPhone:string,
    fromUserName:string
}


export default async function P2PTransactionCard(){
    const session = await getServerSession(AuthOptions)
    const userId = Number(session?.user?.id)
    const transactions : transactionProps[] = await getP2PTransactions()
    if(transactions.length == 0){
        return(
            <Card title="Recent Transactions">
                    <div className="text-center flex items-center w-full">
                        No Recent Transactions
                    </div>
            </Card>
        )
    }
    else{
        return(
            <div className="w-full h-full flex justify-center items-center">
                <Card title="Recent Transactions">
                    
                    <div className="w-full">
                        {transactions.map(transaction=>(
                            <div className="flex justify-between w-full border-b border-slate-300">
                                <div>
                                    <div>{userId == transaction.fromUserId ? transaction.toUserName:transaction.fromUserName}</div>
                                    <div>{userId == transaction.fromUserId ? transaction.toUserPhone:transaction.fromUserPhone}</div>
                                </div>
                                <div>
                                    <div>{userId == transaction.fromUserId ? "-"+(transaction.amount)/100:"+"+(transaction.amount)/100}</div>
                                    <div>{userId == transaction.fromUserId ? "Send":"Received"}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                    

                </Card>
            </div>
        )
    }
}

//Name       +200/-200
//Number     Received/Send


async function getP2PTransactions(){
    const session = await getServerSession(AuthOptions)
    const userId = Number(session?.user?.id)
    const prisma = new PrismaClient()
    const transactions = await prisma.p2PTransaction.findMany({
        where:{
            OR:[
                {
                    fromUserId:userId
                },
                {
                    toUserId:userId
                }
            ]
        },
        select:{
            amount:true,
            toUser:{
                select:{
                    name:true,
                    number:true
                }
            },
            transactionTime:true,
            fromUserId:true,
            toUserId:true,
            fromUser:{
                select:{
                    number:true,
                    name:true
                }
            }
            
        }
    })

    return transactions.map((transaction)=>(
        {
            amount:transaction.amount,
            toUserName:transaction.toUser?.name || "",
            toUserPhone:transaction.toUser.number,
            time:transaction.transactionTime,
            fromUserId:transaction.fromUserId,
            toUserId:transaction.toUserId,
            fromUserPhone:transaction.fromUser.number,
            fromUserName:transaction.fromUser.name || ""
        }
    ))
}

//