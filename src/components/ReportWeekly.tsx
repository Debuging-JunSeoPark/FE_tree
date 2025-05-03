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

const weekKeys = Object.keys(dummyWeeklyData) as WeekKey[];

function ReportWeekly() {
  const [activeIndex, setActiveIndex] = useState(1);

  return (
    <div className="px-4 py-6 font-PRegular">
      <h2 className="text-2xl font-PBold mb-2 text-center">
        {weekKeys[activeIndex]}
      </h2>

      {/* ➕ Daily Progress Details 텍스트 */}
      <p className="text-sm text-gray-700 mb-2 text-left font-PMedium">Daily Progress Details</p>

      <Swiper
        spaceBetween={30}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        initialSlide={1}
        centeredSlides={true}
        slidesPerView={1}
      >
        {weekKeys.map((week, idx) => (
          <SwiperSlide key={week}>
          <div className="w-full max-w-[600px] h-[220px] bg-white rounded border border-gray-200 shadow-md p-4">
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
                      <stop
                        offset="5%"
                        stopColor="#0F9D58"
                        stopOpacity={0.8}
                      />
                      <stop
                        offset="95%"
                        stopColor="#FFFED9"
                        stopOpacity={0}
                      />
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
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default ReportWeekly;
