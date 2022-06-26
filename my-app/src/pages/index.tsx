import type { NextPage } from "next";
import {prisma} from "../db/client";
// import styles from "../styles/Home.module.css";
import { trpc } from '../utils/trpc';
import Input from './components/Input'

 const Home: NextPage = (props:any) => {
  const {data,isLoading} = trpc.useQuery(['user.getAllUsers']);
  if (isLoading||!data) {
    return <div>Loading...</div>;
  }
  return (
    <div className={""}>
      <div className={"p-6 flex flex-col"}>
        <div className="flex flex-col">
          <div className="text-3xl font-bold underline">Questions</div>
          <Input />
          <p className="my-2">{JSON.stringify(data.info)}</p>
          <code>
          {
            props.users
          }
          </code>
          
        </div>


      </div>
    </div>
  );
};

export default Home;

export const getServerSideProps = async ()=>{
  const users = await prisma.users.findMany()
  return{
    props:{
      users:JSON.stringify(users)
    }
  }
}
