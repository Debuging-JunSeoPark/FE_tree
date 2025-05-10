import { useEffect, useState } from "react";
import { getUserProfile } from "../apis/user";
import greenIcon from "../assets/images/treeIcon.svg";
import yellowIcon from "../assets/images/forsythiaIcon.svg";
import pinkIcon from "../assets/images/cherryBlossomIcon.svg";

function Mypage() {
  const [nickname, setNickname] = useState<string>("");
  const [email, setEmail] = useState<string>("example@email.com"); // ✅ 더미 데이터
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
    const fetchUserProfile = async () => {
      try {
        const user = await getUserProfile();
        setNickname(user.nickname);
        setAvatar(user.avatar);
        // setEmail(user.email); 
      } catch (error) {
        console.error("유저 정보 불러오기 실패", error);
      }
    };
    fetchUserProfile();
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-start w-full h-full px-4 py-8">
      {/* 수정 버튼 */}
      <button
        className="absolute top-4 right-4 px-4 py-1 text-sm text-white rounded-full"
        style={{ backgroundColor: "#0F9D58" }}
      >
        edit
      </button>

      {/* 프로필 영역 */}
      <div className="flex flex-col items-center w-full pb-6 border-b border-gray-300 shadow-[0_4px_4px_-2px_rgba(0,0,0,0.1)] max-w-md">
        <img
          src={getAvatarImage(avatar)}
          alt="아바타"
          className="w-24 h-24 rounded-full border-2 border-green-600 object-cover"
        />
        <div className="mt-4 text-lg font-bold text-black">
          {nickname || "nickname"}
        </div>
        <div className="mt-1 text-sm text-gray-500">
          {email}
        </div>
      </div>
      {/* Contact Us 영역 */}
      <a
        href="mailto:pjseo1313@hufs.ac.kr"
        className="w-full max-w-md mt-8 p-4 text-center text-base font-medium text-white rounded-lg shadow transition-colors"
        style={{
          backgroundColor: "#87CEAB",
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = "#0F9D58";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = "#87CEAB";
        }}
      >
        Contact Us
      </a>
    </div>
  );
}

export default Mypage;
