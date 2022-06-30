import React from "react";
import firebase from "firebase/compat/app";
import { useContext } from "react";
import { AppContext } from './context/UserContext';
import { trpc } from '../utils/trpc';
// import {MarketUsers} from '@prisma/client'
import { userProps } from "./Types";
type Props = {
    user?:userProps
};

// type marketUserType = MarketUsers

function Header({}: Props) {
    const context = useContext(AppContext).user
    if(!context) return <h1>No User Found!</h1>
    let t = {
      uid: context?.uid || "",
      email: context?.email || "",
      displayName: context?.displayName || "",
      walletAddress:  "",
      status: false,
  }
    const {data,isLoading,refetch} = trpc.useQuery(["marketUser.getByID",t],{
        refetchOnWindowFocus: false,
        onSuccess:async (res)=>{
          console.log(res)
          
          
        }
      });
    // console.log(context.user?.uid)
     
  return (
    <div className="flex-col w-full  items-center justify-center">
      <div className="flex-col text-center my-4 font-bold text-2xl">
        <h1>Elemon Tool App</h1>
        <p>Welcome {firebase.auth().currentUser?.displayName}!</p>
        <p>You are now signed in!</p>
      </div>
      <div className="flex justify-center">
        <button
          className="btn self-center"
          onClick={() => firebase.auth().signOut()}
        >
          Sign-out
        </button>
       
      </div>
    </div>
  );
}

export default Header;
