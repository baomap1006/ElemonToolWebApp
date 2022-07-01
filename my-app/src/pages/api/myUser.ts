import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../db/client";
import { getSession } from "next-auth/react";

type Data = {
  [key: string]: string;
};
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
    res.status(403).send({ cause: "not found" });
    return;
  }
  let u:any = {}
  let t =   Object.assign(u,temp[0]!);
  if(t.isAdmin==false) {
    delete u.isAdmin
  }
  return res.status(200).json(u);
}
