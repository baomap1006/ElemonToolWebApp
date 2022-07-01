import React from "react";
import Data from "./Data/Data";
import SignIn from "./SignIn";

function MainItems() {
  return (
    <div className="grid grid-cols-1-5 ">
      <div className="Left-items h-screen border-r-2 border-spacing-1 border-indigo-300 px-4">
       
        <SignIn />
      </div>
      <div className="Right-items  h-screen">
        <Data />
      </div>
    </div>
  );
}

export default MainItems;
