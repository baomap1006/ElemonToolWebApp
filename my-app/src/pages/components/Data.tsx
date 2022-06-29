import Moralis from 'moralis/types';
import React,{useState,useEffect} from 'react'
let tmp = {
    "log_index": 366,
    "transaction_hash": "0xb666aed387ff0390fea0f9f32964978fd37213baf071df465af4857afd4ab2db",
    "createdAt": "2022-06-29T08:26:40.490Z",
    "updatedAt": "2022-06-29T08:26:43.504Z",
    "address": "0xd4793c2a8991f9a8d2f4714e113194c2ddebfa50",
    "block_hash": "0x00c6d7a179d122616c91666242f4ed0c2c023225c15d421cd4ec8cac0c71c723",
    "block_number": 19106487,
    "block_timestamp": {
        "__type": "Date",
        "iso": "2022-06-29T07:58:00.000Z"
    },
    "confirmed": true,
    "from": "0xdc8dbca78a5da4f29ca4572dc4734c0048d61c2f",
    "to": "0x9194553c55d9e9b4d107dc31d7f15c0dcb39c5f5",
    "tokenId": "152337",
    "tokenId_decimal": {
        "__type": "NumberDecimal",
        "value": {
            "$numberDecimal": "152337"
        }
    },
    "transaction_index": 143,
    "objectId": "sycFfRL5HuLCzoxhM8ali6kc"
}
type resType = typeof tmp;
type Props = {}
let contract = "0xdc8dbca78a5da4f29ca4572dc4734c0048d61c2f"
import { useMoralisQuery } from "react-moralis";


function Data({}: Props) {
    const [elemons, setelemons] = useState<Moralis.Attributes[]>([])
    const { fetch } = useMoralisQuery(
        "ElemonSales",
       
        
      );

    async function fetchInfo(){
        // let res = await fetch("/api/contract/contract")
        let res = await fetch()
        const data = await res
        let filtered   = data!.map(item=>item.attributes).sort((a,b)=>a.blockNumber -b.blockNumber)
        //.filter((itm:resType)=>itm.from!=contract)
        console.log(filtered)
        setelemons(filtered)
    }
    useEffect(() => {
      
        let cancel = false;

        if(!cancel) fetchInfo()
    
      return () => {
       cancel =true
      }
    }, [])
    
  return (
   
    <div>
        {/* <code>{JSON.stringify(elemons)}</code> */}
        {/* {
            elemons?.length >0 && (
                elemons.map((elemon)=>{
                    let txLink:string = `https://bscscan.com/tx/${elemon.transaction_hash}`
                    return (
                        <div key = {elemon.objectId} className="flex gap-2">
                            <div>{elemon.tokenId}</div>
                            <div>{elemon.block_timestamp}</div>
                            <div>{elemon.from}</div>
                            <a href={txLink} rel="noreferrer" target="_blank" >{elemon.transaction_hash}</a>
                        </div>
                    )
                })
            )
        } */}
        123
    </div>
  
  )
}

export default Data