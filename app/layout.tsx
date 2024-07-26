import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FUT- | FAANG Ultimate Test",
  description: "A game designed to Level up your coding skills with curated problems, on-the-spot feedback, and progress tracking. Each level presents a challenging problem commonly encountered in interviews at Google, Amazon, Facebook, and more. Solve each problem using our integrated code editor, receive immediate evaluation. Track your progress as you level up your skills.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
