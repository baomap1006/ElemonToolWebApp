import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import { string, z } from 'zod';
import {prisma} from '../../db/client'
import superjson from 'superjson'
import { createRouter } from './context';
// export const userRouter = createRouter()
export const userRouter = trpc.router()
.query(".getAllUsers",{
    
    // async resolve({ctx}){
    async resolve({ctx}){
        // ctx.token = 1;
        // console.log("testToken",ctx.token)
        const info = await prisma.users.findMany();
        return {info,ctx}
    }
})
.query(".getByWallet",{
    // input:z.object({})).nullish(),
    input:z.object({wallet:z.string().nullish()}),
    async resolve({input,ctx}){
        console.log(input,"here")
        const info = await prisma.users.findMany({
            where:{
                wallet:{
                    equals:input.wallet
                }
            }
        })
        console.log(info)
        return {ctx,info}
    }
    
})





// export type definition of API
export type AppRouter = typeof userRouter;