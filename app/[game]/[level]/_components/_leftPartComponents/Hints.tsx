import { useState } from "react";
import { FaAngleDown } from "react-icons/fa";

const Hints = ({ hints }: { hints: string[] | undefined }) => {
  const [activeHintIdx, setActiveHintIdx] = useState(-1);
  return (
    <div className="p-5 flex flex-col gap-2 ">
      {hints &&
        hints?.map((hint, idx) => (
          <div key={idx} className="">
            <button
              onClick={() => setActiveHintIdx(idx)}
              className="flex gap-2 w-full justify-between items-center"
            >
              <p>Hint {idx + 1}</p>
              <FaAngleDown />
            </button>
            {activeHintIdx == idx && (
              <p className="opacity-70 p-2 bg-black/80 rounded-xl">{hint}</p>
            )}
          </div>
        ))}
    </div>
  );
};

export default Hints;
