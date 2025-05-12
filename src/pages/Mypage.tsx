import { useEffect, useState } from "react";
import { getUserProfile, putUserProfile } from "../apis/user";
import { UserProfile } from "../apis/user.type";
import greenIcon from "../assets/images/treeIcon.svg";
import yellowIcon from "../assets/images/forsythiaIcon.svg";
import pinkIcon from "../assets/images/cherryBlossomIcon.svg";
import EditProfileModal from "../components/EditProfileModal";

function Mypage() {
  const [profile, setProfile] = useState<UserProfile>({
    nickname: "",
    avatar: "",
    email: "",
  });

  const [showModal, setShowModal] = useState(false);

  const fetchProfile = async () => {
    try {
      const res = await getUserProfile();
      setProfile(res);
    } catch (e) {
      console.error("유저 정보 조회 실패", e);
    }
  };

  const handleSave = async (updatedProfile: UserProfile) => {
    try {
      await putUserProfile(updatedProfile);
      setShowModal(false);
      await fetchProfile(); // 최신 정보 반영
    } catch (e) {
      alert("프로필 저장 실패");
    }
  };

  const getAvatarImage = (avatar: string): string | null => {
    switch (avatar) {
      case "GREEN":
        return greenIcon;
      case "YELLOW":
        return yellowIcon;
      case "PINK":
        return pinkIcon;
      default:
        return null; // ✅ 디폴트 GREEN 제거
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-start w-full h-full px-4 py-8">
      <div className="relative flex flex-col items-center w-full pb-6 border-b border-gray-300 shadow max-w-md">
        {/* edit 버튼 */}
        <button
          className="absolute top-2 right-2 px-3 py-1 text-sm text-white rounded-full"
          style={{ backgroundColor: "#0F9D58" }}
          onClick={() => setShowModal(true)}
        >
          edit
        </button>

        {/* 아바타 이미지 또는 스켈레톤 */}
        {getAvatarImage(profile.avatar) ? (
          <img
            src={getAvatarImage(profile.avatar)!}
            alt="아바타"
            className="w-24 h-24 rounded-full border-2 border-green-600 object-cover"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-gray-200 border-2 border-gray-400" />
        )}

        {/* 닉네임 / 이메일 */}
        <div className="mt-4 text-lg font-bold text-black">
          {profile.nickname || "nickname"}
        </div>
        <div className="mt-1 text-sm text-gray-500">
          {profile.email || "example@email.com"}
        </div>
      </div>

      {/* 문의하기 버튼 */}
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

      {/* 모달 */}
      {showModal && (
        <EditProfileModal
          initialProfile={profile}
          onClose={() => setShowModal(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

export default Mypage;
