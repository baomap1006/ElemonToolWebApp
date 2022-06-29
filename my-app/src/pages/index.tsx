import type { NextPage } from "next";
import { useContext } from "react";
import Header from "./components/Header";
// import styles from "../styles/Home.module.css";
import { ReactQueryDevtools } from "react-query/devtools";
import { AppWrapper, AppContext } from "./context/UserContext";
import Input from "./components/Input";
import SignInScreen from "./components/Firebase/Auth";
import Data from "./components/Data";
import { MoralisProvider } from "react-moralis";

const Home: NextPage = (props: any) => {
  const context = useContext(AppContext);
  let appId: string = process.env.NEXT_PUBLIC_MORALIS_APP_ID || "";
  let serverUrl: string = process.env.NEXT_PUBLIC_MORALIS_SERVERURL || "";
  return (
    <AppWrapper>
      <MoralisProvider serverUrl={serverUrl} appId={appId}>
        <SignInScreen>
          <Header user={context.user!} />
          {/* <Data /> */}
        </SignInScreen>
      </MoralisProvider>
      <ReactQueryDevtools />
    </AppWrapper>
  );
};

export default Home;
