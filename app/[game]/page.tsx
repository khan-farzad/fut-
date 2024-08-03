"use client";
import { A2ZTopics, Blind75Topics, CAPTopics } from "@/dataFinal";
import { TopicType } from "@/lib/util";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const page = ({ params }: { params: { game: string } }) => {
  const game = params.game
  const router = useRouter();
  const validGame = ["noob-to-pro", "blind-75", "cap"];
  const [active, setActive] = useState(0);
  const sheet: { [key: string]: TopicType[] } = {
    "noob-to-pro": A2ZTopics,
    cap: CAPTopics,
    "blind-75": Blind75Topics,
  };
  
  if (!validGame.includes(game)) {
    router.push("/");
  }
  
  return (
    <div className="bg-background text-tertiary min-w-full max-w-screen">
      <div className="dark:block fixed z-[100] top-1/3 -left-[160px] size-72 bg-[#D41F30] rounded-full opacity-40 blur-[120px] dark:opacity-50"></div>
      <div>
        {sheet[game].map((t, tIdx) => (
          <div key={`${game}-topic-${tIdx}`} className="flex flex-col items-center w-full gap-6 mb-6">
            <div className="flex justify-between items-center bg-[#D41F30] w-1/2 h-1/5 sticky top-0 py-3 px-2 text-white font-bold">
              <div className="flex flex-col justify-between items-center">
                <h2>Level {tIdx + 1}</h2>
                <h2>{t.topic}</h2>
              </div>
              <button>Continue</button>
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
                      active == qId ? "bg-green-400 " : "bg-neutral-300"
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

export default page;
