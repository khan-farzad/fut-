import { useEffect, useState } from "react";
import Hints from "./_leftPartComponents/Hints";
import Video from "./_leftPartComponents/Video";
import Problem from "./_leftPartComponents/Problem";
import { ProblemType } from "@/lib/util";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { useParams, useRouter } from "next/navigation";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { BsBookmark, BsBookmarkCheckFill } from "react-icons/bs";
import supabase from "@/lib/dbConfig";
const FIRST_QUES_ID = 11;
const LAST_QUES_ID = 376;

const LeftPart = ({
  problemDetail,
  questionWidth,
}: {
  questionWidth: number;
  problemDetail: ProblemType | undefined;
}) => {
  const router = useRouter();
  const [tab, setTab] = useState("Problem");
  const questionData = problemDetail?.content;
  const difficulty = problemDetail?.difficulty;
  const [isSolved, setIsSolved] = useState(false);
  const [activeTabIdx, setActiveTabIdx] = useState(0);
  const ques: { game: string; level: string } = useParams();

  const handleChangeQuestion = async (change: number) => {
    try {
      const { data, error } = await supabase
        .from("Problems")
        .select("titleSlug")
        .eq("id", problemDetail?.id! + change);
      router.push(`${data![0].titleSlug}`);
    } catch (error) {}
  };

  const isAlreadySolved = () => {
    try {
      const localGame =
        localStorage.getItem(ques.game) &&
        localStorage.getItem(ques.game)?.includes(ques.level);
      if (localGame) setIsSolved(localGame);
    } catch (error) {
      console.log(error);
    }
  };

  const getIsBookmarked = () => {
    const bookmarks = localStorage.getItem("bookmarks");
    if (!bookmarks) {
      return false;
    }
    return JSON.parse(bookmarks).indexOf(ques.level) >= 0 ? true : false;
  };
  const [isBookmarked, setIsBookmarked] = useState(getIsBookmarked());

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    const bookmarks = localStorage.getItem("bookmarks");
    if (!bookmarks) {
      localStorage.setItem("bookmarks", JSON.stringify([ques.level]));
      return;
    }
    const isAlreadyBookmarked = JSON.parse(bookmarks).indexOf(ques.level);
    let tmp = JSON.parse(bookmarks);
    if (isAlreadyBookmarked === -1) {
      tmp.push(ques.level);
      localStorage.setItem("bookmarks", JSON.stringify(tmp));
      return;
    }
    tmp.splice(isAlreadyBookmarked, 1);
    localStorage.setItem("bookmarks", JSON.stringify(tmp));
  };

  useEffect(() => {
    isAlreadySolved();
    window.addEventListener("correctSolution", () => {
      isAlreadySolved();
    });
  }, []);

  let tabs = ["Problem", "Video"];

  if (problemDetail?.hints && problemDetail.hints.length > 0)
    tabs.splice(1, 0, "Hints");

  return (
    <div
      className=" bg-background text-primary/90 overflow-auto"
      style={{ width: `${questionWidth}%` }}
    >
      <div className="flex items-center justify-between p-5">
        <div className="flex gap-4 items-center mb5">
          <FaChevronLeft
            onClick={() => router.back()}
            className="cursor-pointer"
          />
          <p className="font-bold text-[#d4d4d4]">{problemDetail?.title}</p>
          <p
            className={`ring-1 w-fit px-2 py-1 rounded-2xl text-xs ${
              difficulty === "Hard"
                ? "text-red-500 ring-red-400"
                : difficulty === "Easy"
                ? "text-green-600 ring-green-500"
                : "text-lime-500 ring-lime-400"
            }`}
          >
            {difficulty}
          </p>
        </div>
        {isSolved && (
          <p className="text-green-500 flex gap-1.5 items-center">
            Solved
            <IoIosCheckmarkCircle className="text-green-500" />
          </p>
        )}
      </div>
      <div className="px-4 relative flex justify-between items-center">
        <div
          style={{ left: `${activeTabIdx * 80 + 16}px` }}
          className="absolute bottom-0 h-0.5 w-20 bg-tertiary transition-[left] duration-500"
        />
        <div>
          {tabs.map((tab, idx) => (
            <button
              key={idx}
              onClick={() => {
                setTab(tab), setActiveTabIdx(idx);
              }}
              className=" px-2 py-1 w-20"
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="flex-center gap-2 text-tertiary/70">
          <button onClick={handleBookmark} className="active:scale-95">
            {isBookmarked ? (
              <BsBookmarkCheckFill className="text-this-green" />
            ) : (
              <BsBookmark />
            )}
          </button>
          <button
            disabled={problemDetail?.id === FIRST_QUES_ID}
            onClick={() => handleChangeQuestion(-1)}
            className="active:scale-95 hover:opacity-45 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <FaChevronLeft />
          </button>
          <button
            disabled={problemDetail?.id === LAST_QUES_ID}
            onClick={() => handleChangeQuestion(1)}
            className="active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 hover:opacity-45"
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
      {tab == "Problem" && <Problem questionData={questionData} />}
      {tab == "Hints" && <Hints hints={problemDetail?.hints} />}
      {tab == "Video" && <Video ytSlug={problemDetail!.ytSlug} />}
    </div>
  );
};

export default LeftPart;
