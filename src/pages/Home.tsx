import { useEffect, useState } from "react";
import TreeTrunk from "../components/TreeTrunk";
import QuoteCard from "../components/QuoteCard";
import greenIcon from "../assets/images/treeIcon.svg";
import yellowIcon from "../assets/images/forsythiaIcon.svg";
import pinkIcon from "../assets/images/cherryBlossomIcon.svg";
import { getUserProfile } from "../apis/user";

function Home() {
  const [nickname, setNickname] = useState<string>("");
  const [avatar, setAvatar] = useState<string>("");
  const getAvatarImage = (avatar: string | null): string => {
    switch (avatar) {
      case "GREEN":
        return greenIcon;
      case "YELLOW":
        return yellowIcon;
      case "PINK":
        return pinkIcon;
      default:
        return greenIcon;
    }
  };
  useEffect(() => {
    const userInfo = async () => {
      try {
        const user = await getUserProfile();
        setNickname(user.nickname);
        setAvatar(user.avatar);
      } catch (error) {
        console.error("유저 정보 불러오기 실패");
        throw error;
      }
    };
    userInfo();
  }, []);

  const answeredCount = 90;
  return (
    <div className="flex flex-col justify-center items-center h-full gap-4">
      <div className="flex flex-row items-center p-3 gap-2 w-84 h-14.5 rounded-xl border-2 border-homeBorder">
        <img
          src={getAvatarImage(avatar)}
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
