"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Book from "./_components/book";

export default function Home() {
  const router = useRouter();
  return (
    <div className="h-screen flex items-center flex-col justify-start gap-14 py-20 bg-zinc-900 relative">
      <div className="dark:block absolute z-[100] top-1/3 -left-[160px] size-72 bg-[#D41F30] rounded-full opacity-40 blur-[120px] dark:opacity-50"></div>
      <h1 className="flex items-center text-4xl text-[#D41F30]">
        <Image alt="logo" src={"/logo2.png"} height={199} width={199} />-
      </h1>
      <p className="text-2xl text-white tracking-tighter">
        KickStart your coding journey in the right direction!
      </p>

      <div className="flex-center gap-20 *:size-60 *:bg-blac *:cursor-pointer">
        <div
          onClick={() => router.push("/noob-to-pro")}
          className="relative z-0"
        >
          <Book
            progress={20}
            title="Noob to Pro"
            desc="Start from the basics, build a strong base and get the hang of it."
          />
        </div>
        <div onClick={() => router.push("/cap")} className="relative z-0">
          <Book
            progress={0}
            title="CAP"
            desc="Commonly Asked Problems. Get interview ready with questions that are most probable."
          />
        </div>
        <div onClick={() => router.push("/blind-75")} className="relative z-0">
          <Book
            progress={0}
            title="Blind 75"
            desc="75 questions that randomly test your coding skills. Perfect for revison of concepts."
          />
        </div>
      </div>
    </div>
  );
}
