"use client"

import {Card} from '@repo/ui/card'
import { useState } from 'react'
import { TextInput } from '@repo/ui/text-input'
import { Button } from '@repo/ui/button'
import p2pTransferAction from '../lib/actions/p2ptransfer-action'
export default function P2PTransferCard(){
    const [number,setNumber] = useState("0")
    const [amount,setAmount] = useState(0)
    return(
        <div className='flex flex-col justify-center w-full h-full'>
            <div className='flex justify-center'>
        <Card title="Transfer Money">
            <div>
                <TextInput label="Phone Number" placeholder="123456789" onChange={(number:string)=>{
                    setNumber(number)
                }}></TextInput>
                <TextInput label="Amount" placeholder="0" value={amount} onChange={(amount:string)=>{
                    setAmount(Number(amount))
                }}></TextInput>
                <Button onClick={async()=>{
                    await p2pTransferAction(number,amount*100)
                    alert('payment done')
                    setAmount(0)
                }}>
                    Make Payment
                </Button>
            </div>
        </Card>
        </div>
        </div>
    )
}