export type ProblemType = {
  questionId: string;
  title: string;
  titleSlug: string;
  id: number;
  ytSlug: string;
  expectedOutput: any;
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
    return head\n`

export const NodeConstructorJavaHead=`class ListNode {
    int val;
    ListNode next;
    
    ListNode(int val) {
        this.val = val;
        this.next = null;
    }
}\n`

export const NodeConstructorJavaTail=`}\npublic static ListNode arrToNode(int... arr) {
        if (arr.length == 0) return null;

        ListNode head = new ListNode(arr[0]);
        ListNode temp = head;
        for (int i = 1; i < arr.length; i++) {
            temp.next = new ListNode(arr[i]);
            temp = temp.next;
        }
        return head;
    }

    // Convert Linked List to Array
    public static List<Integer> nodeToArr(ListNode head) {
        List<Integer> result = new ArrayList<>();
        while (head != null) {
            result.add(head.val);
            head = head.next;
        }
        return result;`

export const number_of_questions = {
  "noob-to-pro": 267,
  cap: 59,
  "blind-75": 71,
};

export const roadmap = ["noob-to-pro", "cap", "blind-75"];