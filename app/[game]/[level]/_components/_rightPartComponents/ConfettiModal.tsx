import Confetti from "react-confetti"
import { IoDiamond } from "react-icons/io5"

const ConfettiModal = () => {
  return (
    <div className="absolute inset-0 size-full bg-black/30 z-[100] flex-center text-white text-4xl">
          <div className=" top-2 right-10 flex-center gap-2">
            <Confetti
              recycle={false}
              confettiSource={{
                x: window.innerWidth / 2,
                y: window.innerHeight / 2,
                w: 0,
                h: 0,
              }}
            />
            <IoDiamond className="rotate-diamond" />
            <p>+10</p>
          </div>
        </div>
  )
}

export default ConfettiModal