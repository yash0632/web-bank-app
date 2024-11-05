'use client'

import {RecoilRoot} from "recoil"
import React from "react"
import {SessionProvider} from 'next-auth/react'

export function Provider({children}:{children:React.ReactNode}): React.ReactNode{
    return (
        <RecoilRoot>
            <SessionProvider>
            {children}
            </SessionProvider>
        </RecoilRoot>
    )
}