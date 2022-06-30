import axios from "axios";
import Moralis from "moralis/types";
import React, { useState, useEffect, useContext } from "react";
// import { AppContext } from "./context/UserContext";
import { userProps, resType } from "./Types";

type Props = {
  user?: userProps;
};
let contract = "0xdc8dbca78a5da4f29ca4572dc4734c0048d61c2f";

function Data({}: Props) {
  // const context = useContext(AppContext)!.user!;
  const [elemons, setelemons] = useState<resType[]>([]);

  const [page, setpage] = useState<number>(1);
  async function fetchInfo(page: number) {
    let link = "/api/elemons?page=" + page;
    let getAuth = await axios.get(link);

    let filtered = getAuth.data!.sort(
      (a: resType, b: resType) => b.block_number - a.block_number
    );
    setelemons(filtered);
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
  function timeSince(date:string) {
    let startTime=new Date(date.toString()).getTime()
    let end = new Date().getTime();
    var seconds = Math.floor(( end- startTime) / 1000);
  
    var interval = seconds / 31536000;
  
    if (interval > 1) {
      return Math.floor(interval) + " years";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " months";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " days";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " hours";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " minutes";
    }
    return Math.floor(seconds) + " seconds";
  }
  return (
    <div className="grid ">
      {/* <code>{JSON.stringify(elemons)}</code> */}
      <div className="flex justify-center justify-items-center w-full">
        <table className=" cursor-default border-collapse my-1 mx-0 min-w-400 border-all shadow-lg rounded-lg table-fixed overflow-auto  ">
          {elemons.length > 0 && (
            <th className="basic-color gap-2  w-full table-header-group" >
              <tr className="basic-color gap-2  w-full table-row">
                <th className="table-cell">Token ID</th>
                <th className="table-cell">Block Time</th>
                <th className="table-cell">Transfer from wallet</th>
                <th className="table-cell"> Transaction Link</th>
              </tr>
            </th>
          )}
          {/* <div className ="table-row-group"> */}
          <tbody className=" table-row-group text-ellipsis  " >
            {elemons?.length > 0 &&
              elemons.map((elemon) => {
                let txLink: string = `https://bscscan.com/tx/${elemon.transaction_hash}`;
                
                let timeString = timeSince(elemon.block_timestamp.toString()) + " ago"
                return (
                  <tr key={elemon.transaction_hash} className="table-row gap-2 w-full hover:bg-indigo-400 odd:bg-white even: bg-slate-100" >
                    <td className="table-cell">{elemon.tokenId}</td>
                    <td className="table-cell">{timeString}</td>
                    <td className="table-cell">{elemon.from}</td>
                    <td className="table-cell ">
                      <a className=" overflow-hidden text-ellipsis whitespace-nowrap w-60 inline-block  " href={txLink} rel="noreferrer" target="_blank">
                        {elemon.transaction_hash}
                      </a>
                    </td>
                  </tr>
                );
              })}
          </tbody>
          {/* </div> */}
         
        </table>
      </div>
      {elemons?.length > 0 && (
        <div className="flex justify-center gap-4 w-full my-12">
          <button
            className="btn"
            onClick={() => {
              setpage(1);
              fetchInfo(1);
            }}
          >
            Home
          </button>
          <button className="btn" onClick={() => navigate(-1)}>
            Previous
          </button>
          <p className="text-center items-center text-justify">
            {`Page ${page}`}
          </p>
          <button className="btn" onClick={() => navigate(1)}>
            {" "}
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default Data;
