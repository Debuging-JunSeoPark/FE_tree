import { useEffect, useState } from "react";
import splashlogo from "../assets/images/splashLogo.png";

const text = "grow a tree for your mind";

function Splash() {
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowText(true);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <div className="w-full max-w-md mx-auto h-screen flex flex-col items-center justify-center bg-gradient-to-b from-main to-[#964B00]">
        {/* 로고: 위치 고정 */}
        <img
          src={splashlogo}
          alt="logo"
          className="w-32 h-auto mb-4"
          style={{
            transition: "none",
            transform: "none",
          }}
        />

        {/* 텍스트: 등장 전에도 자리 확보 */}
        <div className="flex space-x-1 text-white text-lg font-PMedium min-h-[1.5rem]">
          {showText &&
            text.split("").map((char, idx) => (
              <span
                key={idx}
                style={{
                  opacity: 0,
                  animation: `fadeInLetter 0.1s ease-out ${
                    idx * 0.03
                  }s forwards`,
                }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Splash;
