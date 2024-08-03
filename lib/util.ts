export type ProblemType = {
  questionId: string;
  title: string;
  titleSlug: string;
  content: string;
  isPaidOnly: boolean;
  difficulty: string;
  likes: number;
  dislikes: number;
  similarQuestions: string;
  exampleTestcases: string;
  topicTags: {
    name: string;
    slug: string;
    translatedName: string;
  }[];
  codeSnippets: {
    lang: string;
    langSlug: string;
    code: string;
  }[];
  stats: string;
  hints: string[];
  sampleTestCase: string;
  metaData: string;
};

export type MetaDataType = {
  name: string;
  params: {
    name: string;
    type: string;
  }[];
  return: {
    type: string;
  };
};

export type TopicType = {
  topic: string;
  problems: {
    title: string;
    lcSlug: string;
  }[];
};
