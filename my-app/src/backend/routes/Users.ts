import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import { z } from 'zod';
import {prisma} from '../../db/client'
import superjson from 'superjson'
import { createRouter } from './context';
export const userRouter = createRouter()
.query(".getAllUsers",{
    async resolve({ctx}){
        console.log("testToken",ctx.token)
        const info = await prisma.users.findMany();

        return {info,ctx}
    }
})






// export type definition of API
export type AppRouter = typeof userRouter;