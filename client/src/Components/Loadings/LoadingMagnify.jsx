import React from 'react'
import { Spinner } from "react-loading-io";

export default function LoadingMagnify({spin}) {
  return (
    spin && (
      <div className="w-full h-screen absolute top-0 left-0 bg-[#4ca7fd] flex flex-col items-center justify-center">
        <h1 className="absolute top-auto text-2xl text-white">Loading...</h1>
        <Spinner size={200} color={"#ffffff"} />
      </div>
    )
  )
}
