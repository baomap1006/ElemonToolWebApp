import { useRouter } from "next/router";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../db/client";
import Moralis from "moralis/node";
/* Moralis init code */
const serverUrl = process.env.NEXT_PUBLIC_MORALIS_SERVERURL;
const appId = process.env.NEXT_PUBLIC_MORALIS_APP_ID;
const masterKey = process.env.NEXT_PUBLIC_MORALIS_MASTERKEY;
// const serverUrl = "https://fjipfo98umzu.usemoralis.com:2053/server";
// const appId = "Zgb8rO2bKJvDS3s7jHvZxNVTZTlORiOT22vEjBuv";
// const masterKey = "xjvnPqxZ6q6jMOYkaC3NceoTDAhIfwgRZaQeSWnX";

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

async function getElemons(page = 1) {
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
  let qUID: string = getID(uid);
  let t = await prisma.marketUsers.findUnique({
    where: {
      uId: qUID,
    },
  });
  // console.log(t)
  // console.log("page",getID(page))
  // console.log("pageuid",uid)

  if (req.cookies["user-token"] != t?.cookie) {
    res.status(403).send({ cause: "not authorized" });
  }
  if (!t) {
    res.status(403).send({ cause: "not found" });
    return;
  }

  if (t.status == true) {
    let returnPage: string | number = getID(page);
    if (returnPage === "") returnPage = 1;
    else {
      returnPage = parseInt(returnPage, 10);
    }
    let elemons = await getElemons(returnPage);
    return res.status(200).json(elemons);
  }

  // res.status(200).json(new Object(t));
  // res.status(200).json({ name: 'John Doe' })
}
