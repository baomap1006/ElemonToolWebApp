import React, { FormEvent, useState } from "react";
import { trpc } from '../../utils/trpc';

// type Props = {}

const MyComponent: React.FC = () => {
  const [wallet, setwallet] = useState<string>("");

  const { data, refetch ,isLoading,isFetching} = trpc.useQuery(['user.getByWallet', {wallet:"0x0eee931abab9c24644f1b678c02f768167e148c2"}], {
    refetchOnWindowFocus: false,
    enabled: false ,
    onError:(e)=>console.log(e.message)
  });
  const submitEvent = (e: FormEvent) => {
    e.preventDefault();
    console.log(wallet);
    refetch()
  };
  return (
    <div className="grid gap-4">
      <form className="grid m-4 gap-4" action="" onSubmit={submitEvent}>
        <input
          className=" border-1 border-indigo-500 outline outline-indigo-500 rounded-md p-2 text-indigo-600"
          type="text"
          value={wallet}
          onChange={(e) => {
            setwallet(e.target.value);
          }}
        />
        <div className = "flex gap-2">
          <button className="btn" type="submit">
            Submit
          </button>
          <button className="btn" onClick={(e) => setwallet("")}>
            clear
          </button>
        </div>
      </form>
      <code>
      {data && JSON.stringify(data)}
      </code>
    </div>
  );
};

export default MyComponent;
