import React from "react";
import { useEffect, useState } from "react";
import { useAppContext } from "../../components/context/UserContext";
import { useContext } from "react";
type Props = {};
import axios from "axios";
import { User } from "@prisma/client";



function Admin({}: Props) {
  const user = useAppContext()?.user!;
  const [users, setusers] = useState<User[]>();
  async function getusers(){
    return axios.get("/api/myusers").then((res) => {
      console.log(res.data)
      setusers(res.data!)
    }).catch(err=>console.log(err));
  }
  useEffect(() => {
    getusers()
    
  }, []);
  const changePay = (u:User) =>{
    console.log(u.PaymentStatus,!u.PaymentStatus)
    axios.post(`/api/updatePayStatus?id=${u.id}&status=${u.PaymentStatus===true?"false":"true"}`).then((res)=>{
      console.log(res);
      getusers()
    }).catch(err=>console.log(err))
  }
  return (
    <div>
      <div>Admin Page</div>
      <div>
        <table>
          <thead className="basic-color gap-2  w-full table-header-group">
            <tr className="basic-color gap-2  w-full table-row">
              <th className="table-cell">ID</th>
              <th className="table-cell">Name</th>
              <th className="table-cell">Email</th>
              <th className="table-cell"> Payment Status</th>
              <th className="table-cell"> Admin Status</th>
              <th className="table-cell"> Actions</th>
            </tr>
          </thead>
          <tbody>
            {users?.length &&
              users.map((u) => {
                let isPaid = (PaymentStatus:boolean)=> PaymentStatus? "Paid" :"Not Paid"
                return (
                  <tr key={u.id}>
                    <td className="table-cell">{u.id}</td>
                    <td className="table-cell">{u.name}</td>
                    <td className="table-cell">{u.email}</td>
                    <td className="table-cell"> {isPaid(u.PaymentStatus)}</td>
                    <td className="table-cell"> {u.isAdmin ? "Admin":"Not Admin"}</td>
                    <td className="table-cell"> 
                      <div>
                        <button onClick={()=>changePay(u)}>Change {isPaid(u.PaymentStatus)} to {isPaid(!u.PaymentStatus)}</button>
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Admin;
