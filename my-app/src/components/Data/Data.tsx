import axios from "axios";
import Moralis from "moralis/types";
import React, { useState, useEffect, useContext } from "react";
import Buttons from "./Buttons";
import { userProps, resType ,elemonType,defaultResponse,elemmonInfoType,elemonTest} from "../Types";
import Table from "./Table";

type Props = {
  user?: userProps;
};
let contract = "0xdc8dbca78a5da4f29ca4572dc4734c0048d61c2f";

async function getElemon(res:resType,setelemons:React.Dispatch<React.SetStateAction<resType[]>>) {
  res.elemon=null;
  let tempRes = await axios.get("https://app-api.elemon.io/elemon/info/"+res.tokenId).catch(err=>{
    console.log(err)
  })
  // console.log(tempRes?.data)
  if(!tempRes ||!tempRes.data || tempRes.status!==200 ){
    setelemons(prev => [...prev,res]);
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
  // const context = useContext(AppContext)!.user!;
  const [elemons, setelemons] = useState<resType[]>([]);
  // console.log(elemonType)
  const [page, setpage] = useState<number>(1);
  async function fetchInfo(page: number) {
    setelemons([])
    let link = "/api/elemons?page=" + page;
    let getAuth = await axios.get(link);
    if(!getAuth || !getAuth.data || getAuth.status!=200) return;
    let newRespsonse:resType[] =[]
    await (async ()=>{
      for(let item of getAuth.data){
        await getElemon(item,setelemons);
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

    if (!cancel) fetchInfo(1);

    return () => {
      cancel = true;
    };
  }, []);
  if(elemons.length===0) return <div></div>
  return (
    <div className="grid ">
  
        <Buttons page={page} setpage={setpage} navigate={navigate} fetchInfo={fetchInfo}/>
        <Table elemons={elemons}/>
    
  
      
    </div>
  );
}






export default Data;



