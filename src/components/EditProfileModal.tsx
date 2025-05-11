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
        <div
            className="fixed inset-0 flex justify-center items-center z-50"
            style={{ backgroundColor: "rgba(220, 220, 220, 0.6)" }} // lightgray + 60% 투명
        >

            <div className="bg-white rounded-xl p-6 w-80 shadow-md relative">
                <h2 className="text-lg font-semibold mb-4 text-center">Edit Profile</h2>

                <label className="text-sm text-gray-700">Nickname</label>
                <input
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 mb-4 mt-1"
                />

                <label className="text-sm text-gray-700">Avatar Color</label>
                <div className="flex justify-around my-2">
                    {avatars.map((color) => (
                        <button
                            key={color}
                            onClick={() => setAvatar(color)}
                            className={`w-10 h-10 rounded-full border-2 ${avatar === color ? "border-green-600" : "border-gray-300"
                                }`}
                            style={{
                                backgroundColor:
                                    color === "GREEN" ? "#4CAF50" : color === "YELLOW" ? "#FFEB3B" : "#F48FB1",
                            }}
                        />
                    ))}
                </div>

                <div className="flex justify-between mt-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm rounded"
                        style={{ backgroundColor: "#D3D3D3" }}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => onSave({ nickname, avatar })}
                        className="px-4 py-2 text-sm rounded text-white"
                        style={{ backgroundColor: "#0F9D58" }}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EditProfileModal;
