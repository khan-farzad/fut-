import Option from "./Option";
import { useState } from "react";
import { icons, WebDQuestionType } from "@/lib/util";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDarkReasonable } from "react-syntax-highlighter/dist/esm/styles/hljs";

const FlashCard = ({
  setShowCard,
  questionData,
}: {
  questionData: WebDQuestionType;
  setShowCard: (bool: boolean) => void;
}) => {
  const [showBack, setShowBack] = useState(false);
  const [isCorrect, setIsCorrect] = useState(-1);
  const { topic, option, answer, link, question } = questionData;
  const IconComponent = icons[topic[0]].logo;

  return (
    <div
      onClick={() => setShowCard(false)}
      className="absolute size-full flex-center backdrop-blur-lg [perspective:1000px]"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
          !option && setShowBack(!showBack);
        }}
        className={`min-h-[50%] w-1/2 *:rounded-xl rounded-xl shadow-md  text-2xl font-medium text-center relative z-50 ${
          showBack && "[transform:rotateY(180deg)]"
        } [transform-style:preserve-3d] transition duration-700`}
      >
        <div className="absolute size-full rounded-xl">
          <div className="min-h-full flex-center flex-col gap-4 bg-white dark:bg-neutral-900 relative p-4 rounded-xl overflow-hidden">
            <div
              style={{
                backgroundImage: `linear-gradient(to bottom, ${
                  icons[topic[0]].bg_color
                }, transparent)`,
              }}
              className={`absolute top-0 w-full h-[30%]`}
            ></div>
            <pre
              className={`${
                option && "text-sm text-start z-10 rounded-xl mt-10"
              }`}
            >
              {option ? (
                <SyntaxHighlighter
                  language="javascript"
                  style={atomOneDarkReasonable}
                  customStyle={{ borderRadius: 10, padding: "1rem" }}
                >
                  {question}
                </SyntaxHighlighter>
              ) : (
                <p>{question} </p>
              )}
            </pre>
            <div className="absolute top-0 left-0 p-5 flex items-center justify-between w-full">
              <div className="flex-center">
                <IconComponent
                  size={20}
                  style={{ color: icons[topic[0]].icon_color }}
                />
                <p className="text-xs">{topic[0]}</p>
              </div>
              <p className="text-xs text-green-400">Easy</p>
            </div>
            {option?.map((opt, idx) => (
              <Option
                answer={answer}
                idx={idx}
                opt={opt}
                selectedOption={isCorrect}
                setSelectedOption={setIsCorrect}
              />
            ))}
            {isCorrect !== -1 && (
              <a href={link} target="_blank" className="text-sm text-blue-500">
                Know more...
              </a>
            )}
          </div>
        </div>

        <div className="absolute size-full top-0 [backface-visibility:hidden] backdrop-brightness-0 bg-white dark:bg-neutral-900 [transform:rotateY(180deg)]">
          <div className="size-full relative rounded-xl flex-center overflow-hidden p-5">
            <div className="absolute top-0 w-full h-[30%] bg-gradient-to-b from-green-100 to-transparent">
              <p className="pt-10">Answer:</p>
            </div>
            <pre className="text-sm">{answer}</pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlashCard;
