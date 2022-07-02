import { createContext, useContext, useState } from "react";
import firebase from "firebase/compat/app";
import { User } from "@prisma/client";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { io, Socket } from "socket.io-client";
import { resType, defaultResponse, elemonTest, savedata } from "../Types";

const useValue = () => {
  const [user, setuser] = useState<User>();
  const [ioSocket, setioSocket] = useState<Socket>();
  const [isFetch, setisFetch] = useState(false);
  const [tempElemon, settempElemon] = useState<resType>();
  const [elemons, setelemons] = useState<resType[]>([]);
  return {
    user,
    setuser,
    ioSocket,
    setioSocket,
    isFetch,
    setisFetch,
    tempElemon,
    settempElemon,
    elemons,
    setelemons,
  };
};

export const AppContext = createContext({} as ReturnType<typeof useValue>);

interface ChildProps {
  children?: React.ReactNode | React.ReactNode[];
}

let link = process.env.NEXT_PUBLIC_WS_LINK || "";
// let link = "http://35.196.73.50"

export function AppWrapper({ children }: ChildProps) {
  const [user, setuser] = useState<User>();
  const { data: session, status } = useSession();
  const [ioSocket, setioSocket] = useState<Socket>();
  const [isFetch, setisFetch] = useState(false);
  const [tempElemon, settempElemon] = useState<resType>();
  
  const [elemons, setelemons] = useState<resType[]>([]);
  useEffect(() => {
    let cancel = false;
    axios.get("/api/myUser").then((res) => setuser(res.data));

    return () => {
      cancel = true;
    };
  }, [session]);

  async function getElemon(res: resType) {
    // if (elemons[res.tokenId]) return;
    res.elemon = null;
    res.block_timestamp.iso = new Date(res.block_timestamp.iso).toString();
    // elemons[res.tokenId]="1";
    let tempRes = await axios
      .get("https://app-api.elemon.io/elemon/info/" + res.tokenId)
      .catch((err) => {
        console.log(err);
      });
    // console.log(tempRes?.data)
    if (!tempRes || !tempRes.data || tempRes.status !== 200) {
      // settempElemon(res);
      // elemons[res.tokenId] = res;
      return;
    }
    let el: defaultResponse = tempRes.data;
    if (!el || !el?.data.data.length) {
      settempElemon(res);
      // elemons[res.tokenId] = res;
      return;
    }
    let elemon: typeof elemonTest.data = el.data!;
    res = { ...res, elemon: elemon.data[0]!, elemmonInfo: elemon.info };

    settempElemon(res);
    // elemons[res.tokenId] = res;
    return;
  }
  let contract = "0xdc8dbca78a5da4f29ca4572dc4734c0048d61c2f";
  useEffect(() => {
    let cancel = false;
    const socket = io("https://ElemonWS.baotran17.repl.co");
    setioSocket(socket);
    if (!cancel && status === "authenticated") {
      // socket.on("connect", () => {
      //   console.log(socket.id, " connected to the server !");
      //   socket.on("received-item", async (context) => {
      //     console.log("received event",context);
      //     // if(elemons[context.tokenId]) return;
      //     let checkdata = savedata(context);
      //     if (checkdata.success == false) {
      //       console.log(checkdata.errors);
      //       return;
      //     }
      //     if (
      //       checkdata?.data?.from == contract ||
      //       checkdata?.data?.to != contract
      //     ) {
      //       console.log("Not listing order");
      //       return;
      //     }
      //     console.log(checkdata)
      //     // await getElemon(context);
      //     settempElemon(context)
      //     setisFetch(!isFetch);
      //     // fetchInfo(page)
      //   });
      // });
    }

    return () => {
      socket.close();
    };
  }, [status]);
  useEffect(() => {
    ioSocket?.on("received-item", async (context) => {
      console.log("received event", context);
      context.block_timestamp = context.block_timestamp.iso
      setelemons(prev => [context,...prev])
      const video = document.getElementById('audio') as HTMLAudioElement
      video?.play();
    });
    return () => {
      ioSocket?.off("received-item");
    };
  }, [ioSocket]);

  ioSocket;

  return (
    <AppContext.Provider
      value={{
        user,
        setuser,
        ioSocket,
        setioSocket,
        isFetch,
        setisFetch,
        tempElemon,
        settempElemon,
        elemons,
        setelemons,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
