import Image from "next/image";
import { useState } from "react";
import spin from "@/public/spin.svg";
import { IoIosPlay } from "react-icons/io";
import { SiLeetcode } from "react-icons/si";

const EditorHeader = ({
  ans,
  setAns,
  quesLang,
  languages,
  handleRun,
  isCompiling,
  setSelectedLang,
}: {
  ans?: string;
  quesLang: String;
  isCompiling: boolean;
  handleRun: () => Promise<void>;
  languages:
    | {
        lang: string;
        langSlug: string;
        code: string;
      }[]
    | undefined;
  setAns: (newAns: string) => void;
  setSelectedLang: (newLang: string) => void;
}) => {
  const [time, setTime] = useState(3);
  const supportedLandSlugs = ["python", "java"];
  const [showTimer, setShowTimer] = useState(false);
  const supportedLanguages = languages?.filter((l) => {
    return supportedLandSlugs.includes(l.langSlug);
  });

  const solveOnLeetcode = () => {
    if (time < 3) return;
    ans && navigator.clipboard.writeText(ans);
    const timer = setInterval(() => {
      setTime((prv) => {
        setShowTimer(true);
        if (prv == 0) {
          clearInterval(timer);
          window.open("https://leetcode.com/problems/" + quesLang, "_blank");
          setShowTimer(false);
          return 3;
        }
        return prv - 1;
      });
    }, 1000);
  };

  return (
    <div className="flex justify-between text-sm items-center px-6 py-2">
      <select
        className="bg-transparent outline-none text-white"
        onChange={(e) => {
          setSelectedLang(e.target.value);
          const langIdx: number = supportedLanguages!.findIndex(
            (el) => el.langSlug === e.target.value
          );
          setAns(supportedLanguages![langIdx].code);
        }}
      >
        {supportedLanguages!.reverse().map((l, i) => (
          <option
            className="text-black"
            key={`${l.langSlug}-${i}`}
            value={l.langSlug}
          >
            {l.lang}
          </option>
        ))}
      </select>
      <div className="flex-center gap-2">
        <button
          onMouseEnter={() => setShowTimer(true)}
          onMouseLeave={() => {
            if (time == 3) setShowTimer(false);
          }}
          onClick={solveOnLeetcode}
          className="text-[xs] border flex-center group relative border-white/50 rounded-xl active:scale-90 px-2 py-1"
        >
          <SiLeetcode />
          <p
            className={`text-xs ${
              !showTimer ? "opacity-0 w-0 h-0 visibility-hidden" : "w-28"
            } group-hover:opacity-100 group-hover:w-28 overflow-hidden group-hover:h-4 transition-all duration-700 group-hover:visibility-visible`}
          >
            {time >= 3 ? (
              <p className="whitespace-nowrap mx-2">Solve on Leetcode</p>
            ) : (
              <p className="mx-3 whitespace-nowrap">Redirecting in {time}</p>
            )}
          </p>
          {time < 3 && (
            <p className="absolute whitespace-nowrap text-xs -bottom-7 bg-secondary/50 px-2 py-1 rounded-xl z-10">
              Code copied!
            </p>
          )}
        </button>
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
    </div>
  );
};

export default EditorHeader;
