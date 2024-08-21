import { useEffect, useState } from "react";
import Month from "./Month";
type MonthData = {
  totalDays: number;
  startError: number;
};

const Submissions = () => {
  const months: Record<string, MonthData> = {
    January: {
      startError: 1,
      totalDays: 31,
    },
    February: {
      startError: 4,
      totalDays: 29,
    },
    March: {
      startError: 5,
      totalDays: 31,
    },
    April: {
      startError: 1,
      totalDays: 30,
    },
    May: {
      startError: 3,
      totalDays: 31,
    },
    June: {
      startError: 6,
      totalDays: 30,
    },
    July: {
      startError: 1,
      totalDays: 31,
    },
    August: {
      startError: 4,
      totalDays: 31,
    },
    September: {
      startError: 0,
      totalDays: 30,
    },
    October: {
      startError: 2,
      totalDays: 31,
    },
    November: {
      startError: 5,
      totalDays: 30,
    },
    December: {
      startError: 0,
      totalDays: 31,
    },
  };
  const [progress, setProgress] = useState<Record<number, number[][]>>({});

  const getProgress = () => {
    const prevProgress = localStorage.getItem("submissions");
    if (!prevProgress) return;
    setProgress(JSON.parse(prevProgress));
  };

  useEffect(() => {
    getProgress();
  }, []);

  return (
    <div className="my-8 ">
      <h2 className="text-center text-3xl text-this-green">Submissions</h2>
      <div className="flex-center over shrink-0 gap-2 ">
        {Object.keys(months).map((m, i) => (
          <div key={i} className="flex-center shrink-0 flex-col text-primary">
            <Month
              completed={progress && progress[i]}
              month={m}
              totalDays={months[m].totalDays}
              startError={months[m].startError}
            />
            <div className="">{m}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Submissions;
