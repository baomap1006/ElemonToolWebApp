
import { any, nullable, string, z } from 'zod';
import {prisma} from '../../db/client'
import { createRouter } from './context';
import firebase from "firebase/compat/app";
import * as trpc from '@trpc/server';
import {MarketUsers} from '@prisma/client'
import {Context } from '../../pages/api/trpc/[trpc]'
let t = z.object({
    uid: z.string(),
    email: z.string(),
    displayName: z.string(),
    walletAddress: z.string().default(""),
    status: z.boolean().default(false),
})

async function updateCooke(id:string,token:string){
    await prisma.marketUsers.update({
        where:{
            id:id,
        },
        data:{
            cookie:token
        }})
}

export const marketUserRouter = trpc.router<Context>().query(".getByID",{
// export const marketUserRouter = createRouter().query(".getByID",{
    input:t     ,
    async resolve({ input ,ctx}){
        let info:MarketUsers|null =null
        try{
            info = await prisma.marketUsers.upsert({
                
                where:{ 
                    uId:input.uid
                },
                update:{
                    name:input.displayName
                },
                create:{
                    uId:input.uid,
                    name:input.displayName,
                    walletAddress:input.walletAddress,
                    status:input.status,
                    email:input.email,
                    cookie:""
                }
            })
            // check if authorized and need to update cookie
            if(info.status==true && info.cookie!= ctx.token){
                await updateCooke(info.id,ctx.token?ctx.token:"")            
            }else if(info.status==false ){
                console.log("Not authorize to update cookie")
                if(info.cookie !=null || info.cookie!= "") await updateCooke(info.id,"")
            }

        }catch(err){
            console.log(err)
        }
        return prisma.marketUsers.findUnique({where:{id:info!.id}});
        
        // console.log(ctx)
    }
})
.query(".getAllUsers",{
    
    async resolve({ctx}){
        console.log("testToken",ctx.token)
        const info = await prisma.marketUsers.findMany();
        return {info,ctx}
    }
})
// .query(".getByWallet",{
//     // input:z.object({})).nullish(),
//     input:z.object({wallet:z.string().nullish()}),
//     async resolve({input,ctx}){
//         console.log(input,"here")
//         const info = await prisma.users.findMany({
//             where:{
//                 wallet:{
//                     equals:input.wallet
//                 }
//             }
//         })
//         console.log(info)
//         return {ctx,info}
//     }
    
// })





// export type definition of API
export type AppRouter = typeof marketUserRouter;