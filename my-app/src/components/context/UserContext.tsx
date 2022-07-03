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

  
  // let contract = "0xdc8dbca78a5da4f29ca4572dc4734c0048d61c2f";
  // useEffect(() => {
  //   let cancel = false;
  //   const socket = io("https://ElemonWS.baotran17.repl.co");
  //   setioSocket(socket);
  //   if (!cancel && status === "authenticated") {
 
  //   }

  //   return () => {
  //     socket.close();
  //   };
  // }, [status]);
  // useEffect(() => {
  //   ioSocket?.on("received-item", async (context) => {
  //     console.log("received event", context);
  //     context.block_timestamp = context.block_timestamp.iso
  //     setelemons(prev => [context,...prev])
  //     const video = document.getElementById('audio') as HTMLAudioElement
  //     video?.play();
  //   });
  //   return () => {
  //     ioSocket?.off("received-item");
  //   };
  // }, [ioSocket]);

  

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
