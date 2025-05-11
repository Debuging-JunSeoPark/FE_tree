import { useEffect, useState } from "react";
import TreeTrunk from "../components/TreeTrunk";
import QuoteCard from "../components/QuoteCard";
import greenIcon from "../assets/images/treeIcon.svg";
import yellowIcon from "../assets/images/forsythiaIcon.svg";
import pinkIcon from "../assets/images/cherryBlossomIcon.svg";
import { getUserProfile } from "../apis/user";
import { getPeriodDiary } from "../apis/diary";

function Home() {
  const [nickname, setNickname] = useState<string>("");
  const [avatar, setAvatar] = useState<string>("");
  const [answeredCount, setAnsweredCount] = useState<number>(0);

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
      }
    };
    userInfo();
  }, []);

  const getStartOfMonth = (): string => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
  };

  const getToday = (): string => {
    return new Date().toISOString();
  };

  useEffect(() => {
    const fetchAnsweredCount = async () => {
      try {
        const start = getStartOfMonth();
        const end = getToday();
        const res = await getPeriodDiary(start, end);
        setAnsweredCount(res.count);
      } catch (error) {
        console.error("이번 달 일기 수 조회 실패", error);
      }
    };

    fetchAnsweredCount();
  }, []);

  const getDaysInMonth = (date: Date): number => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const totalCount = getDaysInMonth(new Date()) * 3;

  return (
    <div className="flex flex-col gap-4 w-full px-4 pt-4 pb-32">
      {/* 유저 정보 카드 */}
      <div className="flex flex-row items-center justify-start w-full max-w-[25rem] p-3 gap-2 min-h-[3.625rem] rounded-xl border-2 border-homeBorder bg-white mt-2 shadow-md">
        <div className="flex flex-row items-center gap-3">
          <img
            src={getAvatarImage(avatar)}
            alt="아이콘"
            className="w-10 h-10 rounded-full border-1 border-[#80A94D]"
          />
          <div className="font-PBold text-base text-black">
            {nickname || "Your Nickname"}
          </div>
        </div>
      </div>

      {/* 챌린지 */}
      <div>
        <div className="text-base text-black font-PMedium pl-2 mb-1">
          Questions Challenge
        </div>
        <div className="flex flex-col justify-center p-3 gap-2 w-full max-w-[25rem] min-h-[8rem] rounded-xl border-2 border-homeBorder shadow-lg bg-white">
          <TreeTrunk answeredCount={answeredCount} totalCount={totalCount} />
        </div>
      </div>

      {/* 명언 */}
      <div>
        <div className="text-base text-black font-PMedium pl-2 mb-1">
          Quote of the Day
        </div>
        <div className="flex flex-col justify-center p-3 gap-2 w-full max-w-[25rem] min-h-[8rem] rounded-xl border-2 border-homeBorder shadow-lg bg-white">
          <QuoteCard />
        </div>
      </div>
    </div>
  );
}

export default Home;
