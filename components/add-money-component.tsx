"use client"
import {Card} from '@repo/ui/card'
import { TextInput } from '@repo/ui/text-input'
import { Select } from '@repo/ui/select'
import { useState } from 'react';
import { Button } from '@repo/ui/button';
import createOnProcessTransaction from '../lib/actions/create-process';

const SUPPORTED_BANKS= [{
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com"
}, {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com/"
}];

export default function AddMoneyCard(){
    const [redirectUrl,setRedirectUrl] = useState(SUPPORTED_BANKS[0]?.redirectUrl)
    const [amount,setAmount] = useState(0)
    const [provider,setProvider] = useState(SUPPORTED_BANKS[0]?.name || "")

    return(
    <div>
        <Card title="Add Money">
            <div className='w-full'>
            
                <TextInput label="Amount" placeholder='Amount' onChange={(amount)=>{
                    setAmount(Number(amount))
                }}></TextInput>
                <div className='text-left py-4'>
                    Bank
                </div>
                <Select onSelect={(value)=>{
                    setRedirectUrl(SUPPORTED_BANKS.find((bank)=>bank.name == value)?.redirectUrl || "")
                    setProvider(SUPPORTED_BANKS.find((bank) => bank.name == value)?.name || "")
                }} options={SUPPORTED_BANKS.map(bank=>({
                    key:bank.name,
                    value:bank.name
                }))}></Select>
                <div className='flex justify-center pt-4'>
                    <Button onClick={async()=>{
                        await createOnProcessTransaction(amount,provider)
                        window.location.href=redirectUrl||""
                    }}>
                        Add Money
                    </Button>
                </div>
            
            </div>
        </Card>
    </div>
    )
}