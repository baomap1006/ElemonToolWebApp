import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import Buttons from "./Buttons";
import {
  userProps,
  resType,
  elemonType,
  defaultResponse,
  elemmonInfoType,
  elemonTest,
  savedata,
} from "../Types";
import Table from "./Table";
import { AppContext } from "../context/UserContext";
import { useMoralisSubscription } from "react-moralis";
import { getElemon } from "./Functions";

type Props = {
  user?: userProps;
};
let contract = "0xdc8dbca78a5da4f29ca4572dc4734c0048d61c2f";
function Data({}: Props) {
  const context = useContext(AppContext);
  const user = context.user;

  const [elemons, setelemons] = [context.elemons, context.setelemons];
  // console.log(elemonType)
  const [page, setpage] = useState<number>(1);
  async function fetchInfo(page: number) {
    setelemons([]);
    let link = "/api/elemons?page=" + page;
    let getAuth = await axios.get(link);
    if (!getAuth || !getAuth.data || getAuth.status != 200) {
      alert("Not authorized");
      return;
    }
    await (async () => {
      for (let item of getAuth.data) {
        let el = await getElemon(item);
        setelemons((prev) => [...prev, el]);
      }
    })();

    setelemons((prev) =>
      prev.sort((a: resType, b: resType) => b.block_number - a.block_number)
    );
  }
  function navigate(dir = 1) {
    fetchInfo(page + dir);
    setpage((prev) => prev + dir);
  }
  useEffect(() => {
    let cancel = false;

    if (!cancel) {
      fetchInfo(1);
    }

    return () => {
      cancel = true;
    };
  }, []);

  useMoralisSubscription("ElemonSales", (q) => q, [], {
    // onCreate:data=> updateNewData(data.attributes),
    onEnter: (data) => console.log("enterdata", data.attributes),
    onUpdate: (data) => updateEvent(data.attributes),
    enabled: true,
  });
  async function updateEvent(obj: any) {
    // console.log("New record updateEvent", obj);

    if (!user || !user.PaymentStatus) return;
    if (obj.from === contract || obj.to != contract || obj.confirmed ===false) return;
    let checkData = savedata(obj);

    if (checkData.success == false) {
      console.log(checkData.errors);
      return;
    }
    let el = await getElemon(Object.assign({}, obj));
    setelemons((prev) => [el, ...prev]);
    console.log("data updated");
    const sound = document.getElementById("audio") as HTMLAudioElement;
    sound?.play();
  }

  if (elemons.length === 0) return <div></div>;
  return (
    <div className="grid ">
      <audio
        src="mixkit-confirmation-tone-2867.wav"
        id="audio"
        controls
        style={{ display: "none" }}
      ></audio>
      <Buttons
        page={page}
        setpage={setpage}
        navigate={navigate}
        fetchInfo={fetchInfo}
      />
      <Table elemons={elemons} />
    </div>
  );
}

export default Data;
