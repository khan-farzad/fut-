"use client";
import Image from "next/image";
import Book from "./_components/book";
import logo2 from "@/public/logo2.png";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center flex-col justify-start gap-14 py-20 bg-zinc-900 relative">
      <div className="absolute z-[100] top-1/3 -left-[160px] size-72 bg-[#D41F30] rounded-full opacity-40 blur-[120px] dark:opacity-50" />
      <h1 className="flex items-center text-4xl text-[#D41F30]">
        <Image alt="logo" src={logo2} placeholder="blur" className="w-64" />-
      </h1>
      <p className="text-2xl text-center text-white tracking-tighter">
        KickStart your coding journey in the right direction!
      </p>
      <div className="flex-col lg:flex-row flex-center gap-20 *:size-60 *:bg-blac *:cursor-pointer">
        <div
          onClick={() => router.push("/noob-to-pro")}
          className="relative z-0"
        >
          <Book
            index={0}
            title="Noob to Pro"
            desc="Start from the basics, build a strong base and get the hang of it."
          />
        </div>
        <div onClick={() => router.push("/cap")} className="relative z-0">
          <Book
            index={1}
            title="CAP"
            desc="Commonly Asked Problems. Get interview ready with questions that are most probable."
          />
        </div>
        <div onClick={() => router.push("/blind-75")} className="relative z-0">
          <Book
            index={2}
            title="Blind 75"
            desc="75 questions that randomly test your coding skills. Perfect for revison of concepts."
          />
        </div>
      </div>
      <div className="absolute bottom-0 text-sm w-full text-primary text-center pb-1.5">
        <span>Enjoyed? DM us at </span>
        <a className="text-[#da70d6]" href="https://x.com/Pulkit_Jainnn">
          Pulkit Jain
        </a>{" "}
        <span className="text-[#ffd602]"> | </span>
        <a className="text-[#da70d6]" href="https://x.com/farzadhimself/">
          Farzad Khan
        </a>
      </div>
    </div>
  );
}
