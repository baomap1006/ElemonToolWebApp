import { NextRequest, NextResponse,NextFetchEvent } from "next/server";
import { nanoid } from "nanoid";


export function middleware(req: NextRequest, ev: NextFetchEvent) {
   
    
    if(req.cookies["user-token"]){
        console.log("Request token is",req.cookies["user-token"])
       
        return ;
    } 
    
    const random = nanoid()
    const response = NextResponse.next();
    let hours:number = 60*60*1000
    response.cookie("user-token",random,{sameSite:"strict",maxAge:1*hours});
    response.cookie("hello", "world")
    
    return response
}