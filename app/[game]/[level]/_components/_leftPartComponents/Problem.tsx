import Markdown from "markdown-to-jsx";

const Problem = ({ questionData }: { questionData: string | undefined }) => {
  return (
    <div className="text-sm p-5">
      <Markdown>{questionData!.replaceAll("class", "className")}</Markdown>
    </div>
  );
};

export default Problem;
