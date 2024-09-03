import { IoIosCheckmarkCircle, IoIosCloseCircle } from "react-icons/io";

const Option = ({
  idx,
  opt,
  answer,
  selectedOption,
  setSelectedOption,
}: {
  idx: number;
  opt: string;
  answer: string;
  selectedOption: number;
  setSelectedOption: (val: number) => void;
}) => {
  return (
    <div
      key={idx}
      onClick={(e) => e.stopPropagation()}
      className={`text-start text-base px-4 py-1 cursor-pointer font-normal rounded-lg border-2 border-dashed border-slate-500 w-4/5 flex items-center ${
        selectedOption !== -1 && "cursor-not-allowed"
      } ${
        selectedOption === idx && opt !== answer && "bg-red-400 border-red-400"
      } ${
        opt === answer &&
        selectedOption != -1 &&
        "bg-green-400 border-green-400"
      }`}
    >
      <input
        disabled={selectedOption !== -1}
        onChange={(e) => {
          setSelectedOption(idx);
        }}
        type="radio"
        name="option"
        id={opt}
        value={opt}
        className={`bg-yellow-700 cursor-pointer disabled:cursor-not-allowed ml-1 ${
          selectedOption === idx && "hidden"
        }`}
      />
      {selectedOption === idx &&
        (opt === answer ? (
          <IoIosCheckmarkCircle className="text-green-500 size-5 " />
        ) : (
          <IoIosCloseCircle className="text-red-700 size-5" />
        ))}
      <label
        className={`w-full pl-3 ${
          selectedOption !== -1 ? "cursor-not-allowed":"cursor-pointer"
        }`}
        htmlFor={opt}
      >
        {opt}
      </label>
    </div>
  );
};
export default Option;
