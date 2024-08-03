import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

const HEADERS = {
  "x-csrftoken": process.env.TOKEN,
  Referer: process.env.API + "/problems/",
  cookie: process.env.COOKIE + "csrftoken=" + process.env.TOKEN,
};

export async function POST(request: NextRequest) {
  try {
    const { lang, question_id, typed_code, titleSlug, data_input } =
      await request.json();
    const response = await axios({
      method: "post",
      url: `${process.env.API}/problems/${titleSlug}/interpret_solution/`,
      headers: HEADERS,
      data: {
        lang: lang,
        data_input: data_input,
        typed_code: typed_code,
        question_id: question_id,
      },
    });
    const interpret_id = response.data.interpret_id;

    while (true) {
      const result = await axios({
        method: "get",
        url: `${process.env.API}/submissions/detail/${interpret_id}/check/`,
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
