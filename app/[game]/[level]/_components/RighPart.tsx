import axios from "axios";
import { useState } from "react";
import Terminal from "./Terminal";
import Confetti from "react-confetti";
import EditorHeader from "./EditorHeader";
import { useParams } from "next/navigation";
import { IoDiamond } from "react-icons/io5";
import { Editor } from "@monaco-editor/react";
import { MetaDataType, ProblemType } from "@/lib/util";

const RighPart = ({
  questionWidth,
  problemDetail,
}: {
  questionWidth: number;
  problemDetail: ProblemType | undefined;
}) => {
  const ques: { game: string; level: string } = useParams();
  const [error, setError] = useState("");
  const [output, setOutput] = useState<string[]>([]);
  const [isCompiling, setIsCompiling] = useState(false);
  const [expected, setExpected] = useState<string[]>([]);
  const [solutionHeight, setSolutionHeight] = useState(50);
  const [selectedLang, setSelectedLang] = useState("python");
  const [showPointsModal, setShowPointsModal] = useState(false);
  const [activeTestCaseIndex, setActiveTestCaseIndex] = useState(0);
  const [ans, setAns] = useState(problemDetail?.codeSnippets[2].code);

  const qId = problemDetail?.questionId;
  let metaData: MetaDataType = JSON.parse(
    problemDetail!.metaData.replaceAll("\n", "")
  );
  let exampleTestcases = problemDetail?.exampleTestcases.split("\n");

  const addProgress = () => {
    try {
      const prevProgress = localStorage.getItem(ques.game);
      if (!prevProgress) {
        localStorage.setItem(ques.game, JSON.stringify([ques.level]));
        return;
      }
      let prevProgressObj = JSON.parse(prevProgress);
      !prevProgressObj.includes(ques.level) &&
        (prevProgressObj.push(ques.level),
        localStorage.setItem(ques.game, JSON.stringify(prevProgressObj)));
    } catch (error) {}
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
      setError(response.data.data.compile_error);
      setExpected(response.data.data.expected_code_answer);
      if (response.data.data.runtime_error)
        setError(response.data.data.runtime_error);
      if (
        response.data.data.compare_result &&
        response.data.data.compare_result.indexOf("0") !== -1
      )
        setActiveTestCaseIndex(response.data.data.compare_result.indexOf("0"));
      if (response.data.data.correct_answer === true) {
        addProgress();
        setShowPointsModal(true);
        setTimeout(() => {
          setShowPointsModal(false);
        }, 5000);
        window.dispatchEvent(new Event("correctSolution"));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsCompiling(false);
    }
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
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mousemove", handleMouseMove);
    };

    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mousemove", handleMouseMove);
  };
  return (
    <>
      {showPointsModal && (
        <div className="absolute inset-0 size-full bg-black/30 z-[100] flex-center text-white text-4xl">
          <div className=" top-2 right-10 flex-center gap-2">
            <Confetti
              recycle={false}
              confettiSource={{
                x: window.innerWidth / 2,
                y: window.innerHeight / 2,
                w: 0,
                h: 0,
              }}
            />
            <IoDiamond className="rotate-diamond" />
            <p>+10</p>
          </div>
        </div>
      )}
      <div
        style={{ width: `${100 - questionWidth}%` }}
        className="flex flex-col bg-[#1E1E1E] text-primary relative grow"
      >
        <EditorHeader
          setAns={setAns}
          handleRun={handleRun}
          isCompiling={isCompiling}
          setSelectedLang={setSelectedLang}
          languages={problemDetail?.codeSnippets}
        />
        <Editor
          options={{
            fontSize: 16,
            wordBasedSuggestionsOnlySameLanguage:true
          }}
          value={ans}
          width="100%"
          theme="vs-dark"
          language={selectedLang}
          height={`${solutionHeight}%`}
          onChange={(e: any) => setAns(e)}
        />
        <div
          className="h-0.5 w-full bg-secondary hover:bg-tertiary cursor-ns-resize"
          onMouseDown={handleHeightChange}
        ></div>
        <Terminal
          error={error}
          output={output}
          expected={expected}
          metaData={metaData}
          solutionHeight={solutionHeight}
          exampleTestcases={exampleTestcases}
          activeTestCaseIndex={activeTestCaseIndex}
          setActiveTestCaseIndex={setActiveTestCaseIndex}
        />
      </div>
    </>
  );
};

export default RighPart;
