"use client";

import supabase from "@/lib/dbConfig";
import { WebDQuestionType } from "@/lib/util";
import Question from "./_components/Question";
import FlashCard from "./_components/FlashCard";
import React, { useMemo, useState } from "react";
import MovingGrid from "./_components/MovingGrid";

const page = () => {
  const [showCard, setShowCard] = useState(false);
  const [activeQues, setActiveQues] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [questions, setQuestions] = useState<WebDQuestionType[]>([]);

  useMemo(async () => {
    const { data, error } = await supabase.from("webD").select("*");
    setQuestions(data!);
    setIsLoading(false);
  }, []);

  return (
    <div className="h-screen bg-[#f1f1f1] dark:bg-black dark:text-white flex-center ">
      {showCard && (
        <FlashCard
          questionData={questions[activeQues]}
          setShowCard={setShowCard}
        />
      )}
      <div
        onClick={() => showCard && setShowCard(false)}
        className="relative w-1/5 h-screen"
      >
        <MovingGrid />
      </div>
      <div className="w-3/5 border h-full flex flex-col overflow-clip  border-black/10 dark:border-white/10">
        <div className="p-5">
          <h1 className="text-5xl font-semibold">Frontend Questions</h1>
          <p className="my-2 text-black/40 dark:text-white/40">
            Here are carefully curated, high-quality front-end questions
            designed for last-minute revision.
          </p>
        </div>

        <div className="px-5 py-3 flex-center gap-10 text-black/50 dark:text-white/50 text-center">
          <p className="w-20 ">Language</p>
          <p className="grow text-start">Question</p>
          <p className="w-20">Experience</p>
        </div>
        {isLoading ? (
          <div className="overflow-auto grow">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="px-5 py-3 animate-pulse *:dark:bg-neutral-800 *:bg-gray-200 flex-center gap-10 border border-dashed border-x-0 border-black/20 text-center cursor-pointer active:scale-95"
              >
                <p className="h-10 w-20  rounded-lg" />
                <p className="grow text-start line-clamp-1 h-6 rounded-xl" />
                <p className="w-20 shrink-0 rounded-xl h-6" />
              </div>
            ))}
          </div>
        ) : (
          <div className="overflow-auto grow">
            {questions.map((ques, i) => (
              <Question
                i={i}
                ques={ques}
                setActiveQues={setActiveQues}
                setShowCard={setShowCard}
              />
            ))}
          </div>
        )}
      </div>
      <div
        onClick={() => showCard && setShowCard(false)}
        className="relative w-1/5 h-full rotate-180"
      >
        <MovingGrid />
      </div>
    </div>
  );
};

export default page;
