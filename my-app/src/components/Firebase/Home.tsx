import type { NextPage } from "next";
import {prisma} from "../../db/client";
// import styles from "../styles/Home.module.css";
import { trpc } from '../../utils/trpc';
// import Input from '../components/Input'

 const Home: NextPage = (props:any) => {
  const {data,isLoading} = trpc.useQuery(['marketUser.getAllUsers'],{
    refetchOnWindowFocus: false,
  });
  
  console.log(data)
  if (isLoading||!data) {
    return <div>Loading...</div>;
  }
  return (
    <div className={""}>
        <code>
          {
            props.users
          }
          </code>
      <div className={"p-6 flex flex-col"}>
        <div className="flex flex-col">
          <div className="red">Test</div>
          {/* <Input /> */}
         
        
          
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
