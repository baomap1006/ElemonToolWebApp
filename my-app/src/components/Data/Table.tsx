import React from "react";
import { timeSince } from "../../utils/Functions";
import {
  userProps,
  resType,
  elemonType,
  defaultResponse,
  elemmonInfoType,
  elemonTest,
} from "../Types";
import { elemonNames, ElClass, Aura, Rare } from "./info";
type Props = {
  elemons: resType[];
};
import { imageString } from "./Functions";
import Image from "next/image";
function Table({ elemons }: Props) {
  return (
    <div className="flex justify-center justify-items-center overflow-auto ">
      <table className=" cursor-default border-collapse my-1 mx-0 border-all shadow-lg rounded-lg overflow-auto sm:block sm:w-full ">
        <colgroup>
          <col style={{ width: "10%" }} />
          <col style={{ width: "20%" }} />
          <col style={{ width: "60%" }} />
          <col style={{ width: "10%" }} />
        </colgroup>
        {elemons.length > 0 && (
          <thead className="basic-color gap-2  sm:hidden ">
            <tr className="basic-color gap-2  sm:block sm:w-full">
              <th className="table-cell">Token ID</th>
              <th className="table-cell">Block Time</th>
              <th className="table-cell">Elemon Info</th>
              <th className="table-cell"> Action</th>
            </tr>
          </thead>
        )}
        {/* <div className ="table-row-group"> */}
        <tbody className=" text-ellipsis  sm:block sm:w-full">
          {elemons?.length > 0 &&
            elemons.map((elemon) => {
              let txLink: string = `https://app.elemon.io/marketplace/elemon-detail/${elemon.tokenId}`;

              let timeString =
                timeSince(elemon.block_timestamp.toString()) + " ago";
              let info = elemon.elemmonInfo!;
              let str = imageString(info);
              return (
                <tr
                  key={elemon.transaction_hash}
                  className="table-row gap-2 w-full hover:bg-indigo-100 odd:bg-white even: bg-slate-100 sm:grid sm:w-full" 
                >
                  <td className="table-cell" data-label="Token ID">{elemon.tokenId}</td>
                  <td className="table-cell " data-label="Block Time">
                    <div>{timeString}</div>
                    {info && (
                      <Image
                        layout="responsive"
                        width={"100px"}
                        height={"100px"}
                        src={str}
                        alt={info ? elemonNames[info.baseCardId + "a"] : ""}
                      />
                    )}
                  </td>
                  {info ? <ElemonInfo data={elemon} />:<div className="flex flex-wrap justify-center text-center items-center h-full" >Bought or no Info</div>}
                  <td className="table-cell " data-label=" Buy Link">
                    <a
                      className="btn overflow-hidden text-ellipsis whitespace-nowrap  inline-block  "
                      href={txLink}
                      rel="noreferrer"
                      target="_blank"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                      <div>Buy</div>
                      
                    </a>
                  </td>
                </tr>
              );
            })}
        </tbody>
        {/* </div> */}
      </table>
    </div>
  );
}

function Item({ children }: { children: React.ReactNode }) {
  return (
    <div className="lg:grid xl:grid grid-cols-3 flex gap-4 justify-start flex-wrap">
      {children}
    </div>
  );
}

function Comp({ title, value }: { [key: string]: string | number | null }) {
  return (
    <div className=" border-b-2 border-b-indigo-200">{`${title} ${value}`}</div>
  );
}

function ElemonInfo({ data }: { data: resType }) {
  let elemon = data.elemon;
  let info = data.elemmonInfo;
  if (!elemon || !info) return <td className="table-cell">No Info</td>;

  const arr1: number[] = [info.baseCardId]!;
  return (
    <td className="table-cell" data-label="Elemon Info"  >
      <Item>
        <Comp title="" value={elemonNames[info.baseCardId + "a"]!} />
      </Item>

      <Item>
        <Comp title="" value={ElClass[info.class - 1]?.name || ""} />
        <Comp title="" value={Rare[info.rarity - 1]?.name || ""} />

        {/* <Image src={info ? `https://app.elemon.io/images/rarity/big/${Rare[info.rarity - 1]?.name}.png`:""} layout="responsive"
          width={"10"}
          height={"10"}
          
          alt={info?Rare[info.rarity - 1]?.name:""} />
         */}
      </Item>

      <Item>
        <Comp
          title=""
          value={
            parseInt(info.marketPrice) / 10 ** 18 +
            " " +
            info.marketPaymentSymbol
          }
        />
        <Comp title="Power" value={elemon.point} />
      </Item>
      <Item>
        <Comp
          title="Power/USD"
          value={(
            elemon.point /
            (parseInt(info.marketPrice) / 10 ** 18)
          ).toFixed(2)}
        />
      </Item>
      <Item>
        <Comp title="Level" value={elemon.level} />
      </Item>
      <Item>
        <Comp
          title="Speed"
          value={"+" + elemon.bodyPart[5]?.val || "Not found"}
        />
        <Comp title="Spd. " value={elemon.points[5] || "Not found"} />
      </Item>
    </td>
  );
}

export default Table;
