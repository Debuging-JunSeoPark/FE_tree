import { useMemo } from "react";
import treeBg from "../assets/images/treeHome.png"; // ✅ 백그라운드 이미지 import

const TOTAL_CIRCLES = 90;
const COLORS = ["#4CAF50", "#81C784", "#AED581", "#66BB6A", "#A5D6A7", "#26A69A"];

function TreeTrunk({ answeredCount }: { answeredCount: number }) {
  const radius = 110;
  const centerX = 150;
  const centerY = 140;

  const circles = useMemo(() => {
    type Circle = {
      x: number;
      y: number;
      size: number;
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
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];

      const isOverlapping = newCircles.some((circle) => {
        const dx = circle.x - x;
        const dy = circle.y - y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        return distance < (circle.size + size) / 2 + 1;
      });

      if (!isOverlapping) {
        newCircles.push({ x, y, size, color, delay: Math.random() * 2 });
      }

      attempts++;
    }

    return newCircles;
  }, [answeredCount]);

  return (
    <div className="flex flex-col items-center gap-2 w-84 h-90 rounded-xl border-2 border-homeBorder shadow-lg">
      <div
        className="relative w-full h-80 rounded-t-xl overflow-hidden"
        style={{
          backgroundImage: `url(${treeBg})`,
          backgroundSize: "90%",        
          backgroundRepeat: "no-repeat",     
          backgroundPosition: "center bottom", 
        }}
      >
        {circles.map((circle, idx) => (
          <div
            key={idx}
            className="absolute rounded-full float"
            style={{
              left: `${circle.x}px`,
              top: `${circle.y}px`,
              width: `${circle.size}px`,
              height: `${circle.size}px`,
              backgroundColor: circle.color,
              opacity: 0.85,
              zIndex: 1,
              animationDelay: `${circle.delay}s`,
            }}
          />
        ))}
      </div>
      <span className="flex flex-col items-end justify-end w-full mr-4">
        <div className="font-PLight text-xs">Monthly Progress Visual</div>
        <div className="font-PExtraBold text-main font-base">
          {answeredCount}/{TOTAL_CIRCLES} answered
        </div>
      </span>
    </div>
  );
}

export default TreeTrunk;
