'use client'
import { ntpQues } from "@/data"
import { useRouter } from "next/navigation"
import ScrollToBottom, { useScrollToBottom } from 'react-scroll-to-bottom'
const page = ({params}: {
    params: {
        game: string
    }
}) => {
    const {game} = params
    const router = useRouter()
    const validGame = ['noob-to-pro','blind-75','CAP']
    if (!validGame.includes(game)) {
        router.push('/')
    }
    const ques = ntpQues
        
    const scrollToBottom = useScrollToBottom()
  return (
    <div>
      <h1>{game}</h1>
      <ScrollToBottom className="scroll-container">

      <div className="flex flex-col-reverse gap-16 w-full items-center">

      {ntpQues.map(q => (
        <>
        <div className="flex justify-between items-center bg-green-400 w-1/2 h-1/5">
          <div className="flex flex-col justify-between items-center"><h2>{q.step_no}</h2><h2>{q.step_title}</h2></div>
          <button>Continue</button>
        </div>
        <div className="flex flex-col-reverse">
          {q.sub_steps.map(sub => (
            sub.topics.map(t => (
              <p>{t.question_title}</p>
            )) 
          )) }
        </div>
        </>
      )) }
      </div>
      </ScrollToBottom>
    </div>

  )
}

export default page
