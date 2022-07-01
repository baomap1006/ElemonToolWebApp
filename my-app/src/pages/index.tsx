import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { ReactQueryDevtools } from "react-query/devtools";
import { AppWrapper } from "../components/context/UserContext";
import Data from "../components/Data/Data";
import { MoralisProvider } from "react-moralis";

import NotSignIn from "../components/NotSignIn";
import MainItems from "../components/MainItems";
const Home: NextPage = (props: any) => {
  const { data: session, status } = useSession();
  let appId: string = process.env.NEXT_PUBLIC_MORALIS_APP_ID || "";
  let serverUrl: string = process.env.NEXT_PUBLIC_MORALIS_SERVERURL || "";

  return (
    <AppWrapper>
    <MoralisProvider serverUrl={serverUrl} appId={appId}>
      {status==="loading" && <div>Loading...</div>}
      {session && <MainItems />}
      {!session && <NotSignIn/>}     

      <ReactQueryDevtools />
    </MoralisProvider>

    </AppWrapper>
  );
};

export default Home;
