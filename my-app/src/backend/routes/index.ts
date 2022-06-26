import superjson from 'superjson'
import { userRouter } from './Users';
// import {accountsRouter} from './Accounts'
import  {createRouter} from './context'
export const appRouter = createRouter()
  .transformer(superjson)
 .merge("user",userRouter);

// export type definition of API
export type AppRouter = typeof appRouter;