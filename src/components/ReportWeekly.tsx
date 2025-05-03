import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import WordCloud, { Word } from "../components/WordCloud"; // ⬅️ 추가

type DayData = { day: string; count: number };
type WeekKey = "2025 Apr week1" | "2025 Apr week2" | "2025 Apr week3";

const dummyWeeklyData: Record<WeekKey, DayData[]> = {
  "2025 Apr week1": [
    { day: "Mon", count: 2 },
    { day: "Tue", count: 3 },
    { day: "Wed", count: 1 },
    { day: "Thu", count: 3 },
    { day: "Fri", count: 2 },
    { day: "Sat", count: 0 },
    { day: "Sun", count: 0 },
  ],
  "2025 Apr week2": [
    { day: "Mon", count: 3 },
    { day: "Tue", count: 2 },
    { day: "Wed", count: 2 },
    { day: "Thu", count: 1 },
    { day: "Fri", count: 3 },
    { day: "Sat", count: 1 },
    { day: "Sun", count: 1 },
  ],
  "2025 Apr week3": [
    { day: "Mon", count: 1 },
    { day: "Tue", count: 2 },
    { day: "Wed", count: 3 },
    { day: "Thu", count: 2 },
    { day: "Fri", count: 1 },
    { day: "Sat", count: 2 },
    { day: "Sun", count: 1 },
  ],
};

const dummyWordData: Record<WeekKey, Word[]> = {
  "2025 Apr week1": [
    { text: "happy", value: 4000 },
    { text: "focus", value: 3000 },
    { text: "energy", value: 2400 },
    { text: "calm", value: 2000 },
    { text: "tired", value: 1600 },
    { text: "excited", value: 600 },
    { text: "motivated", value: 400 },
    { text: "rest", value: 200 },
    { text: "happy", value: 4000 },
    { text: "focus", value: 3000 },
    { text: "energy", value: 2400 },
    { text: "calm", value: 2000 },
    { text: "tired", value: 1600 },
    { text: "excited", value: 600 },
    { text: "motivated", value: 400 },
    { text: "rest", value: 200 },
    { text: "happy", value: 4000 },
    { text: "focus", value: 3000 },
    { text: "energy", value: 2400 },
    { text: "calm", value: 2000 },
    { text: "tired", value: 1600 },
    { text: "excited", value: 600 },
    { text: "motivated", value: 400 },
    { text: "rest", value: 200 },
    { text: "happy", value: 4000 },
    { text: "focus", value: 3000 },
    { text: "energy", value: 2400 },
    { text: "calm", value: 2000 },
    { text: "tired", value: 1600 },
    { text: "excited", value: 600 },
    { text: "motivated", value: 400 },
    { text: "rest", value: 200 },
  ],
  "2025 Apr week2": [
    { text: "tired", value: 9 },
    { text: "work", value: 7 },
    { text: "goal", value: 4 },
  ],
  "2025 Apr week3": [
    { text: "fun", value: 12 },
    { text: "game", value: 6 },
    { text: "rest", value: 5 },
  ],
};

const weekKeys = Object.keys(dummyWeeklyData) as WeekKey[];

function ReportWeekly() {
  const [activeIndex, setActiveIndex] = useState(1);

  return (
    <div className="px-4 py-6 font-PRegular">
      <h2 className="text-2xl font-PBold mb-2 text-center">
        {weekKeys[activeIndex]}
      </h2>

      <p className="text-left text-base font-PMedium text-gray-800 mb-2">
        Daily Progress Details
      </p>


      <Swiper
        spaceBetween={30}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        initialSlide={1}
        centeredSlides={true}
        slidesPerView={1}
      >
        {weekKeys.map((week, idx) => (
          <SwiperSlide key={week}>
            <div className="w-full max-w-[600px] mx-auto">
              <div className="h-[220px] bg-white rounded border border-gray-200 shadow-md p-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={dummyWeeklyData[week]}
                    margin={{ top: 10, right: 30, left: -30, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient
                        id={`colorCount-${idx}`}
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop offset="5%" stopColor="#0F9D58" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#FFFED9" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="day"
                      ticks={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]}
                    />
                    <YAxis
                      domain={[0, 3]}
                      ticks={[0, 1, 2, 3]}
                      allowDecimals={false}
                    />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="count"
                      stroke="#0F9D58"
                      fillOpacity={1}
                      fill={`url(#colorCount-${idx})`}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* ✅ 워드 클라우드 추가 */}
              <div className="mt-6">
                <p className="text-left text-base font-PMedium text-gray-800 mb-2">
                  Frequently used words
                </p>
                <div className="h-[200px] bg-white rounded border border-gray-200 shadow-md p-4">
                  <WordCloud words={dummyWordData[week]} />
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

    </div>
  );
}

export default ReportWeekly;
