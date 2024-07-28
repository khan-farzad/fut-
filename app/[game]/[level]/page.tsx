"use client";
import { Editor } from "@monaco-editor/react";
import axios from "axios";
import Markdown from "markdown-to-jsx";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaChevronLeft } from "react-icons/fa";

const page = () => {
  const [questionData, setQuestionData] = useState("");
  const [questionWidth, setQuestionWidth] = useState(50);
  const [initialCode, setInitialCode] = useState();
  const [difficulty, setDifficulty] = useState();
  const [topics, setTopics] = useState<any>();
  const router = useRouter();
  const ques = useParams();

  const getQuestionData = async () => {
    try {
      const response = await axios.post("/api", { titleSlug: ques.level });
      console.log(response);
      setTopics(response.data.question.topicTags);
      console.log(response.data.question.topicTags);
      setDifficulty(response.data.question.difficulty);
      setInitialCode(response.data.question.codeSnippets[2].code);
      setQuestionData(response.data.question.content);
    } catch (error) {}
  };

  useEffect(() => {
    getQuestionData();
  }, []);

  if (!questionData) {
    return (
      <div className="bg-zinc-900 h-screen flex-center">
        <h1 className="flex items-center text-4xl text-[#D41F30] animate-bounce">
          <Image alt="logo" src={"/logo2.png"} height={199} width={199} />-
        </h1>
      </div>
    );
  }

  const handleMouseDown = (e: any) => {
    e.preventDefault();

    const startX = e.clientX;
    const startWidth = questionWidth;

    const handleMouseMove = (e: { clientX: number }) => {
      const newWidth =
        startWidth + ((e.clientX - startX) / window.innerWidth) * 100;
      setQuestionWidth(newWidth);
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <div className="h-screen flex w-full">
      <div
        className="p-5 bg-zinc-800 text-white overflow-auto"
        style={{ width: `${questionWidth}%` }}
      >
        <div className="flex gap-4 items-center mb-5">
          <FaChevronLeft
            onClick={() => router.back()}
            className="cursor-pointer"
          />
          <p className="font-bold">{ques.level}</p>
        </div>
        <p className="mb-2 ring-white ring-1 w-fit px-2 py-1 rounded-2xl text-sm">
          {difficulty}
        </p>
        <div className="flex gap-3 text-xs">
          {topics &&
            topics.map((ele: any, idx: React.Key) => (
              <p
                key={idx}
                className="ring-white ring-1 w-fit px-2 py-1 rounded-2xl mb-4"
              >
                {ele.name}
              </p>
            ))}
        </div>
        <div className="text-sm">
          <Markdown>{questionData}</Markdown>
        </div>
      </div>
      <div
        className="w-[0.1rem] cursor-ew-resize bg-gray-300"
        onMouseDown={handleMouseDown}
      />
      <Editor
        height="100vh"
        width={`${100 - questionWidth}%`}
        defaultLanguage="python"
        className="bg-neutral-500"
        theme="vs-dark"
        defaultValue={initialCode}
      />
    </div>
  );
};

export default page;
