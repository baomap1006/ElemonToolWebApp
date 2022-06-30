import { useSession, signIn, signOut } from "next-auth/react"

export default function Component() {
    const { data:session,status} = useSession()
    console.log(session)
    console.log(process.env.NEXT_PUBLIC_DISCORD_ID)

    if(status=="loading") return <div>Loading...</div>

    if (session) {
      return (
        <>
          Signed in as {session?.user?.name} <br />
          Email {session?.user?.email} <br />
          <button className="btn" onClick={() => signOut()}>Sign out</button>
        </>
      )
    }
    return (
      <>
        Not signed in <br />
        <button className="btn" onClick={() => signIn()}>Sign in</button>
      </>
    )
  }