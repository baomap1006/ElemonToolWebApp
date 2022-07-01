import { useSession, signOut } from "next-auth/react";
import Router from "next/router";
import { AppContext } from "./context/UserContext";
import { useContext } from "react";
export default function Component() {
  const { data: session, status } = useSession();
  // console.log(session)
  // console.log(process.env.NEXT_PUBLIC_DISCORD_ID)
  const user = useContext(AppContext).user!;

  if (status == "loading") return <div>Loading...</div>;

  return (
    <div className="flex-col w-full  items-start justify-start text-center text-2xl my-4 gap-4">
      <div className="my-8 text-left">
        Signed in as {session?.user?.name} <br />
        Email {session?.user?.email} <br />
      </div>

      <div className="justify-start flex">
        <button className="btn" onClick={() => signOut()}>
          Sign out
        </button>
      </div>
      {user && user.isAdmin && (
        <div className="justify-start flex my-4">
          <button className="btn" onClick={() => Router.push("/Admin")}>
            Admin
          </button>
        </div>
      )}
    </div>
  );
}
