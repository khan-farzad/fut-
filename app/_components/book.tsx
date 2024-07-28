import Image from "next/image";
import React from "react";
import { FaArrowRight } from "react-icons/fa";

const Book = ({
  progress,
  title,
  desc,
}: {
  progress: number;
  title: string;
  desc: string;
}) => {
  return (
    <>
      <div className="size-full pl-14 pr-4 py-4 z-10 tracking-tighter flex flex-col gap-2 text-white">
        <div className="text-xs flex gap-2 items-center">
          <p>{progress}%</p>
          <div className=" bg-[#4d5178] w-full h-2 rounded-xl progress-bar">
            <div style={{width:progress+'%'}} className={`bg-white/40 h-full rounded-xl`}></div>
          </div>
        </div>
        <p className="font-semibold">{title}</p>
        <p className=" text-xs opacity-40">{desc}</p>
        <button className="text-white/50 rounded-xl w-fit self-end text-blac text-xs py-1 px-1 flex items-center gap-1">
          {progress > 0 ? "Continue" : "Start"} <FaArrowRight />
        </button>
      </div>
      <Image
        alt="book"
        src={"/book2.png"}
        height={199}
        width={199}
        className="size-full absolute top-0 -z-10"
      />
    </>
  );
};

export default Book;
