"use client";
import Image from "next/image";
import logo2 from '@/public/logo2.png'
import { TopicType } from "@/lib/util";
import { FaCheck } from "react-icons/fa";
import Navbar from "./_components/Navbar";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import TotalPoints from "./_components/TotalPoints";
import { A2ZTopics, Blind75Topics, CAPTopics } from "@/dataFinal";

type GameType = (typeof validGame)[number];
const validGame = ["noob-to-pro", "blind-75", "cap"] as const;

const Page = ({ params }: { params: { game: string } }) => {
  const deviceWidth = window.innerWidth
  const router = useRouter();
  const game = params.game as GameType;
  const [progress, setProgress] = useState<string[]>([]);
  const [currentTopic, setCurrentTopic] = useState<string>("Learn Basics");
  const lengthOfGame = { "noob-to-pro": 272, cap: 60, "blind-75": 72 };
  const progressPercentage = (progress.length / lengthOfGame[game]) * 100;
  const sheet: { [key: string]: TopicType[] } = {
    "noob-to-pro": A2ZTopics,
    cap: CAPTopics,
    "blind-75": Blind75Topics,
  };

  const getTopics = () => {
    let arr: string[] = [];
    sheet[game].forEach((g) => {
      arr.push(g.topic);
    });
    return arr;
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

  if (deviceWidth < 768) {
    return (
      <div className="bg-background text-primary h-screen flex-center flex-col gap-4 w-full">
      <h1 className="flex items-center text-4xl text-[#D41F30]">
        <Image alt="logo" src={logo2} className="w-80" placeholder="blur" />-
      </h1>
      <p>You&apos;ll require a laptop to code!</p>
      
    </div>
    )
  }

  return (
    <div className="bg-background  text-tertiary min-w-full max-w-screen">
      <Navbar topics={getTopics()} />
      <TotalPoints />
      <div className="dark:block fixed z-[100] top-1/3 -left-[160px] size-72 bg-[#D41F30] rounded-full opacity-40 blur-[120px] dark:opacity-50"></div>
      <div className=" fixed left-16 w-2 h-[90%] mt-[3%] bg-secondary/25 rounded-full overflow">
        <div
          style={{ height: progressPercentage + "%" }}
          className="absolute bottom-0 w-full bg-this-green rounded-full"
        />
        <div
          style={{}}
          className="absolute -bottom-7 -translate-x-[30%] w-fit truncate"
        >
          {progress.length} / {lengthOfGame[game]}
        </div>
      </div>
      <div className="pt-5">
        {sheet[game].map((t, tIdx) => (
          <div
            id={`${t.topic}`}
            key={`${game}-topic-${tIdx}`}
            className={`flex flex-col items-center w-full gap-6 ${
              tIdx !== sheet[game].length - 1 && "mb-6"
            }`}
          >
            <div className="flex-center bg-gradient-to-r from-transparent to-transparent via-tertiary w-[40%] h-0.5 mt-4 mb-4 text-this-green font-bold">
              <h2 className="bg-background px-4 text-2xl">{t.topic}</h2>
            </div>
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
                        ? "bg-this-green"
                        : "bg-neutral-300"
                    }`}
                  >
                    {progress.includes(q.lcSlug) ? (
                      <FaCheck className="size-6 text-primary" />
                    ) : (
                      <Image
                        alt="start"
                        src={"/star.svg"}
                        width={49}
                        height={99}
                        className="size-6"
                      />
                    )}
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
