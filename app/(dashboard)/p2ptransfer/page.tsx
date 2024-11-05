import P2PTransactionCard from "../../../components/p2ptransactioncard";
import P2PTransferCard from "../../../components/p2ptransfer-card";

export default async function(){
    return(
        <div className="grid grid-cols-2 gap-4 w-full h-full">
            <div>
                <P2PTransferCard/>
            </div>
            <div>
                <P2PTransactionCard/>
            </div>
        </div>
        
    )
}