import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../db/client";
import { getSession } from "next-auth/react";

type Data = {isAdmin:boolean}
type errorRes = {
  cause: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data | errorRes>
  ) {
    const session = await getSession({ req });
    if(!session || !session.user ) {
      res.status(403).send({ cause: "Not allowed" });
      return;
    }
    let temp = await prisma.user.findMany({
      where: {
        name: session?.user?.name,
        email: session?.user?.email,
      },
    });
   
    console.log(temp);
    if (temp.length===0) {
      res.status(403).send({ cause: "Not allowed" });
      return;
    }
 
    let t =   temp[0]!
    res.status(200).send({isAdmin:t.isAdmin})
  }
  