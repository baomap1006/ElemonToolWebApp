import React from "react";
import firebase from "firebase/compat/app";
import { useContext } from "react";
import { AppContext } from '../context/UserContext';
import { trpc } from '../../utils/trpc';
import {MarketUsers} from '@prisma/client'
import {prisma} from '../../db/client'
type Props = {
    user:firebase.User
};

function Header({user}: Props) {
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
        onSuccess:async (res:(MarketUsers)[])=>{
          console.log(res)
          if(res.length>0){
            let item = res[0]!
            let cookies = await prisma.cookies.findMany({
              where:{
                usersId:item.id
              }
            }).catch(err=>{
              console.log(err)
            })
            console.log(cookies)

          }
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
