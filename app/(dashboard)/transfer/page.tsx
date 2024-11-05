import { getServerSession } from "next-auth"
import { AuthOptions } from "../../../lib/auth"
import { PrismaClient }  from "@repo/db/client"
import AddMoneyCard from "../../../components/add-money-component"
import BalanceCard from "../../../components/balance-component"
import OnRampTransactions from "../../../components/recent-transactions"


export default async function(){
    
    
    const userBalance = await getBalance()
    const userTransactions = await getTransactions()

    
    

    return (
        <div className="grid grid-cols-2 w-full h-full">
            <div><AddMoneyCard></AddMoneyCard></div>
            <div className="grid grid-rows-2 w-full h-full gap-2">
                <div>
                    <BalanceCard
                        amount={userBalance?.amount}
                        locked={userBalance?.locked}
                    ></BalanceCard>
                </div>
                <div>
                    <OnRampTransactions
                        transactions={userTransactions}
                    ></OnRampTransactions>
                </div>
            </div>
        </div>
    )
}


async function  getBalance(){
    const prisma = new PrismaClient()
    const session = await getServerSession(AuthOptions)
    
    const userBalance = await prisma.balance.findFirst({
        where:{
            userId:Number(session?.user?.id)
        }
    })
    return {
        amount:userBalance?.amount || 0,
        locked:userBalance?.locked || 0

    }
    
    
}

async function getTransactions(){
    const prisma = new PrismaClient()
    const session = await getServerSession(AuthOptions)
    
    const userTransactions = await prisma.onRampTransaction.findMany({
        where:{
            userId:Number(session?.user?.id)
        }
    })
    return userTransactions.map((transaction)=>({
        amount:transaction.amount,
        provider:transaction.provider,
        time:transaction.transactionTime,
        status:transaction.status
    }))
    
    
}