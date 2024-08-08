import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

const HEADERS = [
  {
    "x-rapidapi-key": process.env.API_KEY,
    "x-rapidapi-host": process.env.API_HOST,
    "Content-Type": "application/json",
  },
  {
    "x-rapidapi-key": process.env.API_KEY2,
    "x-rapidapi-host": process.env.API_HOST,
    "Content-Type": "application/json",
  },
];

export async function POST(request: NextRequest) {
  try {
    const { toSend } = await request.json();
    let response;
    let postOptions = {
      method: "post",
      url: `https://${process.env.API_HOST}/submissions?base64_encoded=true&wait=false&fields=*`,
      headers: HEADERS[0],
      data: {
        language_id: 70,
        source_code: toSend,
        stdin: "",
      },
    };
    for (let i = 0; i < HEADERS.length; i++) {
      postOptions.headers = HEADERS[i];
      try {
        response = await axios(postOptions);
        break;
      } catch (error: any) {
        if (
          error.response &&
          error.response.status === 429 &&
          i < HEADERS.length - 1
        ) {
          continue;
        } else {
          throw error;
        }
      }
    }
    const response_id = response!.data.token;
    console.log(response_id);
    while (true) {
      const result = await axios({
        method: "get",
        url: `https://${process.env.API_HOST}/submissions/${response_id}?base64_encoded=false&fields=*`,
        headers: HEADERS[0],
      });
      if (
        result.data.status.description != "Processing" &&
        result.data.status.description != "In Queue"
      ) {
        return NextResponse.json({ data: result.data }, { status: 200 });
      }
      console.log(".");
    }
    return NextResponse.json({ status: 200 });
  } catch (error) {
    return NextResponse.json({ msg: "Bad" }, { status: 500 });
  }
}
