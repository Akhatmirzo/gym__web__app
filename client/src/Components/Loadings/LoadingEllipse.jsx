import React from "react";
import { Eclipse } from "react-loading-io";

export default function LoadingEllipse({ loading }) {
  return (
    loading && (
      <div className="w-full h-screen fixed top-0 left-0 bg-[#4ca7fd] flex flex-col items-center justify-center">
        <h1 className="absolute top-auto text-2xl text-white">Loading...</h1>
        <Eclipse size={200} color={"#ffffff"} />
      </div>
    )
  );
}
