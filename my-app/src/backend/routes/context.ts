// import * as trpc from "@trpc/server";
// import * as trpcNext from "@trpc/server/adapters/next";

// // The app's context - is generated for each incoming request
// export async function createContext(opts?: trpcNext.CreateNextContextOptions) {
//   // Create your context based on the request object
//   // Will be available as `ctx` in all your resolvers

 
// //   const user = await getUserFromHeader();
//   console.log(opts?.req.cookies)
//   return {
//     token:opts?.req.cookies["user-token"],
//     input:undefined
  
//   };
// }
// type Context = trpc.inferAsyncReturnType<typeof createContext>;

// // Helper function to create a router with your app's context
// export function createRouter() {
//   return trpc.router<Context>();
// }
interface CreateContextOptions {
  // session: Session | null
}
import * as trpc from '@trpc/server';
export async function createContextInner(_opts: CreateContextOptions) {
  return {};
}
export type Context = trpc.inferAsyncReturnType<typeof createContextInner>;
// export function createRouter() {
//   return trpc.router<Context>();
// }

export function createRouter(){return trpc.router()}