"use client";
import { ntpQues } from "@/data";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
const page = ({
  params,
}: {
  params: {
    game: string;
  };
}) => {
  const { game } = params;
  const router = useRouter();
  const validGame = ["noob-to-pro", "blind-75", "CAP"];
  if (!validGame.includes(game)) {
    router.push("/");
  }
  const [active, setActive] = useState(0);

  const redirectToQues = (lc_link: string | null) => {
    if (!lc_link) return;

    router.push("/" + game + "/" + lc_link.split("/")[4]);
  };
  return (
    <div className="bg-zinc-900">
      <div className="dark:block fixed z-[100] top-1/3 -left-[160px] size-72 bg-[#D41F30] rounded-full opacity-40 blur-[120px] dark:opacity-50"></div>

      <h1 className="absolute">{game}</h1>
      <div className="flex flex-col gap-6 w-full items-center text-white">
        {ntpQues.map((q) => (
          <>
            <div className="flex justify-between items-center bg-[#D41F30]   w-1/2 h-1/5 sticky top-0 py-3 px-2  text-white font-bold">
              <div className="flex flex-col justify-between items-center">
                <h2> Level {q.step_no}</h2>
                <h2>{q.step_title}</h2>
              </div>
              <button>Continue</button>
            </div>
            <div className="flex flex-col-reverse w-full items-center gap-4">
              {q.sub_steps.map((sub) =>
                sub.topics.map((t, idx) => (
                  <div
                    onClick={() => redirectToQues(t.lc_link)}
                    style={{ marginRight: `${idx * 2}rem` }}
                    className="flex-center flex-col cursor-pointer "
                  >
                    {t.lc_link && (
                      <>
                        <div
                          className={`size-14 rounded-full shdw flex-center hover:translate-y-1 ${
                            active == idx ? "bg-green-400 " : "bg-neutral-300"
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

                        <p>{t.question_title}</p>
                      </>
                    )}
                  </div>
                ))
              )}
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default page;
