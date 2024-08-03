import { useRef } from "react";
import { MetaDataType } from "@/lib/util";
import { IoIosCheckmark, IoIosClose } from "react-icons/io";

const Terminal = ({
  error,
  output,
  expected,
  metaData,
  solutionHeight,
  exampleTestcases,
  activeTestCaseIndex,
  setActiveTestCaseIndex,
}: {
  error: string;
  output: string[];
  expected: string[];
  solutionHeight: number;
  metaData: MetaDataType;
  activeTestCaseIndex: number;
  exampleTestcases: string[] | undefined;
  setActiveTestCaseIndex: (newIdx: number) => void;
}) => {
  const ButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <div
      style={{ height: `${100 - solutionHeight}%` }}
      className="overflow-y-auto w-full flex flex-col my-2"
    >
      <div className="flex relative">
        <div
          style={{
            left: `${
              activeTestCaseIndex * (ButtonRef.current?.clientWidth! + 34) +
              14.5
            }px`,
          }}
          className="absolute h-0.5 w-20 bg-tertiary/70 -bottom-1 transition-[left] duration-500"
        ></div>
        {Array.from(
          { length: exampleTestcases!.length / metaData.params.length },
          (_, i) => (
            <button
              key={i}
              onClick={() => setActiveTestCaseIndex(i)}
              ref={ButtonRef}
              className={`${
                i == activeTestCaseIndex
                  ? "text-tertiary scale-y-105"
                  : "text-secondary"
              }  mx-4 w-20 text-center text-sm uppercase hover:text-tertiary h-fit flex-center transition-[scale] `}
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
  );
};

export default Terminal;
