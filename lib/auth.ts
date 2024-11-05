import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt"
import { PrismaClient } from "@repo/db/client"
const prisma = new PrismaClient()

export const AuthOptions = {
    providers: [
        CredentialsProvider({
            name:'Credentials',
            credentials:{
                phone:{label:"phone number",type:"text",placeholder:"1231231231"},
                password:{label:"Password",type:"password"}
            },
            async authorize(credentials:any){
                if(credentials == undefined)return null;
                const hashedPassword = await bcrypt.hash(credentials.password,10)

                const existingUser = await prisma.user.findFirst({
                    where:{
                        number : credentials.phone
                    }
                })
                if(existingUser){
                    const checkPass = await bcrypt.compare(credentials.password,existingUser.password)
                    if (checkPass){
                        return {
                            id:existingUser.id,
                            email:existingUser.email,
                            name:existingUser.name
                        }
                    }
                    return null;

                }


                try{
                    const user = await prisma.user.create({
                        data:{
                            number:credentials.phone,
                            password:hashedPassword
                        }
                    })

                    return {
                        id:user.id.toString(),
                        name:user.name,
                        email:user.number,
                        
                    }
                }
                catch(e){
                    console.error(e)
                }
                return null;
                
            }
        })
    ],
    secret:process.env.JWT_SECRET || "secret",
    callbacks:{
        session:async({token,session}:any)=>{
            
            session.user.id = token.sub;
            
           
            return session;
        }
    }
}