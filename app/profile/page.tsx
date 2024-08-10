"use client";
import { RxAvatar } from "react-icons/rx";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaAngleDown } from "react-icons/fa";
import { number_of_questions } from "@/lib/util";
import Submissions from "./_components/Submissions";
import { BsBookmarkCheckFill } from "react-icons/bs";
import { IoIosCheckmarkCircle } from "react-icons/io";
import TotalPoints from "../[game]/_components/TotalPoints";

const Home = () => {
  const [solvedQues, setSolvedQues] = useState<string[]>();
  const [bookmarkedQues, setBookmarkedQues] = useState<string[]>();
  const [showSolvedQues, setShowSolvedQues] = useState(false);
  const [showBookmarked, setShowBookmarked] = useState(false);
  const [waterLevel, setWaterLevel] = useState<number[]>([0, 0, 0]);

  const validGame = ["noob-to-pro", "blind-75", "cap"] as const;
  const visibleNames = ["Noob-to-Pro", "Blind-75", "CAP"];

  const getSolvedQues = () => {
    try {
      let tempQues: string[] = [];
      let waterLevels: number[] = [0, 0, 0];
      validGame.forEach((game) => {
        const localGame = localStorage.getItem(game);
        if (!localGame) return;
        tempQues.push(JSON.parse(localGame));
        waterLevels[validGame.indexOf(game)] = Math.floor(
          (JSON.parse(localGame).length * 100) / number_of_questions[game]
        );
      });
      tempQues = tempQues.flat();
      setWaterLevel(waterLevels);
      setSolvedQues(tempQues);
    } catch (error) {}
  };

  const getBookmarkedQues=()=>{
    const bookmarks=localStorage.getItem('bookmarks')
    if(!bookmarks) return
    setBookmarkedQues(JSON.parse(bookmarks))
  }

  useEffect(() => {
    getSolvedQues();
    getBookmarkedQues()
  }, []);

  return (
    <div className="bg-background min-h-screen flex">
      <div className="w-1/5  flex justify-start items-center flex-col border-r-this-green border-r-2 text-tertiary gap-5 min-h-full">
        <RxAvatar size={150} className="mt-20" />
        <h2>Anonymous</h2>
        <TotalPoints />
        <p>Rank: - </p>
        {/* <p className="ring-1 ring-this-green px-2 py-1 rounded-xl">Get global rank</p> */}
      </div>
      <div className="grow h-full flex flex-col justify-start items-center gap5 pt-10">
        <div className="flex-center gap-20">
          {validGame.map((g, i) => (
            <div
              key={i}
              className="size-36 border rounded-b-xl relative overflow-hidden bg-[#80c5de]  flex-center"
            >
              <div
                style={{ bottom: `${waterLevel[i]}%` }}
                className="absolute size-[200%] bg-background -left-[50%] rounded-[40%] water"
              ></div>
              <div className="z-10 self-end text-primary">{waterLevel[i]}%</div>
              <div className="z-10 absolute top-0 self-end text-primary">
                {visibleNames[i]}
              </div>
            </div>
          ))}
        </div>
        <div className="w-full text-tertiary px-2 mt-10">
          <button
            onClick={() => setShowSolvedQues(!showSolvedQues)}
            className=" w-full p-2 text-left font-bold text-lg flex justify-between items-center shadow-sm shadow-white"
          >
            <p className="text-green-500 flex gap-1.5 items-center">
              <IoIosCheckmarkCircle className="text-green-500" />
              Solved Questions
            </p>{" "}
            <FaAngleDown
              className={`${
                showSolvedQues && "rotate-180"
              } transition-transform duration-300`}
            />
          </button>
          <div
            className={`flex-col flex bg-tertiary/10 max-h-52 ${
              !showSolvedQues ? "h-0" : "h-52"
            } transition-[height] duration-300 overflow-auto`}
          >
            {solvedQues &&
              solvedQues.map((q, idx) => (
                <button
                  key={idx}
                  className={`p-2 text-start ${
                    idx % 2 == 0 && "bg-tertiary/20 "
                  }`}
                >
                  {q}
                </button>
              ))}
          </div>
        </div>
        <div className="w-full text-tertiary px-2 mt-4">
          <button
            onClick={() => setShowBookmarked(!showBookmarked)}
            className=" w-full p-2 text-left font-bold text-lg flex justify-between items-center shadow-sm shadow-white"
          >
            <p className="text-green-500 flex gap-1.5 items-center">
              <BsBookmarkCheckFill className="text-green-500" />
              Bookmarked Questions
            </p>{" "}
            <FaAngleDown
              className={`${
                showBookmarked && "rotate-180"
              } transition-transform duration-300`}
            />
          </button>
          <div
            className={`flex-col flex bg-tertiary/10 max-h-52 ${
              !showBookmarked ? "h-0" : "max-h-52"
            } transition-[height] duration-300 overflow-auto`}
          >
            {bookmarkedQues &&
              bookmarkedQues.map((q, idx) => (
                <button
                  key={idx}
                  className={`p-2 text-start ${
                    idx % 2 == 0 && "bg-tertiary/20 "
                  }`}
                >
                  {q}
                </button>
              ))}
          </div>
        </div>
        <Submissions />
      </div>
    </div>
  );
};
export default Home;
