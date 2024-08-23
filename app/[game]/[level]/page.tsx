"use client";
import { ProblemType, roadmap } from "@/lib/util";
import Loading from "./_components/Loading";
import { useParams } from "next/navigation";
import LeftPart from "./_components/LeftPart";
import RightPart from "./_components/RightPart";
import React, { useMemo, useState } from "react";
import VerticalDivider from "./_components/VerticalDivider";
import supabase from "@/lib/dbConfig";

export default function Home() {
  const ques: { game: string; level: string } = useParams();

  const [questionWidth, setQuestionWidth] = useState(50);
  const [problemDetail, setProblemDetail] = useState<ProblemType>();

  const getQuestionData = useMemo(async () => {
    try {
      const { data, error } = await supabase
        .from("Problems")
        .select("*")
        .eq("titleSlug", ques.level)
        .eq("roadmap", roadmap.indexOf(ques.game) + 1);
      setProblemDetail(data![0]);
    } catch (error) {
      console.log(error);
    }
  }, []);

  if (!problemDetail?.content) {
    return <Loading />;
  }

  return (
    <div className="h-screen flex w-full">
      <LeftPart problemDetail={problemDetail} questionWidth={questionWidth} />
      <VerticalDivider
        questionWidth={questionWidth}
        setQuestionWidth={setQuestionWidth}
      />
      <RightPart problemDetail={problemDetail} questionWidth={questionWidth} />
    </div>
  );
}
