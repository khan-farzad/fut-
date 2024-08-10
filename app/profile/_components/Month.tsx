import Tooltip from "./Toolptip";

const Month = ({
  month,
  completed,
  totalDays,
  startError,
}: {
  month: string;
  totalDays: number;
  startError: number;
  completed: number[][];
}) => {
  const cols = startError + totalDays > 35 ? 6 : 5;

  const getFrequency = (dayIndex: number, weekIndex: number) => {
    const idx = completed
      .map((q) => q[0] == dayIndex + weekIndex * 7 - startError + 1)
      .indexOf(true);
    return idx >= 0 ? completed[idx][1] : 0;
  };

  return (
    <table
      border={1}
      style={{
        borderSpacing: "6px",
        borderCollapse: "separate",
      }}
    >
      <tbody>
        {Array.from({ length: 7 }, (_, dayIndex) => (
          <tr key={dayIndex}>
            {Array.from({ length: cols }, (_, weekIndex) => (
              <td
                className={` size-[10px] rounded-sm group m-2 relative text-xs ${
                  (dayIndex + weekIndex * 7 - startError < 0 ||
                    dayIndex + weekIndex * 7 - startError > totalDays - 1) &&
                  "invisible"
                }
                ${
                  completed &&
                  completed
                    .map(
                      (q) => q[0] == dayIndex + weekIndex * 7 - startError + 1
                    )
                    .includes(true)
                    ? "bg-this-green"
                    : "bg-white/20 "
                }
                `}
                key={weekIndex}
              >
                <Tooltip
                  frequency={completed && getFrequency(dayIndex, weekIndex)}
                  date={`${dayIndex + weekIndex * 7 - startError + 1} ${month}`}
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default Month;
