import { useEffect, useState } from "react";
import { getPeriodDiary, getMonthlyReport, createMonthlyReport } from "../apis/diary";
import { DiaryItem, MonthlyReport } from "../apis/diary.type";
import ReportModal from "./ReportModal";

function getMonthStartEndUTC(year: number, month: number) {
  const start = new Date(Date.UTC(year, month - 1, 1, 0, 0, 0));
  const end = new Date(Date.UTC(year, month, 0, 23, 59, 59));
  return { start: start.toISOString(), end: end.toISOString() };
}

function getCellClass(count: number) {
  if (count >= 3) return "bg-[#388E3C] text-white font-semibold";
  if (count === 2) return "bg-[#A5D6A7] text-white";
  if (count === 1) return "bg-[#E6F4EA] text-[#2E7D32]";
  return "bg-[#F0F0F0] text-[#B0B0B0]";
}

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
  const [selectedReport, setSelectedReport] = useState<MonthlyReport | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const [reportAvailable, setReportAvailable] = useState<{ [month: number]: boolean }>({});

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
        console.error("Failed to fetch first diary", err);
      }
    };
    fetchFirstDate();
  }, []);

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
        } catch {
          diaryMap[month] = [];
        }
      }
      setAllDiaries(diaryMap);
      setIsLoading(false);
    };

    fetchYearlyData();
  }, [currentYear, firstAnswerDate]);

  useEffect(() => {
    if (!firstAnswerDate) return;

    const fetchReportFlags = async () => {
      const availability: { [month: number]: boolean } = {};

      await Promise.all(
        Array.from({ length: 12 }, (_, i) => i + 1).map(async (month) => {
          try {
            await getMonthlyReport(currentYear, month);
            availability[month] = true;
          } catch (err: any) {
            availability[month] = false;
          }
        })
      );

      setReportAvailable(availability);
    };

    fetchReportFlags();
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

  const handleReportClick = async (month: number) => {
    try {
      const report = await getMonthlyReport(currentYear, month);
      setSelectedReport(report);
      setSelectedMonth(month);
    } catch (err: any) {
      if (err.response?.status === 404) {
        try {
          const created = await createMonthlyReport(currentYear, month);
          setSelectedReport(created);
          setSelectedMonth(month);
        } catch {
          alert("Failed to create report.");
        }
      } else {
        alert("Failed to fetch report.");
      }
    }
  };

  return (
    <div className="p-2 pb-24 relative">
      <div className="flex justify-center items-center gap-4 mb-2">
        <button onClick={() => setCurrentYear((y) => y - 1)} className="text-lg font-bold">←</button>
        <h2 className="text-lg font-bold">{currentYear}</h2>
        <button onClick={() => setCurrentYear((y) => y + 1)} className="text-lg font-bold">→</button>
      </div>

      {isLoading ? (
        <div className="text-center text-sm text-gray-400 py-10">Loading...</div>
      ) : visibleCards.length === 0 ? (
        <div className="text-center text-sm text-gray-400 py-10">No reports available for this year.</div>
      ) : (
        <div className="grid grid-cols-2 gap-1">
          {visibleCards.map(({ month, diaries }) => {
            const daysInMonth = new Date(currentYear, month, 0).getDate();
            const countMap: { [day: number]: number } = {};
            diaries.forEach((item) => {
              const day = new Date(item.createdAt).getDate();
              countMap[day] = (countMap[day] || 0) + 1;
            });

            const firstDay = new Date(currentYear, month - 1, 1).getDay();
            const offset = (firstDay + 6) % 7;

            return (
              <section
                key={month}
                className={`relative bg-white rounded border p-1 space-y-1 border-gray-200`}
              >
                <h3 className="text-[10px] font-medium text-center text-gray-800">
                  {MONTH_NAMES[month - 1]}
                </h3>

                <div className="grid grid-cols-7 gap-[1px] text-[9px]">
                  {Array.from({ length: offset }).map((_, i) => (
                    <div key={`empty-${i}`} className="w-5 h-5" />
                  ))}
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

                <div className="absolute bottom-1 right-1">
                  <button
                    onClick={() => handleReportClick(month)}
                    disabled={!reportAvailable[month]}
                    className={`text-[9px] px-2 py-[2px] rounded shadow transition
                      ${
                        reportAvailable[month]
                          ? "bg-green-600 text-white hover:bg-green-700"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                  >
                    Report
                  </button>
                </div>
              </section>
            );
          })}
        </div>
      )}

      {selectedReport && selectedMonth !== null && (
        <ReportModal
  onClose={() => setSelectedReport(null)}
  report={selectedReport}
/>
      )}
    </div>
  );
}

export default ReportMonthly;