import { useMemo } from "react";
import treeBg from "../assets/images/treeHome.png";

const TOTAL_CIRCLES = 90;
const COLORS = ["#4CAF50", "#81C784", "#AED581", "#66BB6A", "#A5D6A7", "#26A69A"];

function TreeTrunk({ answeredCount }: { answeredCount: number }) {
  const baseWidth = 600;
  const radius = baseWidth * 0.3;
  const centerX = baseWidth * 0.5;
  const centerY = baseWidth * 0.45;

  const circles = useMemo(() => {
    type Circle = {
      xPercent: number;
      yPercent: number;
      sizePercent: number;
      color: string;
      delay: number;
    };

    const newCircles: Circle[] = [];
    const MAX_ATTEMPTS = 1000;

    let attempts = 0;
    while (newCircles.length < answeredCount * 3 && attempts < MAX_ATTEMPTS) {
      const angle = Math.random() * 2 * Math.PI;
      const r = Math.sqrt(Math.random()) * radius;
      const x = centerX + r * Math.cos(angle);
      const y = centerY + r * Math.sin(angle);
      const size = Math.random() * 30 + 10;

      const isOverlapping = newCircles.some((circle) => {
        const dx = (circle.xPercent / 100) * baseWidth - x;
        const dy = (circle.yPercent / 100) * baseWidth - y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        return distance < ((circle.sizePercent / 100) * baseWidth + size) / 2 + 1;
      });

      if (!isOverlapping) {
        newCircles.push({
          xPercent: (x / baseWidth) * 100,
          yPercent: (y / baseWidth) * 100,
          sizePercent: (size / baseWidth) * 100,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          delay: Math.random() * 2,
        });
      }

      attempts++;
    }

    return newCircles;
  }, [answeredCount]);

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
              width: `${circle.sizePercent}%`,
              height: `${circle.sizePercent}%`,
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
        <div className="font-PExtraBold text-main text-base">
          {answeredCount}/{TOTAL_CIRCLES} answered
        </div>
      </span>
    </div>
  );
}

export default TreeTrunk;
