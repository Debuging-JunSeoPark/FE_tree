import treeIcon from "../assets/images/treeIcon.svg";
import forcyIcon from "../assets/images/forsythiaIcon.svg";
import blossomIcon from "../assets/images/cherryBlossomIcon.svg";
import logo from "../assets/images/logoGreen.svg";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import GetStartedButton from "../components/GetStartedButton";
import Header from "../components/Header";

function SelectAvatar() {
  const navigate = useNavigate();

  const [selectedAvatar, setSelectedAvatar] = useState<number | null>(null);
  const [nickname, setNickname] = useState<string>("");

  const handleSubmit = () => {
    if (selectedAvatar === null || nickname === "") {
      alert("Please select an avatar and enter a nickname.");
      return;
    }
    navigate("/");
  };
  return (
    <div className="relative">
      <div className="relative">
      <Header showLogo /> 
      </div>

      <div className="flex flex-col items-center justify-around gap-5 pt-24 px-6">
        <div className="flex font-PBold text-2xl text-center my-3">
          Choice Your Avatar
        </div>
        <img
          src={treeIcon}
          alt="1번 아이콘"
          onClick={() => setSelectedAvatar(1)}
          className={`rounded-full w-37 h-37 cursor-pointer border-4 ${
            selectedAvatar === 1 ? "border-main" : "border-transparent"
          }`}
        />
        <div className="flex flex-row gap-5">
          <img
            src={forcyIcon}
            alt="2번 아이콘"
            onClick={() => setSelectedAvatar(2)}
            className={`rounded-full w-37 h-37 cursor-pointer border-4 ${
              selectedAvatar === 2 ? "border-main" : "border-transparent"
            }`}
          />
          <img
            src={blossomIcon}
            alt="3번 아이콘"
            onClick={() => setSelectedAvatar(3)}
            className={`rounded-full w-37 h-37 cursor-pointer border-4 ${
              selectedAvatar === 3 ? "border-main" : "border-transparent"
            }`}
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <div className="flex font-PRegular text-xs text-[#72777A] w-85">
            Nickname
          </div>
          <input
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            className="border border-[#E3E5E5] w-85 h-12 rounded-lg p-4"
          ></input>
        </div>
        <GetStartedButton />
      </div>
    </div>
  );
}
export default SelectAvatar;
