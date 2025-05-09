import { useEffect, useState } from "react";
import icon from "../assets/images/Icon.png";
import TreeTrunk from "../components/TreeTrunk";
import Cookies from "js-cookie";
import QuoteCard from "../components/QuoteCard";

function Home() {
  const [nickname, setNickname] = useState<string>("");

  useEffect(() => {
    const userNickname = Cookies.get("nickname");
    if (userNickname) {
      setNickname(userNickname);
    }
  }, []);
  const answeredCount = 90;
  return (
    <div className="flex flex-col justify-center items-center h-full gap-4">
      <div className="flex flex-row items-center p-3 gap-2 w-84 h-14.5 rounded-xl border-2 border-homeBorder">
        <img
          src={icon}
          alt="아이콘"
          className="w-10 h-10 rounded-full border-1 border-[#80A94D]"
        />
        <div className="font-PBold text-base text-black">
          {nickname || "Your Nickname"}
        </div>
      </div>
      <div>
        <div className="text-base text-black font-PMedium pl-2 mb-1">
          Questions Challenge
        </div>
        <TreeTrunk answeredCount={answeredCount} />
      </div>
      <div>
        <div className="text-base text-black font-PMedium pl-2 mb-1">
          Quote of the Day
        </div>
        <div className="flex flex-col justify-center p-3 gap-2 w-84 h-32 rounded-xl border-2 border-homeBorder shadow-lg bg-white">
  <QuoteCard />
</div>
      </div>
    </div>
  );
}
export default Home;
