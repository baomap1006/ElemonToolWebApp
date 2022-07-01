import { useSession, signOut } from "next-auth/react";

export default function Component() {
  const { data: session, status } = useSession();
  // console.log(session)
  // console.log(process.env.NEXT_PUBLIC_DISCORD_ID)

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
    </div>
  );
}