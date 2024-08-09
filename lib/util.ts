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
    return head\n`

export const number_of_questions = {
  "noob-to-pro": 267,
  cap: 59,
  "blind-75": 71,
};
