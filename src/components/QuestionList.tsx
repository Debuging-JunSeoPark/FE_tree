import { useEffect, useState } from "react";
import { getDiaryList, postDiary } from "../apis/diary";
import { DiaryContent, QType } from "../apis/diary.type";

interface QuestionTypeProps {
  qtype: QType;
}
function QuestionList({ qtype }: QuestionTypeProps) {
  const questions = [
    "List 3 things you were grateful for today",
    "Any insights or learnings you would like to jot down?",
    "What was the highlight of your day?",
  ];

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [answers, setAnswers] = useState<string[]>(
    new Array(questions.length).fill("")
  );
  const [submitted, setSubmitted] = useState<boolean[]>(
    new Array(questions.length).fill(false)
  );

  useEffect(() => {
    const fetchAnswers = async () => {
      try {
        const response = await getDiaryList(qtype);
        const filledAnswers = [...answers];
        const filledSubmitted = [...submitted];
        response.forEach((entry, idx) => {
          const parsed: DiaryContent = JSON.parse(entry.diary);
          filledAnswers[idx] = parsed.content;
          filledSubmitted[idx] = true;
        });
        setAnswers(filledAnswers);
        setSubmitted(filledSubmitted);
      } catch (error) {
        console.error("답변 조회 실패", error);
      }
    };
    fetchAnswers();
  }, [qtype]);
  const toggleQuestion = (index: number) => {
    setSelectedIndex((prev) => (prev === index ? null : index));
  };
  const handleSave = async (index: number) => {
    try {
      const diaryContent = { content: answers[index] };
      await postDiary({
        qtype: "morning1", //나중에 props로 수정
        diary: JSON.stringify(diaryContent),
      });
      setSubmitted((prev) => prev.map((v, i) => (i === index ? true : v)));
    } catch (error) {
      console.error("답변 전송 실패", error);
      throw error;
    }
  };

  const handleChange = (index: number, value: string) => {
    setAnswers((prev) =>
      prev.map((answer, i) => (i === index ? value : answer))
    );
  };
  return (
    <div className="flex flex-col">
      {questions.map((question, index) => {
        const isSelected = selectedIndex === index;
        const isAnswered = submitted[index];
        return (
          <div
            key={index}
            className={`rounded-md transition-all ${
              isSelected
                ? "bg-second border border-main shadow-sm"
                : "bg-white border-b border-gray-200"
            } mb-3`}
          >
            <div
              onClick={() => toggleQuestion(index)}
              className="flex items-center gap-3 p-3 cursor-pointer"
            >
              <div className="flex items-center justify-center rounded-full bg-[#d9d9d9] w-8 h-8 text-sm">
                {submitted[index] ? "✔️" : "❓"}
              </div>
              <div
                className={`text-sm ${
                  isSelected ? "font-PBold" : "font-PRegular"
                }`}
              >
                {question}
              </div>
            </div>

            {isSelected && (
              <div className="px-4 pb-3">
                {isAnswered ? (
                  <div>{answers[index]}</div>
                ) : (
                  <>
                    <textarea
                      className="w-full h-24 p-2 border border-gray-300 rounded text-sm resize-none"
                      placeholder="Enter a value between 0-100"
                      value={answers[index]}
                      onChange={(e) => handleChange(index, e.target.value)}
                    />
                    <button
                      onClick={() => handleSave(index)}
                      className="w-full h-10 rounded text-white bg-main font-PSemiBold text-sm"
                    >
                      Save
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default QuestionList;
