import { createContext, useContext,useState } from 'react';
import firebase from "firebase/compat/app";



const useValue = () => {
    const [user, setuser] = useState<firebase.User>()

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
   

 

  return (
    <AppContext.Provider value={useValue()}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}