import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";
export function middleware(req:NextRequest){
    console.log("Request",req.cookies)
    
    if(req.cookies["user-token"]) return ;
    
    const random = nanoid()
    const response = NextResponse.next();
    response.cookie("user-token",random,{sameSite:"strict"})
    response.cookie("hello", "world")
    return response
}