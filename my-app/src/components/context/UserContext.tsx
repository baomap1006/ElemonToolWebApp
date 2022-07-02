import { createContext, useContext,useState } from 'react';
import firebase from "firebase/compat/app";
import { User } from '@prisma/client';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import axios from "axios";
import { io, Socket } from "socket.io-client";


const useValue = () => {
    const [user, setuser] = useState<User>()
    const [ioSocket, setioSocket] = useState<Socket>()
    return {
        user,        setuser,ioSocket, setioSocket
    }
}


export const AppContext = createContext({} as ReturnType<typeof useValue>)

interface ChildProps {
    children?: React.ReactNode | React.ReactNode[];
}



   
export function AppWrapper({ children }:ChildProps) {
  const [user, setuser] = useState<User>()
  const { data: session ,status} = useSession();
  const [ioSocket, setioSocket] = useState<Socket>()
  useEffect(() => {
    let cancel = false;
    axios.get("/api/myUser").then(res=> setuser(res.data))
    
    return () => {
      
    }
  }, [session])
 
  useEffect(() => {
    let cancel = false;
    if(!cancel && status==="authenticated"){
      const socket = io("http://35.196.73.50");
      setioSocket(socket)
      socket.on("connect", () => {
          console.log(socket.id, " connected to the server !"); 
          
      });
    }
   
    return () => {
      cancel = true;
    }
  }, [status])
  

  return (
    <AppContext.Provider value={{user, setuser,ioSocket, setioSocket}}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}