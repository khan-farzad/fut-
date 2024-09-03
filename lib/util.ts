export type ProblemType = {
  id: number;
  title: string;
  likes: number;
  ytSlug: string;
  content: string;
  dislikes: number;
  titleSlug: string;
  questionId: string;
  difficulty: string;
  isPaidOnly: boolean;
  expectedOutput: any;
  similarQuestions: string;
  exampleTestcases: string;
  topicTags: {
    name: string;
    slug: string;
    translatedName: string;
  }[];
  codeSnippets: {
    lang: string;
    code: string;
    langSlug: string;
  }[];
  stats: string;
  hints: string[];
  metaData: string;
  sampleTestCase: string;
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
  name: string;
  problems: {
    title: string;
    titleSlug: string;
  }[];
};

export const NodeConstructor = `class ListNode(object):
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next
def nodeToArr(head):
    if not head:
        return []
    arr = []
    while head is not None:
        arr.append(head.val)
        head = head.next
    return arr
def arrToNode(arr):
    if len(arr) == 0:
        return None
    head = ListNode(arr[0])
    tmp = head
    for i in range(1,len(arr)):
        tmp.next = ListNode(arr[i])
        tmp = tmp.next
    return head\n`;

export const number_of_questions = {
  cap: 59,
  "blind-75": 71,
  "noob-to-pro": 267,
};

export const roadmap = ["noob-to-pro", "cap", "blind-75"];

export type WebDQuestionType = {
  id: number;
  link: string;
  answer: string;
  topic: string[];
  question: string;
  option?: string[];
  experience: number;
};

import { IconType } from "react-icons";
import { FaCss3Alt, FaHtml5, FaJs, FaReact } from "react-icons/fa";

export const icons: {
  [key: string]: {
    logo: IconType;
    bg_color: string;
    icon_color: string;
  };
} = {
  HTML: {
    logo: FaHtml5,
    icon_color: "#ef652a",
    bg_color: "#ef652a79",
  },
  CSS: {
    logo: FaCss3Alt,
    icon_color: "#016bc0",
    bg_color: "#016bc079",
  },
  JS: {
    logo: FaJs,
    icon_color: "#f7e018",
    bg_color: "#f7e01879",
  },
  React: {
    logo: FaReact,
    icon_color: "#087EA4",
    bg_color: "#087EA479",
  },
};
