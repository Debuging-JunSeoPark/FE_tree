import { useState } from "react";
import ReportWeekly from "../components/ReportWeekly";
import ReportMonthly from "../components/ReportMonthly";

function Report() {
  const [activeTab, setActiveTab] = useState<"weekly" | "monthly">("weekly");

  return (
    <div className="w-full max-w-md mx-auto pt-4 px-4">
      {/* 탭 바 */}
      <div className="flex border-b border-gray-200">
        <button
          className={`flex-1 text-center pb-2 font-PBold text-lg transition-all duration-300 ${
            activeTab === "weekly"
              ? "text-[#0F9D58] border-b-[5px] border-[#0F9D58]"
              : "text-gray-400"
          }`}
          onClick={() => setActiveTab("weekly")}
        >
          Weekly
        </button>
        <button
          className={`flex-1 text-center pb-2 font-PBold text-lg transition-all duration-300 ${
            activeTab === "monthly"
              ? "text-[#0F9D58] border-b-[5px] border-[#0F9D58]"
              : "text-gray-400"
          }`}
          onClick={() => setActiveTab("monthly")}
        >
          Monthly
        </button>
      </div>

      {/* 콘텐츠 영역 */}
      <div className="mt-6 min-h-[100px]">
        {activeTab === "weekly" ? <ReportWeekly /> : <ReportMonthly />}
      </div>
    </div>
  );
}

export default Report;
