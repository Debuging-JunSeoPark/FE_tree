// src/components/EditProfileModal.tsx
import { useState } from "react";
import { UserProfile } from "../apis/user.type";

interface Props {
  initialProfile: UserProfile;
  onClose: () => void;
  onSave: (updatedProfile: UserProfile) => void;
}

const avatars: UserProfile["avatar"][] = ["GREEN", "YELLOW", "PINK"];

function EditProfileModal({ initialProfile, onClose, onSave }: Props) {
  const [nickname, setNickname] = useState(initialProfile.nickname);
  const [avatar, setAvatar] = useState<UserProfile["avatar"]>(initialProfile.avatar);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl p-6 w-80 shadow-md relative">
        <h2 className="text-lg font-semibold mb-4 text-center">프로필 수정</h2>

        <label className="text-sm text-gray-700">닉네임</label>
        <input
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 mb-4 mt-1"
        />

        <label className="text-sm text-gray-700">아바타 색상</label>
        <div className="flex justify-around my-2">
          {avatars.map((color) => (
            <button
              key={color}
              onClick={() => setAvatar(color)}
              className={`w-10 h-10 rounded-full border-2 ${
                avatar === color ? "border-green-600" : "border-gray-300"
              }`}
              style={{
                backgroundColor:
                  color === "GREEN" ? "#4CAF50" : color === "YELLOW" ? "#FFEB3B" : "#F48FB1",
              }}
            />
          ))}
        </div>

        <div className="flex justify-between mt-4">
          <button onClick={onClose} className="px-4 py-2 text-sm rounded bg-gray-300">
            취소
          </button>
          <button
            onClick={() => onSave({ nickname, avatar })}
            className="px-4 py-2 text-sm rounded bg-green-500 text-white"
          >
            저장
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditProfileModal;
