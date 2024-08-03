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
              title
              titleSlug
              content
              isPaidOnly
              difficulty
              likes
              dislikes
              similarQuestions
              exampleTestcases
              topicTags {
                  name
                  slug
                  translatedName
              }
              codeSnippets {
                  lang
                  langSlug
                  code
              }
              stats
              hints
              sampleTestCase
              metaData
          }
      }`,
        variables: {
          titleSlug,
        },
      }),
    });
    const result = await response.json();
    return NextResponse.json({
      message: "good",
      question: result.data.question,
    });
  } catch (error) {
    return NextResponse.json({ message: "bad" });
  }
}
