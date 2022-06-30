import { useSession, signIn, signOut } from "next-auth/react"

export default function Component() {
    const { data:session,status} = useSession()
    // console.log(session)
    // console.log(process.env.NEXT_PUBLIC_DISCORD_ID)

    if(status=="loading") return <div>Loading...</div>

    if (session) {
      return (
        <div className="flex-col w-full  items-center justify-center text-center text-2xl my-4 gap-4">
          <div className="my-2">
          Signed in as {session?.user?.name} <br />
          Email {session?.user?.email} <br />
          </div>
          
          <button className="btn" onClick={() => signOut()}>Sign out</button>
        </div>
      )
    }
    return (
      <div className="flex-col w-full  items-center justify-center">
        Not signed in <br />
        <button className="btn" onClick={() => signIn()}>Sign in</button>
      </div>
    )
  }