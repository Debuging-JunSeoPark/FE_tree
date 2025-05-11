import { useEffect } from "react";
import { useSpring, animated } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import splashlogo from "../assets/images/splashLogo.png";
import icon from "../assets/images/startIcon.svg";
import { useNavigate } from "react-router-dom";


function StartScreen() {
  const navigate = useNavigate();
  const peekHeight = 100;
  const sheetHeight = window.innerHeight * 0.75;
  const startOffset = 100; // 바텀시트 더 아래에서 시작
  const AnimatedDivAny = animated.div as any;

  // 바텀시트 전용 y
  const [{ y }, api] = useSpring(() => ({
    y: window.innerHeight - peekHeight + startOffset,
  }));

  // 로고 전용 yForLogo (항상 window.innerHeight - peekHeight 기준)
  const [{ yForLogo }, logoApi] = useSpring(() => ({
    yForLogo: window.innerHeight - peekHeight,
  }));

  // 드래그 동작 정의
  const bind = useDrag(
    ({ down, movement: [, my], cancel }) => {
      const currentY = y.get();
      const newY = currentY + my;

      if (newY < window.innerHeight - sheetHeight - 50) {
        cancel?.();
        return;
      }

      const isGoingDown = my > 100;
      const targetY = isGoingDown
        ? window.innerHeight - peekHeight
        : window.innerHeight - sheetHeight;

      api.start({ y: down ? newY : targetY });
    },
    { from: () => [0, y.get()] }
  );

  // 1초 후 자동으로 바텀시트 올라오게
  useEffect(() => {
    const timer = setTimeout(() => {
      api.start({ y: window.innerHeight - sheetHeight });
      logoApi.start({ yForLogo: window.innerHeight - sheetHeight });
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full h-screen relative bg-gradient-to-b from-main to-[#964B00] overflow-hidden">
      {/* 로고 + 슬로건: y 위치 비율로 따라 이동 */}
     <AnimatedDivAny
  className="absolute w-full h-screen flex flex-col items-center justify-center z-10"
  style={{
    transform: yForLogo.to((py) => {
      const ratio = 0.6;
      const offset = py - (window.innerHeight - peekHeight);
      return `translateY(${offset * ratio}px)`;
    }),
  }}
>
  {/* 로고 크기 명확히 지정 */}
  <img src={splashlogo} alt="로고" className="w-32 h-auto mb-3" />

  {/* 가운데 정렬 + 줄바꿈 방지 */}
  <div className="font-PMedium text-lg text-white text-center leading-snug px-4">
  Are you ready to grow?
  </div>
</AnimatedDivAny>





      {/* 바텀시트 */}
      <animated.div
        {...(bind() as any)}
        className="absolute left-0 w-full bg-white rounded-t-3xl shadow-xl touch-none"
        style={{
          transform: y.to((py) => `translateY(${py}px)`),
        }}
      >
        <div className="w-full h-[75vh] p-6 pt-2 flex flex-col items-center justify-around">
          <div className="w-24 h-1.5 bg-gray-300 rounded-full mb-2" />

          <img src={icon} alt="아이콘" className="w-35 h-35 rounded-full" />
          <div className="font-PBold text-3xl text-Title">We are what we do</div>
          <div className="text-center font-PRegular text-sub text-base">
          This service gently follows<br />
          the emotions in your subconscious,<br />
          helping you rediscover your inner self.
          </div>
          <div className="flex flex-col gap-5">
            <button
              onClick={() => navigate("/signup")}
              className="mt-4 w-80 h-12 bg-main text-[#f6f1fb] rounded-lg font-PMedium"
            >
              SIGN UP
            </button>
            <div className="flex flex-row items-center justify-center font-PMedium text-sm gap-1">
              <div className="text-[#A1A4B2]">ALREADY HAVE AN ACCOUNT?</div>
              <div
                onClick={() => navigate("/login")}
                className="text-main border-b border-main cursor-pointer"
              >
                LOG IN
              </div>
            </div>
          </div>
        </div>
      </animated.div>
    </div>
  );
}

export default StartScreen;
