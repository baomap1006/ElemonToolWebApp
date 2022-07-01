import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../db/client";
import { getSession } from "next-auth/react";
import axios from "axios"
// type Data = {
//   [key: string]: string;
// };
type Data = boolean
type errorRes = {
  cause: string;
};
function getID(uid: string | string[] | undefined) {
    if (!uid) return "";
    if (Array.isArray(uid)) {
      return uid[0]!;
    } else {
      return uid!;
    }
  }
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data | errorRes>
  ) {
    const { id ,status} = req.query;
    if(!id ||!status){
        res.status(403).send({cause:"No ID"});
        return;
    }
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
   
    
    if (temp.length===0) {
      res.status(403).send({ cause: "Not allowed" });
      return;
    }
 
    let t =   temp[0]!
    if(t.isAdmin==false) {
      res.status(403).send({ cause: "Not allowed" });
      return;
    }


    let uid =getID(id)
    let ustatus = getID(status)

    let users = await prisma.user.update({
        data:{
            PaymentStatus: ustatus=="true"?true:false
        },
        where: {
            id:uid
        }
    })
    res.status(200).send(users)
  }
  