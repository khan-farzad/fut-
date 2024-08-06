import { TopicType } from "@/lib/util";
import { A2ZTopics, Blind75Topics, CAPTopics } from "@/dataFinal";

const Video = ({ game, level }: { game: string; level: string }) => {
  const sheet: { [key: string]: TopicType[] } = {
    "noob-to-pro": A2ZTopics,
    cap: CAPTopics,
    "blind-75": Blind75Topics,
  };
  const findYtSlugByLcSlug = (game: string, lcSlug: string) => {
    let temp: any = sheet[game];
    for (const topic of temp) {
      for (const problem of topic.problems) {
        if (problem.lcSlug === lcSlug) {
          return problem.ytSlug;
        }
      }
    }
    return null;
  };

  return (
    <div className="h-96 w-full mt-5 bg-black p-2">
      <iframe
        loading="lazy"
        className="size-full"
        src={`http://www.youtube.com/embed/${findYtSlugByLcSlug(game, level)}`}
      ></iframe>
    </div>
  );
};

export default Video;
