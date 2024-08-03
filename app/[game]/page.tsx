"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { TopicType } from "@/lib/util";
import { useRouter } from "next/navigation";
import { A2ZTopics, Blind75Topics, CAPTopics } from "@/dataFinal";

const Page = ({ params }: { params: { game: string } }) => {
  const game = params.game;
  const router = useRouter();
  const [progress, setProgress] = useState<[string]>([""]);
  const validGame = ["noob-to-pro", "blind-75", "cap"];
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

  return (
    <div className="bg-background text-tertiary min-w-full max-w-screen">
      <div className="dark:block fixed z-[100] top-1/3 -left-[160px] size-72 bg-[#D41F30] rounded-full opacity-40 blur-[120px] dark:opacity-50"></div>
      <div>
        {sheet[game].map((t, tIdx) => (
          <div
            key={`${game}-topic-${tIdx}`}
            className={`flex flex-col items-center w-full gap-6 ${
              tIdx !== sheet[game].length - 1 && "mb-6"
            }`}
          >
            <div className="flex-center bg-gradient-to-r from-transparent to-transparent via-tertiary w-[40%] h-0.5 mt-4 mb-4 text-[#d41f30]/70 font-bold">
              <h2 className="bg-background px-4 text-2xl">{t.topic}</h2>
            </div>
            <div className="flex flex-col w-full items-center gap-4">
              {t.problems.map((q, qId) => (
                <div
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
                    className={`size-14 rounded-full shdw flex-center hover:translate-y-1 ${
                      progress.includes(q.lcSlug)
                        ? "bg-green-400 "
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
