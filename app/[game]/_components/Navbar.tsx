"use client";
import { useState } from "react";
type NavbarProps = {
  topics: string[];
};

const Navbar = ({ topics }: NavbarProps) => {
  const [idx, setIdx] = useState(0);
  const UNIT_ROTATION_ANGLE = 360 / topics.length;

  const getFaasla = (size: number, active: number, clicked: number) => {
    let arr = [];
    for (let i = 0; i < 2 * size; i++) {
      arr.push(i % size);
    }
    let start =
      active < size / 2 ? arr.indexOf(active) + size : arr.indexOf(active);
    let forwardPtr = start;
    let backwardPtr = start;
    while (forwardPtr < arr.length && arr[forwardPtr] != clicked) {
      forwardPtr++;
    }
    while (backwardPtr >= 0 && arr[backwardPtr] != clicked) {
      backwardPtr--;
    }
    const option1 = forwardPtr - start;
    const option2 = start - backwardPtr;
    return option1 < option2 ? option1 : -option2
  };

  const handleClick = (clickedIdx: number) => {
    let faasla = getFaasla(topics.length, idx % topics.length, clickedIdx);
    setIdx((prevIdx) => prevIdx + faasla);
  };

  return (
    <>
      <div
        style={{
          transform: `translateY(-50%) rotate(-${
            idx * UNIT_ROTATION_ANGLE
          }deg)`,
        }}
        className="fixed select-none p-2 top-1/2 -translate-y-1/2 size-96 text-xl -right-48 rounded-full border-secondary/50 border  transition-all duration-300 z-20"
      >
        <div
          style={{
            transform: `translateY(-50%) rotate(${
              idx * UNIT_ROTATION_ANGLE
            }deg)`,
          }}
          className="absolute w-full h-8 top-1/2 -translate-y-1/2 -left-1/2  origin-right flex-center"
        >
          <div className="size-1 bg-gradient-to-r from-gray-400 to-white rounded-full inner-shadow"></div>
        </div>
        {topics.map((t, i) => (
          <div
            key={i}
            style={{
              transform: `translateY(-50%) rotate(${
                i * UNIT_ROTATION_ANGLE
              }deg)`,
            }}
            className="absolute  w-full h-8 top-1/2 -translate-y-1/2 -left-1/2 origin-right"
          >
            <a
              href={`#${t}`}
              onClick={() => handleClick(i)}
              className={`flex cursor-pointer  justify-end items-center px-1 w-1/2 ${
                idx % topics.length === i
                  ? "text-this-green text-xl"
                  : "text-secondary/25 text-lg hover:text-secondary"
              } h-full`}
            >
              {t}
            </a>
          </div>
        ))}
      </div>
    </>
  );
};

export default Navbar;
