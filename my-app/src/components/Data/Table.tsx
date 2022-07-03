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
    <div className="flex justify-center justify-items-center w-full">
      <table className=" cursor-default border-collapse my-1 mx-0 min-w-400 border-all shadow-lg rounded-lg overflow-auto  ">
        <colgroup>
          <col style={{ width: "10%" }} />
          <col style={{ width: "10%" }} />
          <col style={{ width: "80%" }} />
          <col style={{ width: "20%" }} />
        </colgroup>
        {elemons.length > 0 && (
          <thead className="basic-color gap-2  w-full ">
            <tr className="basic-color gap-2  w-full ">
              <th className="table-cell">Token ID</th>
              <th className="table-cell">Block Time</th>
              <th className="table-cell">Elemon Info</th>
              <th className="table-cell"> Buy Link</th>
            </tr>
          </thead>
        )}
        {/* <div className ="table-row-group"> */}
        <tbody className=" text-ellipsis max-h-20 ">
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
                  className="table-row gap-2 w-full hover:bg-indigo-100 odd:bg-white even: bg-slate-100"
                >
                  <td className="table-cell">{elemon.tokenId}</td>
                  <td className="table-cell">
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
                  {info && <ElemonInfo data={elemon} />}
                  <td className="table-cell ">
                    <a
                      className="btn overflow-hidden text-ellipsis whitespace-nowrap w-60 inline-block  "
                      href={txLink}
                      rel="noreferrer"
                      target="_blank"
                    >
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
  );
}

function Item({ children }: { children: React.ReactNode }) {
  return (
    <div className="xl:grid grid-cols-3 flex gap-4 justify-start flex-wrap">
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
    <td className="table-cell">
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
