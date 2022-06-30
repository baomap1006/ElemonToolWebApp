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

  return (
    <div className="grid ">
      {/* <code>{JSON.stringify(elemons)}</code> */}
      <div className="flex-col justify-center justify-items-center w-full">
        {elemons?.length > 0 &&
          elemons.map((elemon) => {
            let txLink: string = `https://bscscan.com/tx/${elemon.transaction_hash}`;
            return (
              <div key={elemon.transaction_hash} className="flex gap-2">
                <div>{elemon.tokenId}</div>
                <div>{elemon.block_timestamp}</div>
                <div>{elemon.from}</div>
                <a href={txLink} rel="noreferrer" target="_blank">
                  {elemon.transaction_hash}
                </a>
              </div>
            );
          })}
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
            Previos
          </button>
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
