import { getServerSession } from "next-auth";
import { AuthOptions } from "../lib/auth";
import { redirect } from "next/navigation";






export default async function Home() {
  const session = await getServerSession(AuthOptions)
  
  if(session){
    redirect("/transfer")
  }
  else{
    redirect("/api/auth/signin")
  }
  return(
    <></>
  )
}
