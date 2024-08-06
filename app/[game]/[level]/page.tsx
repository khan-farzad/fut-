"use client";
import axios from "axios";
import { ProblemType } from "@/lib/util";
import Loading from "./_components/Loading";
import { useParams } from "next/navigation";
import LeftPart from "./_components/LeftPart";
import RightPart from "./_components/RightPart";
import React, { useEffect, useState } from "react";
import VerticalDivider from "./_components/VerticalDivider";

export default function Home() {
  const ques = useParams();

  const [questionWidth, setQuestionWidth] = useState(50);
  const [problemDetail, setProblemDetail] = useState<ProblemType>();

  const getQuestionData = async () => {
    try {
      const response = await axios.post("/api", { titleSlug: ques.level });
      setProblemDetail(response.data.question);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getQuestionData();
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
