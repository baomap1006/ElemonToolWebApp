import React from "react";

type ButtonProps = {
  page: number;
  setpage: React.Dispatch<React.SetStateAction<number>>;
  fetchInfo: (page: number) => Promise<void>;
  navigate: (dir?: number) => void;
};

function Buttons({ setpage, fetchInfo, navigate, page }: ButtonProps) {
  return (
    <div className="flex justify-center gap-4 w-full my-12">
      <button
        className="btn"
        onClick={() => {
          setpage(1);
          fetchInfo(1);
        }}
      >
        Home
      </button>
      <button className="btn" onClick={() => navigate(-1)}>
        Previous
      </button>
      <p className="text-center items-center text-justify">{`Page ${page}`}</p>
      <button className="btn" onClick={() => navigate(1)}>
        {" "}
        Next
      </button>
    </div>
  );
}

export default Buttons;
