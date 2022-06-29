import type { NextApiRequest, NextApiResponse } from "next";
import {z} from "zod"
/* import moralis */
import  Moralis from "moralis/node"

/* Moralis init code */
const serverUrl = "https://fjipfo98umzu.usemoralis.com:2053/server";
const appId = "Zgb8rO2bKJvDS3s7jHvZxNVTZTlORiOT22vEjBuv";
const masterKey = "xjvnPqxZ6q6jMOYkaC3NceoTDAhIfwgRZaQeSWnX";





type Data =  {
    [key: string]: any;
  }


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    await Moralis.start({ serverUrl, appId, masterKey });
    // const Monster = Moralis.Object.extend("ElemonSales");
    const query = new Moralis.Query("ElemonSales");

    const results = await query.find();
    // let t = []
    // if(results.length > 0){
    //     results.forEach(item=>{
    //         t.push({...item.attributes})
    //     })
    // }
    // console.log(t);
    res.status(200).send(results.map(item=>item.attributes));
}
