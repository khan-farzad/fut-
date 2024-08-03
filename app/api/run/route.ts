import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const HEADERS = {
  "accept": "*/*",
    "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
    "content-type": "application/json",
    "priority": "u=1, i",
    "sec-ch-ua": "\"Not/A)Brand\";v=\"8\", \"Chromium\";v=\"126\", \"Google Chrome\";v=\"126\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"macOS\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "x-csrftoken": "Qd6JZGKNdnk6vMYQJBW9mq26UzWVBN0p5yyo670xqyNDCMIxJQcJ7tNGkb0Ese4R",
    "cookie": process.env.COOKIE,
    "Referer": "https://leetcode.com/problems/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
};

export async function POST(request: NextRequest) {
  try {
    const { lang, question_id, typed_code, titleSlug, data_input } =
      await request.json();
    const response = await axios({
      method: "post",
      url: `https://leetcode.com/problems/${titleSlug}/interpret_solution/`,
      headers: HEADERS,
      data: {
        lang: lang,
        question_id: question_id,
        typed_code: typed_code,
        data_input: data_input,
      },
    });
    const interpret_id = response.data.interpret_id;

    while (true) {
      const result = await axios({
        method: "get",
        url: `https://leetcode.com/submissions/detail/${interpret_id}/check/`,
        headers: HEADERS,
      });
      if (result.data.state === "SUCCESS") {
        return NextResponse.json({ data: result.data }, { status: 200 });
      }
      console.log(".");
    }
  } catch (error) {
    return NextResponse.json({ msg: "Bad" }, { status: 500 });
  }
}
