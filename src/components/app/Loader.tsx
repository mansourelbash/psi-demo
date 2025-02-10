import React from 'react'
import { Loader } from "lucide-react";

const LoaderSpinner = () => {
  return (
    <div className="flex flex-col gap-2 justify-center items-center align-middle h-[400px]">
        <Loader className="animate-spin text-gray-500" size={60} />
        <h3 className="block text-center text-[20px]"> Loading ...</h3>
    </div>
  )
}

export default LoaderSpinner