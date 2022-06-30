import { unstable_getServerSession } from "next-auth";
import type { NextApiRequest, NextApiResponse } from 'next'
import { NextAuthOptions } from "next-auth";
export default async function handler(req:NextApiRequest, res:NextApiResponse,authOptions:NextAuthOptions){
    const session = await unstable_getServerSession(req, res, authOptions)
    if (session) {
      res.send({
        content:
          "This is protected content. You can access this content because you are signed in.",
      })
    } else {
      res.send({
        error: "You must be sign in to view the protected content on this page.",
      })
    }
  }