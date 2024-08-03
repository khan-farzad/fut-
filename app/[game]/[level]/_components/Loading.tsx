import React from "react";
import Image from "next/image";
import logo2 from "@/public/logo2.png";

const Loading = () => {
  return (
    <div className="bg-zinc-900 h-screen flex-center w-full">
      <h1 className="flex items-center text-4xl text-[#D41F30] animate-bounce">
        <Image alt="logo" src={logo2} className="w-80" placeholder="blur" />-
      </h1>
    </div>
  );
};

export default Loading;
