import React, { useState, useEffect,useContext } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase/compat/app";
import { uiConfig } from "./Firebase";
import {useAppContext} from '../../context/UserContext'
interface ChildProps {
  children?: React.ReactNode | React.ReactNode[]; 
}

function SignInScreen({ children }: ChildProps) {
  const [isSignedIn, setIsSignedIn] = useState(false); // Local signed-in state.
  const myContext = useAppContext()!

  // Listen to the Firebase Auth state and set the local state.
  useEffect(() => {
      const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged(async (user) => {
        let t: firebase.User = user!;        
        // myContext.setuser(t)
        setIsSignedIn(!!user);
       
      });
    



    
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);
  if (!isSignedIn) {
    return (
      <div className="flex-col flex justify-center align-middle justify-items-center w-full">
        <div className ="flex w-full justify-center flex-col 
         font-bold text-2xl
        justify-items-center text-center my-12 gap-4">
          <h1>Elemon Tool App</h1>
          <p>Please sign-in</p>
        </div>
        <StyledFirebaseAuth
          uiConfig={uiConfig}
          firebaseAuth={firebase.auth()}
        />
      </div>
    );
  }
  return <div>{children}</div>;
}

export default SignInScreen;
