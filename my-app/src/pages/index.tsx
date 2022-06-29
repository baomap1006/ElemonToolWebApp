import type { NextPage } from "next";
import { useContext } from "react";
import Header from './components/Header'
// import styles from "../styles/Home.module.css";
import { ReactQueryDevtools } from 'react-query/devtools'
import { AppWrapper,AppContext } from './context/UserContext';
import Input from "./components/Input";
import SignInScreen from "./components/Firebase/Auth";

const Home: NextPage = (props: any) => {
  const context = useContext(AppContext)
  
  return (
    <AppWrapper>

   
    <SignInScreen >
       <Header user={context.user!} />
    </SignInScreen>
    <ReactQueryDevtools/>
    </AppWrapper>
  );
};

export default Home;
