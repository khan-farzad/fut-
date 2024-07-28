import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { titleSlug } = await request.json();
    const response = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Referer: "https://leetcode.com",
      },
      body: JSON.stringify({
        query: `#graphql
      query selectProblem($titleSlug: String!) {
          question(titleSlug: $titleSlug) {
              questionId
              questionFrontendId
              boundTopicId
              title
              titleSlug
              content
              translatedTitle
              translatedContent
              isPaidOnly
              difficulty
              likes
              dislikes
              isLiked
              similarQuestions
              exampleTestcases
              contributors {
                  username
                  profileUrl
                  avatarUrl
              }
              topicTags {
                  name
                  slug
                  translatedName
              }
              companyTagStats
              codeSnippets {
                  lang
                  langSlug
                  code
              }
              stats
              hints
              solution {
                  id
                  canSeeDetail
                  paidOnly
                  hasVideoSolution
                  paidOnlyVideo
              }
              status
              sampleTestCase
              metaData
              judgerAvailable
              judgeType
              mysqlSchemas
              enableRunCode
              enableTestMode
              enableDebugger
              envInfo
              libraryUrl
              adminUrl
              challengeQuestion {
                  id
                  date
                  incompleteChallengeCount
                  streakCount
                  type
              }
              note
          }
      }`,
        variables: {
          titleSlug,
        },
      }),
    });
    console.log(titleSlug);
    const result = await response.json();
    return NextResponse.json({
      message: "good",
      question: result.data.question,
    });
  } catch (error) {
    return NextResponse.json({ message: "bad" });
  }
}
