import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import WordCloud, { Word } from "../components/WordCloud";
import { extractWordFrequency } from "../utils/extractWordFrequency";
import { getPeriodDiary } from "../apis/diary";
import { getStartAndEndOfWeek } from "../utils/getStartAndEndOfWeek";
import { formatWeekKey } from "../utils/formatWeekKey";

const dayKeys = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"] as const;
type DayKey = (typeof dayKeys)[number];

function ReportWeekly() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [weeklyData, setWeeklyData] = useState<Record<DayKey, number>>({
    Su: 0, Mo: 0, Tu: 0, We: 0, Th: 0, Fr: 0, Sa: 0,
  });
  const [wordData, setWordData] = useState<Word[]>([]);

  const WEEK_SLIDE_RANGE = 2;
  const today = new Date();
  const todayUTC = toUTCStartOfDay(today);

  const generateDateByOffset = (offset: number) => {
    const d = new Date(today);
    d.setDate(d.getDate() + offset * 7);
    return d;
  };

  const getDayNameFromDate = (date: Date): DayKey => {
    // 한국 시간 (UTC+9) 기준으로 변환
    const utcPlus9 = new Date(date.getTime() + 9 * 60 * 60 * 1000);
    const dayIndex = utcPlus9.getUTCDay(); // 여전히 UTC 기준 요일 인덱스 사용
    const mondayFirstIndex = (dayIndex + 6) % 7;
    return dayKeys[mondayFirstIndex];
  };

  const weekOffsets = Array.from({ length: WEEK_SLIDE_RANGE * 2 + 1 }, (_, i) => i - WEEK_SLIDE_RANGE);

  useEffect(() => {
    const fetchWeeklyDiary = async () => {
      try {
        const { start, end } = getStartAndEndOfWeek(selectedDate);
        const res = await getPeriodDiary(start.toISOString(), end.toISOString());

        const dayMap: Record<DayKey, number> = {
          Su: 0, Mo: 0, Tu: 0, We: 0, Th: 0, Fr: 0, Sa: 0,
        };
        const diaryTexts: string[] = [];

        res.diaries.forEach((diary) => {
          const dayName = getDayNameFromDate(new Date(diary.createdAt));
          dayMap[dayName] = Math.min(dayMap[dayName] + 1, 3);
          

          try {
            const parsed = JSON.parse(diary.diary);
            if (parsed.content) diaryTexts.push(parsed.content);
          } catch {
            diaryTexts.push(diary.diary);
          }
        });

        setWeeklyData(dayMap);

        const mergedText = diaryTexts.join(" ");
        const extracted = extractWordFrequency(mergedText).map((w) => ({
          text: w.text,
          value: w.value,
        }));
        setWordData(extracted);
      } catch (error) {
        console.error("주간 일기 조회 실패", error);
        setWeeklyData({ Su: 0, Mo: 0, Tu: 0, We: 0, Th: 0, Fr: 0, Sa: 0 });
        setWordData([]);
      }
    };

    fetchWeeklyDiary();
  }, [selectedDate]);

  return (
    <div className="px-1 pt-0 pb-6 font-PRegular">
      <h2
        className="text-lg font-PBold text-center mt-0 mb-2 cursor-pointer"
        onClick={() => setShowPicker(!showPicker)}
      >
        {formatWeekKey(selectedDate)}
      </h2>

      {showPicker && (
        <div className="flex justify-center mb-4 z-50">
          <DatePicker
  inline
  selected={toLocalMidnight(selectedDate)}
  onChange={(date: Date | null) => {
    if (date) {
      const utcDate = toUTCStartOfDay(date);
      setSelectedDate(utcDate);
    }
  }}
  onSelect={() => setShowPicker(false)} // ✅ 항상 클릭 시 닫히도록 처리
  calendarStartDay={1}
  dayClassName={(date) => {
    
    const isToday =
      date.getUTCFullYear() === todayUTC.getUTCFullYear() &&
      date.getUTCMonth() === todayUTC.getUTCMonth() &&
      date.getUTCDate() === todayUTC.getUTCDate();

    return isToday ? "my-utc-today" : "";
  }}
/>



        </div>
      )}

      <p className="text-left text-base font-PMedium text-gray-800 mb-2">
        Daily Progress Details
      </p>

      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        slidesPerView={1}
        initialSlide={WEEK_SLIDE_RANGE}
        onSlideChange={(swiper) => {
          const offset = swiper.activeIndex - WEEK_SLIDE_RANGE;
          const newDate = generateDateByOffset(offset);
          setSelectedDate(newDate);
        }}
      >
        {weekOffsets.map((offset) => {
          const slideDate = generateDateByOffset(offset);
          const key = formatWeekKey(slideDate);

          return (
            <SwiperSlide key={key}>
              <div className="w-full max-w-[900px] mx-auto px-2">
                <div
                  className="h-[220px] bg-white rounded border border-gray-200 p-4"
                  style={{ boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.08)" }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={dayKeys.map((day) => ({
                        day,
                        count: weeklyData[day],
                      }))}
                      margin={{ top: 10, right: 30, left: -30, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#0F9D58" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#FFFED9" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" ticks={[...dayKeys]} />
                      <YAxis domain={[0, 3]} ticks={[0, 1, 2, 3]} allowDecimals={false} />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="count"
                        stroke="#0F9D58"
                        fillOpacity={1}
                        fill="url(#colorCount)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                <div className="mt-4">
                  <p className="text-left text-base font-PMedium text-gray-800 mb-2">
                    Frequently used words
                  </p>
                  <div
                    className="h-[220px] bg-white rounded border border-gray-200 p-4 overflow-hidden flex justify-center items-center"
                    style={{ boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.08)" }}
                  >
                    {wordData.length === 0 ? (
                      <p className="text-gray-400 text-sm italic">No diary entries this week.</p>
                    ) : (
                      <WordCloud words={wordData} width={600} height={200} />
                    )}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

// UTC 자정 기준 Date 생성
function toUTCStartOfDay(date: Date): Date {
  return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
}

// UTC → 로컬 자정 기준 Date 변환 (선택된 날짜를 정확히 표시하기 위함)
function toLocalMidnight(date: Date): Date {
  return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
}

export default ReportWeekly;
