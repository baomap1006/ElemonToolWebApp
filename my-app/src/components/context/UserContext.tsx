import { createContext, useContext,useState } from 'react';
import firebase from "firebase/compat/app";
import { User } from '@prisma/client';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import axios from "axios";


const useValue = () => {
    const [user, setuser] = useState<User>()

    return {
        user,
        setuser
    }
}


export const AppContext = createContext({} as ReturnType<typeof useValue>)

interface ChildProps {
    children?: React.ReactNode | React.ReactNode[];
}



   
export function AppWrapper({ children }:ChildProps) {
  const [user, setuser] = useState<User>()
  const { data: session } = useSession();
  
  useEffect(() => {
    let cancel = false;
    axios.get("/api/myUser").then(res=> setuser(res.data))
    return () => {
      cancel = true;
    }
  }, [session])
 

  return (
    <AppContext.Provider value={{user, setuser}}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}