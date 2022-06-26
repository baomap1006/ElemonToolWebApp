import type { NextPage } from "next";
import prisma from "../db/client";
// import styles from "../styles/Home.module.css";
import { trpc } from '../utils/trpc';

 const Home: NextPage = (props:any) => {
  const hello = trpc.useQuery(['hello', { text: 'client' }]);
  if (!hello.data) {
    return <div>Loading...</div>;
  }
  return (
    <div className={""}>
      <div className={"p-6 flex flex-col"}>
        <div className="flex flex-col">
          <div className="text-3xl font-bold underline">Questions</div>
          <p>{hello.data.greeting}</p>
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
