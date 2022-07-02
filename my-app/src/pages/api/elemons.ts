import { useRouter } from "next/router";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../db/client";
import Moralis from "moralis/node";
import { getSession } from "next-auth/react";
/* Moralis init code */
const serverUrl = process.env.NEXT_PUBLIC_MORALIS_SERVERURL;
const appId = process.env.NEXT_PUBLIC_MORALIS_APP_ID;
const masterKey = process.env.NEXT_PUBLIC_MORALIS_MASTERKEY;

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

export async function getElemons(page = 1) {
  let contract = "0xdc8dbca78a5da4f29ca4572dc4734c0048d61c2f";
  let pageSize: number = 20;
  let toskip: number = (page - 1) * pageSize;
  let elemons = {};
  await Moralis.start({ serverUrl, appId, masterKey });
  const query = new Moralis.Query("ElemonSales");
  query.notEqualTo("from", contract);
  query.equalTo("to", contract);
  query.descending("block_timestamp");
  query.skip(toskip);
  query.limit(pageSize);
  // query.aggregate([{
  //   sort: {
  //     block_timestamp: -1
  //   }
  // }])
  const results = await query.find();
  if (results && results.length)
    elemons = results.map((item) => item.attributes);
  return elemons;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | errorRes>
) {
  console.log(req.query);
  const { uid, page } = req.query;
  // let qUID: string = getID(uid);
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
  let t = temp[0]!;
  if (t.PaymentStatus == false) {
    res.status(403).send({ cause: "Not paid !" });
    return;
  }
  let returnPage: string | number = getID(page);
  if (returnPage === "") returnPage = 1;
  else {
    returnPage = parseInt(returnPage, 10);
  }
  let elemons = await getElemons(returnPage);

  return res.status(200).json(elemons);


}
