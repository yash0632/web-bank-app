import { Card } from "@repo/ui/card"

interface TransactionProps{
    amount:number,
    time:Date,
    status:string,
    provider:string
}
enum OnRampStatus{
    Success,
    Failure,
    Pending
}

export default function OnRampTransactions({transactions}:{transactions:TransactionProps[]}){
    if(!transactions.length){
        return <Card title="Recent Transactions">
            <div className="text-sm flex justify-center w-full items-center font-semibold">
                No Recent Transactions
            </div>
        </Card>
    }
    return (
        <Card title="Recent Transactions">
            <div>
                {transactions.map(transaction=>(
                    <div className="flex justify-between border-b border-slate-300 pb-2">
                        <div>
                            <div className="text-sm">Received INR</div>
                            <div className="text-slate-600 tezt-xs">{transaction.time.toDateString()}</div>
                        </div>
                        <div>
                            <div>+ Rs {transaction.amount/100}</div>
                            <div className="text-slate-600 tezt-xs">{transaction.status}</div>
                        </div>

                    </div>
                ))}
            </div>

        </Card>
    )
}