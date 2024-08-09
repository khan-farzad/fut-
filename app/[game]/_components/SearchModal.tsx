"use client";
import { TopicType } from "@/lib/util";
import { IoIosSearch } from "react-icons/io";
import { useParams, useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";

type SearchModalProps = {
  game: TopicType[];
  handleScroll: (topic: string) => void;
  setShowSearchModal: Dispatch<SetStateAction<boolean>>;
};

const SearchModal = ({
  game,
  handleScroll,
  setShowSearchModal,
}: SearchModalProps) => {
  const sheet = useParams();
  const router = useRouter();
  let topics = game.map((t) => t.topic);
  let problems = game.map((t) => t.problems).flat();
  const [filteredProblems, setFilteredProblems] = useState<
    {
      title: string;
      lcSlug: string;
    }[]
  >();
  const [filteredTopics, setFilteredTopics] = useState<string[]>();
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 0) {
      let tempTopics: string[] = topics.filter((t) =>
        t.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setFilteredTopics(tempTopics);
      let tempProblems = problems.filter((p) =>
        p.title.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setFilteredProblems(tempProblems);
    } else {
      setFilteredTopics([]);
      setFilteredProblems([]);
    }
  };
  return (
    <div
      onClick={() => setShowSearchModal(false)}
      className="inset-0 z-30 absolute h-screen w-sreen bg-black/20 backdrop-blur-[1px] flex justify-center items-start pt-[10%]"
    >
      <div className="w-2/5 flex flex-col rounded-xl text-black shadow-md bg-tertiary/50 backdrop-blur-3xl">
        <div
          className="w-full h-12 flex-center gap-2 px-4 "
          onClick={(e) => e.stopPropagation()}
        >
          <IoIosSearch className="size-8" />
          <input
            type="text"
            autoFocus
            onChange={handleInputChange}
            className="grow caret-this-green outline-none text-xl bg-transparent "
          />
        </div>
        <div className="max-h-60 overflow-auto">
          {(filteredTopics?.length! > 0 || filteredProblems?.length! > 0) && (
            <div className="h-[1px] bg-black/10 w-full"></div>
          )}
          {filteredTopics?.length! > 0 && (
            <div className="px-4 py-1 flex flex-col items-start">
              <h2 className="text-black/70 font-bold">Topics</h2>
              <div className="h-[1px] bg-black/10 w-full"></div>
              {filteredTopics?.map((t, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setShowSearchModal(false),
                      setTimeout(() => {
                        handleScroll(t);
                      }, 1);
                  }}
                  className="mb-1"
                >
                  {t}
                </button>
              ))}
            </div>
          )}
          {filteredProblems?.length! > 0 && (
            <div className="px-4 py-1 flex flex-col items-start">
              <h2 className="text-black/70 font-bold">Problems</h2>
              <div className="h-[1px] bg-black/10 w-full"></div>
              {filteredProblems?.map((p, i) => (
                <button
                  key={i}
                  onClick={() => router.push(`/${sheet.game}/${p.lcSlug}`)}
                  className="mb-1"
                >
                  {p.title}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
