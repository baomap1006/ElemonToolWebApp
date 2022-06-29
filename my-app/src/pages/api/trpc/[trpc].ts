// import * as trpcNext from '@trpc/server/adapters/next';

// import { appRouter } from '../../../backend/routes/index';
// import { createContext } from '../../../backend/routes/context';


// // export API handler
// export default trpcNext.createNextApiHandler({
//     router: appRouter,
//     createContext: createContext,
//   });


// import * as trpcNext from '@trpc/server/adapters/next';
// import { appRouter as a } from '../../../backend/routes/index';
// export const appRouter =a;

// // export type definition of API
// export type AppRouter = typeof appRouter;

// // export API handler
// export default trpcNext.createNextApiHandler({
//   router: appRouter,
//   createContext: () => null,
// });
async function createContext(opts?: trpcNext.CreateNextContextOptions) {
  // Create your context based on the request object
  // Will be available as `ctx` in all your resolvers 
  console.log(opts?.req.cookies)
  return {
    token:opts?.req.cookies["user-token"], req: opts?.req
  };
}
export type Context = trpc.inferAsyncReturnType<typeof createContext>;
import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import { z } from 'zod';
import { userRouter } from '../../../backend/routes/Users';
import {marketUserRouter} from '../../../backend/routes/MarketUsers'
// import {appRouter  } from '../../../backend/routes/index'
export const appRouter = trpc
.router<Context>()
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
}).merge("marketUser",marketUserRouter).merge("user",userRouter)  ;
// export type definition of API
export type AppRouter = typeof appRouter;

// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: createContext,
  onError({ error, type, path, input, ctx, req }){
    console.log("data",{
      input:input,
      path:path
    })
    console.error('Error:', error);
  }
});