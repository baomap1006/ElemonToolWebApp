import type { NextPage } from "next";
// import { useContext } from "react";
import Header from "../components/Header";
// import styles from "../styles/Home.module.css";
import { ReactQueryDevtools } from "react-query/devtools";
// import { AppWrapper, AppContext } from "../components/context/UserContext";
// import SignInScreen from "../components/Firebase/Auth";
import Data from "../components/Data";
import { MoralisProvider } from "react-moralis";

import NewSignIn from '../components/NewSignIn'

const Home: NextPage = (props: any) => {
  // const context = useContext(AppContext).user;
  let appId: string = process.env.NEXT_PUBLIC_MORALIS_APP_ID || "";
  let serverUrl: string = process.env.NEXT_PUBLIC_MORALIS_SERVERURL || "";
  return (
    // <AppWrapper>
      <MoralisProvider serverUrl={serverUrl} appId={appId}>
        {/* <SignInScreen>
          <Header  />
          <Data  />
        </SignInScreen> */}
         {/* <Header  /> */}
         <NewSignIn />
          <Data  />
          
          <ReactQueryDevtools />
      </MoralisProvider>
    
    // </AppWrapper>
  );
};

export default Home;
