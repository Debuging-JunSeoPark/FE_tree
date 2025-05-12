import { useMemo, useEffect, useState } from "react";
import treeBg from "../assets/images/treeHome.png";
import { getUserProfile } from "../apis/user";

const COLOR_MAP = {
  GREEN: ["#4CAF50", "#81C784", "#AED581", "#66BB6A", "#A5D6A7", "#26A69A"],
  YELLOW: ["#FFD54F", "#FFF176", "#FDD835", "#FFEE58", "#FBC02D", "#FFEB3B"],
  PINK: ["#F8BBD0", "#F48FB1", "#EC407A", "#F06292", "#E91E63", "#FF80AB"],
};

function TreeTrunk({
  answeredCount,
  totalCount,
}: {
  answeredCount: number;
  totalCount: number;
}) {
  const baseWidth = 600;
  const radius = baseWidth * 0.35;
  const centerX = baseWidth * 0.5;
  const centerY = baseWidth * 0.4;

  const [colors, setColors] = useState<string[]>(COLOR_MAP.GREEN);
  const [avatar, setAvatar] = useState<string>("GREEN");

  // 사용자 프로필에서 아바타 색상 불러오기
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const user = await getUserProfile();
        const colorSet = COLOR_MAP[user.avatar as keyof typeof COLOR_MAP];
        setColors(colorSet || COLOR_MAP.GREEN);
        setAvatar(user.avatar);
      } catch (error) {
        console.error("유저 정보 불러오기 실패", error);
      }
    };
    fetchUserProfile();
  }, []);

  const circleCount = answeredCount;

  const circles = useMemo(() => {
    type Circle = {
      xPercent: number;
      yPercent: number;
      sizePx: number;
      color: string;
      delay: number;
    };

    const newCircles: Circle[] = [];
    const MAX_ATTEMPTS = 1000;
    let attempts = 0;

    while (newCircles.length < circleCount && attempts < MAX_ATTEMPTS) {
      const angle = Math.random() * 2 * Math.PI;
      const r = Math.sqrt(Math.random()) * radius * 1.3;

      const x = centerX + r * Math.cos(angle) * 0.95;
      const yOffset = Math.random() * 60 - 30;
      const y = centerY + r * Math.sin(angle) * 0.75 + yOffset;

      const size = Math.random() * 14 + 10;

      const isOverlapping = newCircles.some((circle) => {
        const dx = (circle.xPercent / 100) * baseWidth - x;
        const dy = (circle.yPercent / 100) * baseWidth - y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        return distance < (circle.sizePx + size) / 2 + 1;
      });

      if (!isOverlapping) {
        newCircles.push({
          xPercent: (x / baseWidth) * 100,
          yPercent: (y / baseWidth) * 100,
          sizePx: size,
          color: colors[Math.floor(Math.random() * colors.length)],
          delay: Math.random() * 2,
        });
      }

      attempts++;
    }

    return newCircles;
  }, [circleCount, colors]);

  const labelColor = {
    GREEN: "text-green-600",
    YELLOW: "text-yellow-500",
    PINK: "text-pink-400",
  };

  return (
    <div className="flex flex-col items-center gap-2 w-full rounded-xl px-4">
      <div
        className="relative w-full h-[270px] rounded-xl overflow-hidden"
        style={{
          backgroundImage: `url(${treeBg})`,
          backgroundSize: "80%",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center bottom",
        }}
      >
        {circles.map((circle, idx) => (
          <div
            key={idx}
            className="absolute rounded-full float"
            style={{
              left: `${circle.xPercent}%`,
              top: `${circle.yPercent}%`,
              width: `${circle.sizePx}px`,
              height: `${circle.sizePx}px`,
              borderRadius: "50%",
              backgroundColor: circle.color,
              opacity: 0.85,
              zIndex: 1,
              animationDelay: `${circle.delay}s`,
            }}
          />
        ))}
      </div>
      <span className="flex flex-col items-end justify-end w-full px-2">
        <div className="font-PLight text-xs">Monthly Progress Visual</div>
        <div className={`font-PExtraBold text-base ${labelColor[avatar as keyof typeof labelColor]}`}>
          {answeredCount}/{totalCount} answered
        </div>
      </span>
    </div>
  );
}

export default TreeTrunk;