import { icons, WebDQuestionType } from "@/lib/util";

const Question = ({
  i,
  ques,
  setShowCard,
  setActiveQues,
}: {
  i: number;
  ques: WebDQuestionType;
  setShowCard: (val: boolean) => void;
  setActiveQues: (val: number) => void;
}) => {
  const { question, experience, topic } = ques;
  const IconComponent = icons[topic[0]].logo;
  return (
    <div
      key={`ques-${i}`}
      onClick={() => {
        setShowCard(true);
        setActiveQues(i);
      }}
      className="px-5 py-3 flex-center gap-10 border border-dashed border-x-0 border-black/20 text-center cursor-pointer active:scale-95"
    >
      <div className="flex-center flex-col w-20 shrink-0">
        <IconComponent
          size={20}
          style={{ color: icons[topic[0]].icon_color }}
        />
        <p className="text-[10px]">{topic[0]}</p>
      </div>
      <p className="grow text-start line-clamp-1">{question}</p>
      <p className="w-20 shrink-0">
        {experience === 0 ? "Fresher" : experience}
      </p>
    </div>
  );
};
export default Question;
