import Markdown from "markdown-to-jsx";

const Problem = ({ questionData }: { questionData: string | undefined }) => {
  return (
    <div className="text-sm p-5">
      <Markdown
        options={{
          namedCodesToUnicode: {
            le: "\u2264",
            ge: "\u2265",
            "#39": "\u0027",
          },
        }}
      >
        {questionData!.replaceAll("class", "className")}
      </Markdown>
    </div>
  );
};

export default Problem;
