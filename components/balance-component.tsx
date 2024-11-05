import { Card } from "@repo/ui/card";

export default function BalanceCard({
    amount,
    locked
}:{
    amount:number,
    locked:number
}){
    return(
        <Card title="Balance">
            <div className="w-full flex-col justify-evenly">
                
                <div className="flex border-b border-slate-300 pb-2 justify-between">
                    <div >Unlocked Balance</div>
                    <div >
                        {amount/100}
                    </div>
                </div>
                
                <div className="flex border-b border-slate-300 pb-2 justify-between">
                    <div >Total Locked Balance</div>
                    <div >
                        {locked/100}
                    </div>
                </div>
                
                <div className="flex border-b border-slate-300 pb-2 justify-between">
                    <div >Total Balance</div>
                    <div >
                        {(amount+locked)/100}
                    </div>
                </div>
                
            </div>
        </Card>
    )
}