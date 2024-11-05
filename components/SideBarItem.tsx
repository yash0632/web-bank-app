"use client"

import {useRouter,usePathname} from 'next/navigation'
import path from 'path'

export default function SideBar(
    {
        title,
        href,
        icon
    }:{
        title:string,
        href:string,
        icon:React.ReactNode
    }
){
    const router = useRouter()
    const pathName = usePathname()

    const selected = pathName === href
    return(
        <div className={`flex ${selected?"text-[#6a51a6]" : "text-slate-500"} cursor-pointer p-2 pl-8`} onClick={()=>{
            router.replace(href)
        }}>
            <div className='pr-2'>
                {icon}
            </div>
            <div className={`font-bold`}>
                {title}
            </div>
        </div>
    )
}