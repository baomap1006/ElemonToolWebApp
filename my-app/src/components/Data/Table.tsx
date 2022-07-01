import React from 'react'
import {timeSince} from '../../utils/Functions'
import { userProps, resType ,elemonType,defaultResponse,elemmonInfoType,elemonTest} from "../Types";
import {elemonNames} from './info'
type Props = {
    elemons:resType[]
}

function Table({elemons}: Props) {
  return (
    <div className="flex justify-center justify-items-center w-full">
    <table className=" cursor-default border-collapse my-1 mx-0 min-w-400 border-all shadow-lg rounded-lg table-fixed overflow-auto  ">
    <colgroup>
    <col style={{width:"10%"}}/>
    <col style={{width:"10%"}}/>
    <col style={{width:"80%"}}/>
    <col style={{width:"20%"}}/>
   
  </colgroup>  
      {elemons.length > 0 && (
        <thead className="basic-color gap-2  w-full table-header-group" >
          <tr className="basic-color gap-2  w-full table-row">
            <th className="table-cell">Token ID</th>
            <th className="table-cell">Block Time</th>
            <th className="table-cell">Elemon Info</th>
            <th className="table-cell"> Buy Link</th>
          </tr>
        </thead>
      )}
      {/* <div className ="table-row-group"> */}
      <tbody className=" table-row-group text-ellipsis  " >
        {elemons?.length > 0 &&
          elemons.map((elemon) => {
            let txLink: string = `https://app.elemon.io/marketplace/elemon-detail/${elemon.tokenId}`;
            
            let timeString = timeSince(elemon.block_timestamp.toString()) + " ago"
            return (
              <tr key={elemon.transaction_hash} className="table-row gap-2 w-full hover:bg-indigo-100 odd:bg-white even: bg-slate-100" >
                <td className="table-cell">{elemon.tokenId}</td>
                <td className="table-cell">{timeString}</td>
                <ElemonInfo data={elemon} />
                <td className="table-cell ">
                  <a className="btn overflow-hidden text-ellipsis whitespace-nowrap w-60 inline-block  " href={txLink} rel="noreferrer" target="_blank">
                    Buy
                  </a>
                </td>
              </tr>
            );
          })}
      </tbody>
      {/* </div> */}
     
    </table>
  </div>
  )
}

function Comp({title,value}:{[key:string]:string|number|null}){
  return <div className=' border-b-2 border-b-indigo-200'>{`${title} : ${value}`}</div>
}

function ElemonInfo({data}: {data:resType}){
  let elemon = data.elemon;
  let info = data.elemmonInfo
  if(!elemon || !info) return <td className="table-cell">No Info</td>
  
  const arr1: number[] = [info.baseCardId]!;
  return (
    <td className="table-cell">
      <Comp title="Pet" value = {elemonNames[info.baseCardId+'a']!} />
      <Comp title="Price" value={parseInt(info.marketPrice)/(10**18) + " " + info.marketPaymentSymbol}/>
      <Comp title="Power" value={elemon.point}/>
      <Comp title="Level" value={elemon.level}/>
      <Comp title="Speed" value={"+" + elemon.bodyPart[5]?.val || "Not found"}/>
      <Comp title="Spd. " value={elemon.points[5] || "Not found"}/>
    </td>
  )
}


export default Table