import { useState } from "react";

interface ModalProps {
  report: {
    oneLineSummary: string;
    overview: string;
    emotionSummary: string;
    emotionKeywords: string[];
    riskAnalysis: string;
    recommendationMessage: string;
    recommendations: { title: string; link: string }[];
  };
  onClose: () => void;
}

const ReportModal = ({ report, onClose }: ModalProps) => {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggle = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white max-h-[90vh] overflow-hidden rounded-3xl w-[92%] max-w-xl shadow-2xl relative border border-gray-100">
        <div className="bg-gradient-to-r from-[#E8F5E9] to-white px-6 py-4 rounded-t-3xl flex justify-between items-center border-b border-green-100">
          <h2 className="text-lg font-bold text-green-700">Monthly Report</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-green-600 text-2xl"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="overflow-y-auto max-h-[75vh] p-6 space-y-4 text-sm text-gray-800">
          {/* Summary Section */}
          <div className="bg-green-50 border border-green-100 rounded-xl p-4 shadow-sm">
            <h3 className="font-semibold text-green-700 mb-1">Summary</h3>
            <p className="text-gray-800 text-sm">{report.oneLineSummary}</p>
          </div>

          {/* Overview Section */}
          <section className="border border-gray-200 rounded-xl">
            <button
              className="w-full text-left px-4 py-3 font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-t-xl"
              onClick={() => toggle("overview")}
            >
              📘 Overview
            </button>
            {openSection === "overview" && (
              <div className="px-4 py-3 text-gray-700 bg-white space-y-2 leading-relaxed">
                <p className="text-sm">{report.overview}</p>
              </div>
            )}
          </section>

          {/* Emotion Section */}
          <section className="border border-gray-200 rounded-xl">
            <button
              className="w-full text-left px-4 py-3 font-semibold text-purple-700 bg-purple-50 hover:bg-purple-100"
              onClick={() => toggle("emotion")}
            >
              💬 Emotion
            </button>
            {openSection === "emotion" && (
              <div className="px-4 py-3 text-gray-700 bg-white space-y-3">
                <p className="italic text-purple-800 bg-purple-100 p-2 rounded">
                  “{report.emotionSummary}”
                </p>
                <div className="flex flex-wrap gap-2">
                  {report.emotionKeywords.map((keyword, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-purple-200 text-purple-800 px-2 py-1 rounded-full"
                    >
                      #{keyword}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* Risk Section */}
          <section className="border border-gray-200 rounded-xl">
            <button
              className="w-full text-left px-4 py-3 font-semibold text-red-700 bg-red-50 hover:bg-red-100"
              onClick={() => toggle("risk")}
            >
              ⚠️ Risk Analysis
            </button>
            {openSection === "risk" && (
              <div className="px-4 py-3 text-gray-700 bg-white space-y-2">
                <p className="flex items-start gap-2 text-red-800 bg-red-100 p-2 rounded">
                  ⚠️ <span>{report.riskAnalysis}</span>
                </p>
              </div>
            )}
          </section>

          {/* Recommendation Section */}
          <section className="border border-gray-200 rounded-xl">
            <button
              className="w-full text-left px-4 py-3 font-semibold text-yellow-700 bg-yellow-50 hover:bg-yellow-100"
              onClick={() => toggle("recommendation")}
            >
              🌱 Recommendation
            </button>
            {openSection === "recommendation" && (
              <div className="px-4 py-3 text-gray-700 bg-white space-y-3">
                <p className="text-sm">{report.recommendationMessage}</p>
                {report.recommendations.length > 0 && (
                  <a
                    href={report.recommendations[0].link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-center text-sm bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                  >
                    👉 {report.recommendations[0].title}
                  </a>
                )}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default ReportModal;