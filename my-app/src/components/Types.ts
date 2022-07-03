import firebase from "firebase/compat/app";

export type userProps = firebase.User;
import { z, ZodError } from "zod";

export const MoralisTestObject = {
  log_index: 366,
  transaction_hash:
    "0xb666aed387ff0390fea0f9f32964978fd37213baf071df465af4857afd4ab2db",
  createdAt: "2022-06-29T08:26:40.490Z",
  updatedAt: "2022-06-29T08:26:43.504Z",
  address: "0xd4793c2a8991f9a8d2f4714e113194c2ddebfa50",
  block_hash:
    "0x00c6d7a179d122616c91666242f4ed0c2c023225c15d421cd4ec8cac0c71c723",
  block_number: 19106487,
  block_timestamp: {
    __type: "Date",
    iso: "2022-06-29T07:58:00.000Z",
  },
  confirmed: true,
  from: "0xdc8dbca78a5da4f29ca4572dc4734c0048d61c2f",
  to: "0x9194553c55d9e9b4d107dc31d7f15c0dcb39c5f5",
  tokenId: "152337",
  tokenId_decimal: {
    __type: "NumberDecimal",
    value: {
      $numberDecimal: "152337",
    },
  },
  transaction_index: 143,
  objectId: "sycFfRL5HuLCzoxhM8ali6kc",
};

export const MoralisOutput = z.object({
  // log_index: z.number().optional(),
  transaction_hash: z.string(),
  // createdAt:z.date().optional() ||  z.string().nullable().optional(),
  // updatedAt:z.date().optional()||  z.string().nullable(),
  address: z.string(),
  // block_hash: z.string().optional(),
  block_number: z.number(),
  block_timestamp: z.date() ||z.object({
    __type: z.string(),
    iso: z.string(),
  })  ,
  confirmed: z.boolean(),
  from: z.string(),
  to: z.string(),
  tokenId: z.string() || z.number(),
  // tokenId_decimal: z.object({
  //   __type: z.string().optional(),
  //   value: z.string().optional(),
  // }).optional(),
  // transaction_index: z.number().optional(),
  // objectId: z.string().optional(),
});

export function savedata(rawData:any){
  try{
    let data = MoralisOutput.parse(rawData);
    return {success:true,data:data}
  }catch(e){
    if(e instanceof ZodError){
      return {success:false,errors:e.flatten()}
    }else{
      console.log(e)
      return {success:false,errors:"Cannot parse info !"}
    }
  }
}


export const elemonTest = {
  data: {
    data: [
      {
        level: 2,
        point: 350,
        star: 0,
        bodyPart: [
          { type: 1, quality: 3, ability: 1, val: 30 },
          { type: 2, quality: 5, ability: 2, val: 70 },
          { type: 3, quality: 7, ability: 3, val: 130 },
          { type: 4, quality: 7, ability: 4, val: 130 },
          { type: 5, quality: 5, ability: 5, val: 70 },
          { type: 6, quality: 5, ability: 6, val: 70 },
        ],
        skills: [
          {
            skillImg: "https://game.elemon.io/avatar/Skills/Skurumi/skill1.png",
            level: 1,
            skillId: 100081,
          },
          {
            skillImg: "https://game.elemon.io/avatar/Skills/Skurumi/skill2.png",
            level: 0,
            skillId: 100082,
          },
        ],
        lockTime: 0,
        points: [1110, 879, 1109, 1294, 1260, 1024, 1, 1, 0],
      },
    ],
    info: {
      rentingMaxHoursPerTime: 0,
      rentingTime: 0,
      rentingHours: 0,
      positionType: 2,
      rentingPrice: "0",
      rentingPaymentTokenAddress: null,
      rentingUserAddress: null,
      tokenId: null,
      lastPrice: null,
      marketPrice: "3000000000000000000",
      paymentSymbol: null,
      marketPaymentSymbol: "BUSD",
      ownerAddress: "0xCF5A631c2e737c5E57C138BC07d1ADB0ac0401cd",
      baseCardId: 8,
      bodyPart1: 3,
      bodyPart2: 5,
      bodyPart3: 7,
      bodyPart4: 7,
      bodyPart5: 5,
      bodyPart6: 5,
      rarity: 1,
      purity: 0,
      class: 6,
      quality: 3,
    },
  },
};
export type defaultResponse = typeof elemonTest;
export type elemonType = typeof elemonTest.data.data[0];
export type elemmonInfoType = typeof elemonTest.data.info;
export type MoralisObjectType = typeof MoralisTestObject;
export interface resType extends MoralisObjectType {
  elemon: elemonType | null;
  elemmonInfo: elemmonInfoType | null;
}

// let contract = "0xdc8dbca78a5da4f29ca4572dc4734c0048d61c2f";
// type getElProps = {
//   res:resType,
//   setelemons:React.Dispatch<React.SetStateAction<resType[]>> 
// }