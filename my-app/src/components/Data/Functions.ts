import { resType ,defaultResponse,elemonTest} from "../Types";
import axios from 'axios'
export async function getElemon(res:resType) { 
    // let res = Object.assign({}, item)
    res.elemon= null;
    let tempRes = await axios.get("https://app-api.elemon.io/elemon/info/"+res.tokenId).catch(err=>{
      // console.log(err)
    })
    // console.log(tempRes?.data)
    if(!tempRes ||!tempRes.data || tempRes.status!==200 ){      
      return res
    } 
    let el:defaultResponse = tempRes.data
    if(!el || !el?.data.data.length ){
      return res
    } 
    let elemon:(typeof elemonTest.data) = el.data!
    res = {...res,elemon:elemon.data[0]!,elemmonInfo:elemon.info}   
    return   res
  }

export function imageString(info:(typeof elemonTest.data.info)){
  if(!info) return ""
  let str = `https://statics.elemon.io/avatar/${info.baseCardId}/${info.baseCardId}`;
  str += `_${info.bodyPart1}_${info.bodyPart2}_${info.bodyPart3}_${info.bodyPart4}_${info.bodyPart5}_${info.bodyPart6}.png`;
  return str
}