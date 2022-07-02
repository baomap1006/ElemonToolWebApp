import axios from "axios";
import Moralis from "moralis/types";
import React, { useState, useEffect, useContext } from "react";
import Buttons from "./Buttons";
import { userProps, resType ,elemonType,defaultResponse,elemmonInfoType,elemonTest} from "../Types";
import Table from "./Table";
import {AppContext} from '../context/UserContext'
type Props = {
  user?: userProps;
};
// let contract = "0xdc8dbca78a5da4f29ca4572dc4734c0048d61c2f";


type getElProps = {
  res:resType,
  setelemons:React.Dispatch<React.SetStateAction<resType[]>> 
}


async function getElemon(props:getElProps) {
  let res=props.res;
  let setelemons=props.setelemons;
  
  res.elemon=null;
  let tempRes = await axios.get("https://app-api.elemon.io/elemon/info/"+res.tokenId).catch(err=>{
    // console.log(err)
  })
  // console.log(tempRes?.data)
  if(!tempRes ||!tempRes.data || tempRes.status!==200 ){
    setelemons(prev => [...prev,res]);
   
    // els[res.tokenId] = res;
    return
  } 
  let el:defaultResponse = tempRes.data
  if(!el || !el?.data.data.length ){
    setelemons(prev => [...prev,res]);
   
    return
  } 
  let elemon:(typeof elemonTest.data) = el.data!
  res = {...res,elemon:elemon.data[0]!,elemmonInfo:elemon.info} 

  setelemons(prev => [...prev,res]);

  return
  
}


function Data({}: Props) {
  const context = useContext(AppContext)

  // useEffect(() => {
  //   let cancel = false
    
  //   if(!cancel){
  //     // fetchInfo(page)
  //     console.log("triggered",el)
  //     setelemons(prev=>[el!,...prev])
  //     if(el && el.tokenId && !els[el.tokenId]){
  //       fetchInfo(page)
  //     }
  //     // fetchInfo(page)
  //     console.log(els)
  //   }
  
  //   // return () => {
  //   //  cancel=true;
  //   // }
  // }, [isFetch])
  
  const [elemons, setelemons] = [context.elemons,context.setelemons];
  // console.log(elemonType)
  const [page, setpage] = useState<number>(1);
  async function fetchInfo(page: number) {
    setelemons([])
    let link = "/api/elemons?page=" + page;
    let getAuth = await axios.get(link);
    if(!getAuth || !getAuth.data || getAuth.status!=200){
      alert("Not authorized")
      return;
    } ;
    let newRespsonse:resType[] =[]
    await (async ()=>{
      for(let item of getAuth.data){
        await getElemon({res:item,setelemons});
      }
    })()
    // let filtered = elemons!.sort(
    //   (a: resType, b: resType) => b.block_number - a.block_number
    // );
    setelemons(prev =>prev.sort((a: resType, b: resType) => b.block_number - a.block_number));
  }
  function navigate(dir = 1) {
    
    fetchInfo(page + dir);
    setpage((prev) => prev + dir);
  }
  useEffect(() => {
    let cancel = false;

    if (!cancel){
      fetchInfo(1)
    }

    return () => {
      cancel = true;
    };
  }, []);

 
  

  if(elemons.length===0) return <div></div>
  return (
    <div className="grid ">
        <audio src="mixkit-confirmation-tone-2867.wav" id="audio" controls style={{display:'none'}}></audio>
        <Buttons page={page} setpage={setpage} navigate={navigate} fetchInfo={fetchInfo}/>
        <Table elemons={elemons}/>
    
  
      
    </div>
  );
}






export default Data;



