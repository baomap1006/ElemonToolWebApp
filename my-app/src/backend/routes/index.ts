import superjson from 'superjson'
import { userRouter } from './Users';
import {marketUserRouter} from './MarketUsers'
import  {createRouter} from './context'

import * as trpc from '@trpc/server';
import { z } from 'zod';

// export const appRouter = createRouter()
//   .transformer(superjson)
//  .merge("user",userRouter)
//  .merge("marketUser",marketUserRouter);


export const appRouter= trpc
.router()
.query('hello', {
  input: z
    .object({
      text: z.string().nullish(),
    })
    .nullish(),
  resolve({ input }) {
    return {
      greeting: `hello ${input?.text ?? 'world'}`,
    };
  },
})  
.transformer(superjson)
.merge("user",userRouter)
// .merge("marketUser",marketUserRouter);

// export type definition of API
export type AppRouter = typeof appRouter;