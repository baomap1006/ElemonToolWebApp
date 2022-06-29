
import { any, nullable, string, z } from 'zod';
import {prisma} from '../../db/client'
import { createRouter } from './context';
import firebase from "firebase/compat/app";
import * as trpc from '@trpc/server';


let t = z.object({
    uid: z.string(),
    email: z.string(),
    displayName: z.string(),
    walletAddress: z.string().default(""),
    status: z.boolean().default(false),
})

export const marketUserRouter = trpc.router().query(".getByID",{
// export const marketUserRouter = createRouter().query(".getByID",{
    input:t     ,
    async resolve({ input }){
        let info:any = []
        try{
            info = await prisma.marketUsers.findMany({
                where:{ 
                    uId:input.uid
                }
            })
            if(info.length>0) return info;
            
            let createdData = await prisma.marketUsers.create({
                data:{
                    uId:input.uid,
                    name:input.displayName,
                    walletAddress:input.walletAddress,
                    status:input.status,
                    email:input.email
                }
            })
            return [createdData]
        }catch(err){
            console.log(err)
        }
        return info
        
        // console.log(ctx)
    }
})
// .query(".getAllUsers",{
    
//     async resolve({ctx}){
//         console.log("testToken",ctx.token)
//         const info = await prisma.users.findMany();
//         return {info,ctx}
//     }
// })
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
export type AppRouter = typeof maerketUserRouter;