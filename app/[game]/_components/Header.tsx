import TotalPoints from "./TotalPoints";
import { FaRandom } from "react-icons/fa";
import { RxAvatar } from "react-icons/rx";
import { useRouter } from "next/navigation";

const Header = ({ randomQues, game }: { randomQues: string; game: string }) => {
  const router = useRouter();
  return (
    <div className="fixed z-[100] top-2 right-10 flex-center gap-4 mr-10">
      <button
        className="active:scale-90"
        onClick={() => router.push(`/${game}/${randomQues}`)}
      >
        <FaRandom className="cursor-pointer" />
      </button>
      <TotalPoints />
      <button onClick={()=>router.push('/profile')} className="active:scale-90">
        <RxAvatar className="z-[100]" size={25} />
      </button>
    </div>
  );
};
export default Header;
