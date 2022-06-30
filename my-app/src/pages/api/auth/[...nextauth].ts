
import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
// import EmailProvider from 'next-auth/providers/email'
import GoogleProvider from "next-auth/providers/google";
import DiscordProvider from "next-auth/providers/discord";
import InstagramProvider from "next-auth/providers/instagram";
import FacebookProvider from "next-auth/providers/facebook";

import { PrismaAdapter } from "@next-auth/prisma-adapter"
// import Adapters from "next-auth/adapters";
import { prisma } from "../../../db/client";
import { NextApiRequest, NextApiResponse,NextApiHandler } from "next";
import { Session } from "next-auth";


const authHandler: NextApiHandler = (req:NextApiRequest, res:NextApiResponse) => NextAuth(req, res, {...options,
  callbacks: {
    jwt:async function jwt({ token, user }){
        // user && (token.user = user)
        console.log("runnning jwt",user)
        console.log("runnning jwt 2")
        return token
    },
    session:async function session({ session, token }){
        console.log("running session",token)
        console.log("running session 2",session)

        // session.user = token.user!
        return session
    }
}
});
export default authHandler;
const options = {
    providers:[
        // GithubProvider({
        //     clientId: process.env.NEXT_PUBLIC_GITHUB_KEY,
        //     clientSecret: process.env.NEXT_PUBLIC_GITHUB_SECRETE,
        //   }),
        GoogleProvider({
            clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ||"",
            clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET || "",
            authorization: {
                params: {
                  prompt: "consent",
                  access_type: "offline",
                  response_type: "code"
                }
              }
        }),
        DiscordProvider({
          clientId: process.env.NEXT_PUBLIC_DISCORD_ID || "" ,
          clientSecret: process.env.NEXT_PUBLIC_DISCORD_SECRETE || ""
        }),
        InstagramProvider({
          clientId: process.env.NEXT_PUBLIC_INSTAGRAM_CLIENT_ID || "",
          clientSecret: process.env.NEXT_PUBLIC_INSTAGRAM_CLIENT_SECRET || ""
        }),
        FacebookProvider({
          clientId: process.env.NEXT_PUBLIC_INSTAGRAM_CLIENT_ID|| "",
          clientSecret: process.env.NEXT_PUBLIC_INSTAGRAM_CLIENT_SECRET|| ""
        })
        // EmailProvider()
    ],
    
    adapter: PrismaAdapter(prisma),
    secret:process.env.SECRETE
   
}