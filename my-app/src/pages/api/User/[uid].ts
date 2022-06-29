import { useRouter } from "next/router";
import type { NextApiRequest, NextApiResponse } from "next";
import {prisma} from '../../../db/client'
type Data = {
  name: string;
};
type errorRes = {
    cause:string;
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data|errorRes>
) {
    console.log(req.query)
    const {uid}= req.query;
    let qUID :string = ""

    if (Array.isArray(uid)) {
        qUID = uid[0]!;
    }else{
        qUID = uid!
    }
  let t = await prisma.marketUsers.findMany({
    where:{
        uId:qUID
    }
  })
  console.log(t)
  if(!t.length){
    res.status(403).send({cause:"not found"})
    return;
  }
  res.end(`Post: ${uid}`);
  // res.status(200).json({ name: 'John Doe' })
}
