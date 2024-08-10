import axios from "axios";
import Terminal from "./Terminal";
import EditorHeader from "./EditorHeader";
import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { Editor } from "@monaco-editor/react";
import { MetaDataType, NodeConstructor, ProblemType } from "@/lib/util";
import ConfettiModal from "./_rightPartComponents/ConfettiModal";

const RightPart = ({
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
  const [selectedLang, setSelectedLang] = useState("java");
  const [showPointsModal, setShowPointsModal] = useState(false);
  const [activeTestCaseIndex, setActiveTestCaseIndex] = useState(0);
  const [ans, setAns] = useState(problemDetail?.codeSnippets[1].code);

  const getLanguageId: { [key: string]: number } = {
    python: 70,
    java: 91,
  };
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
        setShowPointsModal(true);
        setTimeout(() => {
          setShowPointsModal(false);
        }, 5000);
        return;
      }
      let prevProgressObj = JSON.parse(prevProgress);
      if (!prevProgressObj.includes(ques.level)) {
        (prevProgressObj.push(ques.level),
        localStorage.setItem(ques.game, JSON.stringify(prevProgressObj))),
          setShowPointsModal(true);
        setTimeout(() => {
          setShowPointsModal(false);
        }, 5000);
      }
    } catch (error) {}
  };

  function extractOutputs(str: string) {
    const regex =
      /<strong>Output:<\/strong>\s*(\[\[.*?\]\]|\[.*?\]|".*?"|'.*?'|-?\d+|\w+|<span class="example-io">.*?<\/span>)/g;
    let matches;
    const outputs = [];
    while ((matches = regex.exec(str)) !== null) {
      let outputStr = matches[1].trim();
      outputStr = outputStr.replace(/&quot;/g, '"');
      try {
        if (
          outputStr.startsWith('<span class="example-io">') &&
          outputStr.endsWith("</span>")
        ) {
          outputStr = outputStr
            .replace('<span class="example-io">', "")
            .replace("</span>", "")
            .trim();
        }

        if (outputStr.startsWith("[") && outputStr.endsWith("]")) {
          outputs.push(JSON.parse(outputStr));
        } else if (
          outputStr === "true" ||
          outputStr === "false" ||
          !isNaN(parseInt(outputStr))
        ) {
          outputs.push(
            outputStr === "true"
              ? selectedLang === "java"
                ? "true"
                : "True"
              : outputStr === "false"
              ? selectedLang === "java"
                ? "false"
                : "False"
              : parseFloat(outputStr)
          );
        } else {
          outputs.push(outputStr.replaceAll('"', ""));
        }
      } catch (error) {
        console.log("Error parsing JSON:", error);
      }
    }
    return outputs;
  }
  const expectedTestcases = useMemo(() => {
    if (problemDetail?.content) {
      return extractOutputs(problemDetail.content.replaceAll("&quot;", '"'));
    }
    return [];
  }, [problemDetail?.content, selectedLang]);

  const handleRun2 = async () => {
    setIsCompiling(true);
    try {
      const response = await axios({
        method: "post",
        url: "/api/judge",
        data: {
          toSend: await getToSend(),
          langId: getLanguageId[selectedLang],
        },
      });
      setError(response.data.data.stderr);
      if (response.data.data.compile_output)
        setError(response.data.data.compile_output);
      if (response.data.data.stdout) {
        let tmpOutput = response.data.data.stdout
          .replaceAll(", ", ",")
          .split("\n");
        tmpOutput.pop();
        setOutput(tmpOutput);
        setExpected(expectedTestcases);
        if (JSON.stringify(expectedTestcases) == JSON.stringify(tmpOutput)) {
          addProgress();
          window.dispatchEvent(new Event("correctSolution"));
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsCompiling(false);
    }
  };
  
  const getToSend = async () => {
    let toSend = ans;
    let isJava = selectedLang === "java";
    let returnType = metaData.return.type;
    let paramType = metaData.params[0].type;
    if (paramType === "ListNode") {
      toSend = `${NodeConstructor}${ans}`;
    }
    
    if (isJava) {
      toSend = `\nimport java.util.Arrays;\n${ans}\nclass Main {
        public static void main(String[] args) {\n`;
      }
      let toFill = "";
      let exampleTestcasesCounter = 0;
      let expectedTestcasesCounter = 0;
      while (exampleTestcasesCounter < exampleTestcases?.length!) {
        expectedTestcases[expectedTestcasesCounter] =
        typeof expectedTestcases[expectedTestcasesCounter] !== "string"
        ? JSON.stringify(expectedTestcases[expectedTestcasesCounter])
        : expectedTestcases[expectedTestcasesCounter];
        toFill = "";
      for (let i = 0; i < metaData.params.length; i++) {
        if (isJava) {
          const javaParams = metaData.params[i].type;
          exampleTestcases = exampleTestcases?.map(eg => {
            return eg.replace('[','').replace(']','')
          })
          if (javaParams.includes("[][]")) {
            if (javaParams.includes("integer")) {
              toFill += `new int[][]{`;
            } else {
              toFill += `new ${javaParams}{`;
            }
          }
          else if( javaParams.includes("[]")) {
            if (javaParams.includes("integer")) {
              toFill += `new int[]{`;
            } else {
              toFill += `new ${javaParams}{`;
            }

          }
        }
        
        toFill += metaData.params[i].type === "ListNode" ? "arrToNode(" : "";
        toFill += exampleTestcases![exampleTestcasesCounter++];
        toFill += metaData.params[i].type === "ListNode" ? ")" : "";
        if (isJava && metaData.params[i].type.includes("[]")) {
          toFill += `}`;
        }
        if (i !== metaData.params!.length - 1) toFill += ",";
      }
      if (paramType === "ListNode") {
        toSend += `\nprint(nodeToArr(Solution().${metaData.name}(${toFill})))`;
        if (returnType !== "ListNode") {
          let slicingIdx = toSend?.indexOf("nodeToArr(Solution().");
          toSend =
            toSend?.slice(0, slicingIdx)! + toSend?.slice(slicingIdx! + 9)!;
        }
      } else {
        if (isJava && returnType.includes('[]')) {
          toSend += `System.out.println(Arrays.toString(new Solution().${metaData.name}(${toFill})));\n`;
          
        } 
        else if (isJava ) {
          toSend += `System.out.println((new Solution().${metaData.name}(${toFill})));\n`;

        }
        else {
          toSend += `\nprint(Solution().${metaData.name}(${toFill}))`;
        }
      }
      expectedTestcasesCounter++;
    }
    if (isJava) {
      toSend += `    }
}`;
    }
    const x64 = Buffer.from(toSend!).toString("base64");
    return x64;
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
      {showPointsModal && <ConfettiModal />}
      <div
        style={{ width: ` ${100 - questionWidth}%` }}
        className="flex flex-col bg-[#1E1E1E] text-primary relative grow"
      >
        <EditorHeader
          setAns={setAns}
          handleRun={handleRun2}
          isCompiling={isCompiling}
          setSelectedLang={setSelectedLang}
          languages={problemDetail?.codeSnippets}
        />
        <Editor
          options={{
            fontSize: 16,
            quickSuggestions: false,
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

export default RightPart;
