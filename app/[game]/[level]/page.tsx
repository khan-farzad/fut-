"use client";
import { MetaDataType, ProblemType } from "@/lib/util";
import { Editor } from "@monaco-editor/react";
import axios from "axios";
import Markdown from "markdown-to-jsx";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { IoIosCheckmark, IoIosClose, IoIosPlay } from "react-icons/io";
import spin from "@/public/spin.svg";
import logo2 from "@/public/logo2.png";

const page = () => {
  const ques = useParams();
  const router = useRouter();

  const [ans, setAns] = useState("");
  const [error, setError] = useState("");
  const [output, setOutput] = useState<string[]>([]);
  const [isCompiling, setIsCompiling] = useState(false);
  const [expected, setExpected] = useState<string[]>([]);
  const [questionWidth, setQuestionWidth] = useState(50);
  const [selectedLang, setSelectedLang] = useState("cpp");
  const [solutionHeight, setSolutionHeight] = useState(50);
  const [activeTestCaseIndex, setActiveTestCaseIndex] = useState(0);
  const [problemDetail, setProblemDetail] = useState<ProblemType>();

  const qId = problemDetail?.questionId;
  const questionData = problemDetail?.content;
  const difficulty = problemDetail?.difficulty;
  const languages = problemDetail?.codeSnippets;
  let metaDataString = problemDetail?.metaData;
  let metaData: MetaDataType = metaDataString
    ? JSON.parse(metaDataString.replaceAll("\n", ""))
    : undefined;
  let exampleTestcases = problemDetail?.exampleTestcases.split("\n");

  const getQuestionData = async () => {
    try {
      const response = await axios.post("/api", { titleSlug: ques.level });
      setProblemDetail(response.data.question);
      setAns(response.data.question.codeSnippets[0].code);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRun = async () => {
    setIsCompiling(true);
    try {
      const response = await axios({
        method: "post",
        url: "/api/run",
        data: {
          typed_code: ans,
          question_id: qId,
          lang: selectedLang,
          titleSlug: ques.level,
          data_input: problemDetail?.exampleTestcases,
        },
      });
      setOutput(response.data.data.code_answer);
      setExpected(response.data.data.expected_code_answer);
      setError(response.data.data.compile_error);
      if (response.data.data.runtime_error)
        setError(response.data.data.runtime_error);
      if (
        response.data.data.compare_result &&
        response.data.data.compare_result.indexOf("0") !== -1
      )
        setActiveTestCaseIndex(response.data.data.compare_result.indexOf("0"));
    } catch (error) {
      console.log(error);
    } finally {
      setIsCompiling(false);
    }
  };

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

  const handleHeightChange = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault();
    const startY = e.clientY;
    const startHeight = solutionHeight;
    const handleMouseMove = (e: { clientY: number }) => {
      const newHeight =
        startHeight - ((startY - e.clientY) / window.innerHeight) * 100;
      setSolutionHeight(newHeight);
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  useEffect(() => {
    getQuestionData();
  }, []);

  if (!questionData) {
    return (
      <div className="bg-zinc-900 h-screen flex-center">
        <h1 className="flex items-center text-4xl text-[#D41F30] animate-bounce">
          <Image alt="logo" src={logo2} className="w-80" placeholder="blur" />-
        </h1>
      </div>
    );
  }

  return (
    <div className="h-screen flex w-full">
      <div
        className="p-5 bg-background text-primary/90 overflow-auto"
        style={{ width: `${questionWidth}%` }}
      >
        <div className="flex gap-4 items-center mb-5">
          <FaChevronLeft
            onClick={() => router.back()}
            className="cursor-pointer"
          />
          <p className="font-bold text-[#d4d4d4]">{problemDetail?.title}</p>
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
          <Markdown>{questionData}</Markdown>
        </div>
      </div>
      <div
        className="w-0.5 cursor-ew-resize bg-secondary hover:bg-tertiary"
        onMouseDown={handleMouseDown}
      />
      <div
        style={{ width: `${100 - questionWidth}%` }}
        className="flex flex-col bg-[#1E1E1E] text-primary relative"
      >
        <div className="flex justify-between text-sm items-center px-6 py-2">
          <select
            className="bg-transparent outline-none text-white"
            onChange={(e) => {
              setSelectedLang(e.target.value);
              const langIdx: number = languages!.findIndex(
                (el) => el.langSlug === e.target.value
              );
              setAns(languages![langIdx].code);
            }}
          >
            {languages &&
              languages.map((l, i) => (
                <option key={`${l.langSlug}-${i}`} value={l.langSlug}>
                  {l.lang}
                </option>
              ))}
          </select>
          <button className="text-white/55 flex-center" onClick={handleRun}>
            {isCompiling ? (
              <Image
                src={spin}
                alt="spin"
                className="animate-spin size-2.5 mr-1"
              />
            ) : (
              <IoIosPlay className="text-primary mr-1" />
            )}
            Run
          </button>
        </div>
        <Editor
          height={`${solutionHeight}%`}
          width="100%"
          language={selectedLang}
          value={ans}
          theme="vs-dark"
          options={{
            fontSize: 16,
          }}
          onChange={(e: any) => setAns(e)}
        />
        <div
          className="h-0.5 w-full bg-secondary hover:bg-tertiary cursor-ns-resize"
          onMouseDown={handleHeightChange}
        ></div>
        <div
          style={{ height: `${100 - solutionHeight}%` }}
          className="overflow-y-scroll w-full flex flex-col my-2"
        >
          <div className="flex ">
            {Array.from(
              { length: exampleTestcases!.length / metaData.params.length },
              (_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTestCaseIndex(i)}
                  className={`${
                    i == activeTestCaseIndex
                      ? "text-tertiary scale-y-105"
                      : "text-secondary"
                  }  mx-4 text-center text-sm uppercase hover:text-tertiary h-fit flex-center transition-[scale]`}
                >
                  <p className="ml-1">Case {i + 1}</p>
                  {output &&
                    output.length > 0 &&
                    (output[i] === expected[i] ? (
                      <IoIosCheckmark className="text-lime-400 size-6" />
                    ) : (
                      <IoIosClose className="text-[#D41F30] size-6" />
                    ))}
                </button>
              )
            )}
          </div>
          <div>
            {metaData.params.map((p, j) => (
              <div
                key={`exampleTestCase-${j}`}
                className="flex flex-col gap-1.5 mt-3"
              >
                <p className="text-sm text-secondary ml-4">{p.name}=</p>
                <p className="bg-secondary/10 rounded-lg p-2 mx-4 min-w-2/5 tracking-widest">
                  {exampleTestcases &&
                    exampleTestcases[
                      activeTestCaseIndex * metaData.params.length + j
                    ]}
                </p>
              </div>
            ))}
            {error && (
              <div className="flex flex-col gap-1.5 mt-3">
                <p className="text-sm text-secondary ml-4">Error</p>
                <p className="bg-secondary/10 rounded-lg p-2 mx-4 min-w-2/5 text-sm">
                  {error}
                </p>
              </div>
            )}
            {output && output.length > 0 && (
              <div className="flex flex-col gap-1.5 mt-3">
                <p className="text-sm text-secondary ml-4">Output</p>
                <p className="bg-secondary/10 rounded-lg p-2 mx-4 min-w-2/5 tracking-widest">
                  {output[activeTestCaseIndex]}
                </p>
              </div>
            )}
            {expected && expected.length > 0 && (
              <div className="flex flex-col gap-1.5 mt-3">
                <p className="text-sm text-secondary ml-4">Expected</p>
                <p className="bg-secondary/10 rounded-lg p-2 mx-4 min-w-2/5 tracking-widest">
                  {expected[activeTestCaseIndex]}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
