import Image from "next/image";
import spin from "@/public/spin.svg";
import { IoIosPlay } from "react-icons/io";

const EditorHeader = ({
  setAns,
  languages,
  handleRun,
  isCompiling,
  setSelectedLang,
}: {
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
  const supportedLandSlugs = ['python','java']
  const supportedLanguages = languages?.filter(l => {
    return supportedLandSlugs.includes(l.langSlug)
  })
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
      <button className="text-white/55 flex-center" onClick={handleRun}>
        {isCompiling ? (
          <Image src={spin} alt="spin" className="animate-spin size-2.5 mr-1" />
        ) : (
          <IoIosPlay className="text-primary mr-1" />
        )}
        Run
      </button>
    </div>
  );
};

export default EditorHeader;
