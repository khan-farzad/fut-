'use client'
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter()
  return (
    <div className="h-screen flex-center gap-20 *:size-60 *:bg-pink-300 *:cursor-pointer">
      <div onClick={() => router.push('/noob-to-pro')}>Noob to Pro</div>
      <div onClick={() => router.push('/cap')}>CAP</div>
      <div onClick={() => router.push('/blind-75')}>Blind 75</div>
    </div>
  );
}
