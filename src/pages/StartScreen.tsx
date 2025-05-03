import { useEffect, useState } from "react";
import splashlogo from "../assets/images/splashLogo.png";
import icon from "../assets/images/startIcon.svg";
import { useNavigate } from "react-router-dom";

function StartScreen() {
  const [showSheet, setShowSheet] = useState(false);
  const [moveLogo, setMoveLogo] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setMoveLogo(true);
      setShowSheet(true);
    }, 1000); // 1초 뒤 바텀시트 등장

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full h-screen flex flex-col items-center justify-start bg-gradient-to-b from-main to-[#964B00] relative overflow-hidden">
      <div
        className={`flex flex-col items-center transition-all duration-700 ${
          moveLogo ? "mt-12 scale-110" : "mt-[100vh]"
        }`}
      >
        <img src={splashlogo} alt="로고" className="w-20 h-auto" />
        <div className="font-PMedium text-xl text-white">slogan</div>
      </div>

      {showSheet && (
        <div className="absolute flex flex-col items-center justify-around bottom-0 w-full h-[75vh] bg-white rounded-t-3xl p-3 py-15 animate-slide-up shadow-lg">
          <img src={icon} alt="아이콘" className="w-38 h-38 rounded-full"></img>
          <div className="font-PBold text-3xl text-Title">
            We are what we do
          </div>
          <div className="flex items-center justify-center text-center font-PRegular text-sub text-base">
            This service integrates emotion tracking and <br /> self-assessment
            to provide a structured approach <br /> to managing mental health in
            today’s society.
          </div>
          <div className="flex flex-col gap-5">
            <button
              onClick={() => navigate("/signup")}
              className="mt-4 w-85 h-12 bg-main text-[#f6f1fb] rounded-lg font-PMedium"
            >
              SIGN UP
            </button>
            <div className="flex flex-row items-center justify-center font-PMedium text-sm gap-1">
              <div className="text-[#A1A4B2]">ALREADY HAVE AN ACCOUNT?</div>
              <div
                onClick={() => navigate("/login")}
                className="text-main border-b border-main"
              >
                LOG IN
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default StartScreen;
