"use client";
import Image from "next/image";
import { TopicType } from "@/lib/util";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import TotalPoints from "./_components/TotalPoints";
import { A2ZTopics, Blind75Topics, CAPTopics } from "@/dataFinal";

type GameType = (typeof validGame)[number];
const validGame = ["noob-to-pro", "blind-75", "cap"] as const;

const Page = ({ params }: { params: { game: string } }) => {
  const router = useRouter();
  const game = params.game as GameType;
  const [progress, setProgress] = useState<[string]>([""]);
  const [currentTopic, setCurrentTopic] = useState<string>("Learn Basics");
  const lengthOfGame = { "noob-to-pro": 272, "blind-75": 60, cap: 72 };
  const progressPercentage = (progress.length / lengthOfGame[game]) * 100;
  const sheet: { [key: string]: TopicType[] } = {
    "noob-to-pro": A2ZTopics,
    cap: CAPTopics,
    "blind-75": Blind75Topics,
  };

  if (!validGame.includes(game)) {
    router.push("/");
  }

  const getProgress = () => {
    try {
      const localGame = localStorage.getItem(game);
      if (!localGame) return;
      setProgress(JSON.parse(localGame));
    } catch (error) {}
  };

  useEffect(() => {
    getProgress();
  }, []);

  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (observer.current) {
      observer.current.disconnect();
    }

    observer.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.intersectionRatio > 0) {
          setCurrentTopic(entry.target.getAttribute("data-topic") || "Arrays");
        }
      });
    });

    const topicElements = document.querySelectorAll("[data-topic]");
    topicElements.forEach((el) => observer.current?.observe(el));

    return () => observer.current?.disconnect();
  }, []);

  return (
    <div className="bg-background text-tertiary min-w-full max-w-screen">
      <TotalPoints />
      <div className="dark:block fixed z-[100] top-1/3 -left-[160px] size-72 bg-[#D41F30] rounded-full opacity-40 blur-[120px] dark:opacity-50"></div>
      <div className=" fixed left-16  w-2 h-[90%] mt-[3%] bg-tertiary rounded-full overflow">
        <div
          style={{ height: progressPercentage + "%" }}
          className="absolute bottom-0 w-full bg-red-600 rounded-full"
        />
        <div
          style={{}}
          className="absolute -bottom-7 -translate-x-[30%] w-fit truncate"
        >
          {progress.length} / {lengthOfGame[game]}
        </div>
      </div>
      <div className="h-20 ml-[30%] w-[40%] bg-[#58cc02] text-white font-bold px-4 sticky top-0 z-10 rounded-xl flex justify-between items-center">
        <div className="flex-center gap-2">
          <button>
            <FaArrowLeft onClick={() => router.back()} />
          </button>
          <h4>{currentTopic} </h4>
        </div>
        <h4>{game} </h4>
      </div>
      <div className="pt-5">
        {sheet[game].map((t, tIdx) => (
          <div
            key={`${game}-topic-${tIdx}`}
            className={`flex flex-col items-center w-full gap-6 ${
              tIdx !== sheet[game].length - 1 && "mb-6"
            }`}
          >
            {tIdx !== 0 && (
              <div className="flex-center bg-gradient-to-r from-transparent to-transparent via-tertiary w-[40%] h-0.5 mt-4 mb-4 text-[#d41f30]/70 font-bold">
                <h2 className="bg-background px-4 text-2xl">{t.topic}</h2>
              </div>
            )}
            <div className="flex flex-col w-full items-center gap-4 relative overflow-clip">
              {t.problems.map((q, qId) => (
                <div
                  data-topic={t.topic}
                  key={`${t.topic}-${qId}`}
                  onClick={() => router.push("/" + game + "/" + q.lcSlug)}
                  style={{
                    marginRight: `${
                      parseFloat(Math.sin((Math.PI * qId) / 6).toFixed(2)) * 20
                    }rem`,
                  }}
                  className="flex-center flex-col cursor-pointer"
                >
                  <div
                    className={`size-14 rounded-full shdw flex-center hover:translate-y-1 mt-4 ${
                      progress.includes(q.lcSlug)
                        ? "bg-[#58cc02]"
                        : "bg-neutral-300"
                    }`}
                  >
                    <Image
                      alt="start"
                      src={"/star.svg"}
                      width={49}
                      height={99}
                      className="size-6"
                    />
                  </div>
                  <p>{q.title}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
