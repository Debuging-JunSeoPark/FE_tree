import { useEffect, useState } from "react";
import { getPeriodDiary } from "../apis/diary";
import { DiaryItem } from "../apis/diary.type";

// UTC 기준 월 시작/끝 ISO 계산
function getMonthStartEndUTC(year: number, month: number) {
  const start = new Date(Date.UTC(year, month - 1, 1, 0, 0, 0));
  const end = new Date(Date.UTC(year, month, 0, 23, 59, 59));
  return { start: start.toISOString(), end: end.toISOString() };
}

// 응답 수에 따른 셀 색상
function getCellClass(count: number) {
  if (count >= 3) {
    return "bg-[#388E3C] text-white font-semibold";
  } else if (count === 2) {
    return "bg-[#A5D6A7] text-white";
  } else if (count === 1) {
    return "bg-[#E6F4EA] text-[#2E7D32]";
  } else {
    return "bg-[#F0F0F0] text-[#B0B0B0]";
  }
}

// 월 영어 표기
const MONTH_NAMES = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

function ReportMonthly() {
  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [allDiaries, setAllDiaries] = useState<{ [month: number]: DiaryItem[] }>({});
  const [firstAnswerDate, setFirstAnswerDate] = useState<Date | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 첫 일기 날짜 조회
  useEffect(() => {
    const fetchFirstDate = async () => {
      try {
        const fullRes = await getPeriodDiary("2000-01-01T00:00:00Z", new Date().toISOString());
        const sorted = fullRes.diaries?.sort(
          (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
        if (sorted?.length) {
          setFirstAnswerDate(new Date(sorted[0].createdAt));
        }
      } catch (err) {
        console.error("첫 답변 조회 실패", err);
      }
    };
    fetchFirstDate();
  }, []);

  // 연도별 월간 데이터 조회
  useEffect(() => {
    const fetchYearlyData = async () => {
      if (!firstAnswerDate) return;
      setIsLoading(true);

      const diaryMap: { [month: number]: DiaryItem[] } = {};
      for (let month = 1; month <= 12; month++) {
        const { start, end } = getMonthStartEndUTC(currentYear, month);
        try {
          const res = await getPeriodDiary(start, end);
          diaryMap[month] = res.diaries ?? [];
        } catch (err) {
          diaryMap[month] = [];
        }
      }
      setAllDiaries(diaryMap);
      setIsLoading(false);
    };

    fetchYearlyData();
  }, [currentYear, firstAnswerDate]);

  const firstYear = firstAnswerDate?.getUTCFullYear();
  const firstMonth = firstAnswerDate?.getUTCMonth()! + 1;

  const visibleCards = Array.from({ length: 12 }, (_, i) => {
    const month = i + 1;
    const diaries = allDiaries[month] || [];

    if (
      firstAnswerDate &&
      (currentYear < firstYear! || (currentYear === firstYear && month < firstMonth))
    ) return null;

    if (diaries.length === 0) return null;

    return { month, diaries };
  }).filter(Boolean) as { month: number; diaries: DiaryItem[] }[];

  return (
    <div className="p-2">
      {/* 연도 네비게이션 */}
      <div className="flex justify-center items-center gap-4 mb-2">
        <button onClick={() => setCurrentYear((y) => y - 1)} className="text-lg font-bold">
          ←
        </button>
        <h2 className="text-lg font-bold">{currentYear}</h2>
        <button onClick={() => setCurrentYear((y) => y + 1)} className="text-lg font-bold">
          →
        </button>
      </div>

      {/* 로딩 / 없음 / 카드 */}
      {isLoading ? (
        <div className="text-center text-sm text-gray-400 py-10">
          Loading...
        </div>
      ) : visibleCards.length === 0 ? (
        <div className="text-center text-sm text-gray-400 py-10">
          No reports available for this year.
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-1">
          {visibleCards.map(({ month, diaries }) => {
            const daysInMonth = new Date(currentYear, month, 0).getDate();
            const countMap: { [day: number]: number } = {};

            diaries.forEach((item) => {
              const day = new Date(item.createdAt).getDate(); // ✅ KST 기준
              countMap[day] = (countMap[day] || 0) + 1;
            });

            // ✅ ISO 기준 요일 보정 (Mon=0, ..., Sun=6)
            const firstDay = new Date(currentYear, month - 1, 1).getDay(); // 0~6
            const offset = (firstDay + 6) % 7;

            return (
              <section
                key={month}
                className="bg-white rounded border border-gray-200 p-1 space-y-1"
              >
                <h3 className="text-[10px] font-medium text-center text-gray-800">
                  {MONTH_NAMES[month - 1]}
                </h3>

                <div className="grid grid-cols-7 gap-[1px] text-[9px]">
                  {/* 빈칸 삽입 */}
                  {Array.from({ length: offset }).map((_, i) => (
                    <div key={`empty-${i}`} className="w-5 h-5" />
                  ))}

                  {/* 날짜 셀 */}
                  {Array.from({ length: daysInMonth }, (_, d) => {
                    const day = d + 1;
                    const count = countMap[day] || 0;
                    const className = getCellClass(count);
                    return (
                      <div
                        key={day}
                        className={`w-5 h-5 rounded flex items-center justify-center ${className}`}
                      >
                        {day}
                      </div>
                    );
                  })}
                </div>

                <div className="flex justify-end pt-[2px]">
                  <button
                    disabled
                    className="text-[9px] px-2 py-[2px] bg-gray-200 text-gray-500 rounded cursor-not-allowed"
                  >
                    Report
                  </button>
                </div>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default ReportMonthly;
