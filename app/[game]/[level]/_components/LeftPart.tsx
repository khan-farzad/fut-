import React, { useEffect, useState } from "react";
import Markdown from "markdown-to-jsx";
import { ProblemType } from "@/lib/util";
import { useParams, useRouter } from "next/navigation";
import { FaChevronLeft } from "react-icons/fa";
import { IoIosCheckmarkCircle } from "react-icons/io";

const LeftPart = ({
  problemDetail,
  questionWidth,
}: {
  questionWidth: number;
  problemDetail: ProblemType | undefined;
}) => {
  const router = useRouter();
  const ques: { game: string; level: string } = useParams();
  const difficulty = problemDetail?.difficulty;
  const questionData = problemDetail?.content;
  const [isSolved, setIsSolved] = useState(false);

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

  useEffect(() => {
    isAlreadySolved();
    window.addEventListener("correctSolution", () => {
      isAlreadySolved();
    });
  }, []);

  return (
    <div
      className="p-5 bg-background text-primary/90 overflow-auto"
      style={{ width: `${questionWidth}%` }}
    >
      <div className="flex items-center justify-between">
        <div className="flex gap-4 items-center mb-5">
          <FaChevronLeft
            onClick={() => router.back()}
            className="cursor-pointer"
          />
          <p className="font-bold text-[#d4d4d4]">{problemDetail?.title}</p>
        </div>
        {isSolved && (
          <p className="text-green-500 flex gap-1.5 items-center">
            Solved
            <IoIosCheckmarkCircle className="text-green-500" />
          </p>
        )}
      </div>
      <p
        className={`mb-2 ring-1 w-fit px-2 py-1 rounded-2xl text-sm ${
          difficulty === "Hard"
            ? "text-red-500 ring-red-400"
            : difficulty === "Easy"
            ? "text-green-600 ring-green-500"
            : "text-lime-500 ring-lime-400"
        }`}
      >
        {difficulty}
      </p>
      <div className="text-sm">
        <Markdown>{questionData!}</Markdown>
      </div>
    </div>
  );
};

export default LeftPart;
