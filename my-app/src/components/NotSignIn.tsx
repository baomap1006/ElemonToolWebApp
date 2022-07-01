import React from 'react'
import {  signIn} from "next-auth/react"

type Props = {}

function NotSignIn({}: Props) {
  return (
    <div className='flex w-screen h-screen justify-center items-center'> 
      <div className="auth-container">
        
          <div className="auth-title">Elemon Tool Login</div>
          <button className="submit-button" onClick={()=>signIn()}>
            Login 
          </button>
       
      </div>
    </div>
  )
}

export default NotSignIn