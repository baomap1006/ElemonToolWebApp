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
  const { data: session, status } = useSession();
  useEffect(() => {
    let cancel = false;
    axios.get("/api/myUser").then((res) => setuser(res.data));

    return () => {
      cancel = true;
    };
  }, [session]);
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

const AppContext = createContext<ReturnType<typeof useValue>|null>(null);
export const useAppContext = ()=>useContext(AppContext);
interface ChildProps {
  children?: React.ReactNode | React.ReactNode[];
}

let link = process.env.NEXT_PUBLIC_WS_LINK || "";
// let link = "http://35.196.73.50"

export function AppWrapper({ children }: ChildProps) {



  return (
    <AppContext.Provider
      value={useValue()}
    >
      {children}
    </AppContext.Provider>
  );
}

