import { useEffect, useState } from "react";
import { getPeriodDiary, postDiary } from "../apis/diary";
import { DiaryContent, QType } from "../apis/diary.type";

interface QuestionListProps {
  selectedSlot: "Morning" | "Lunch" | "Evening";
  setSelectedSlot: (slot: "Morning" | "Lunch" | "Evening") => void;
  selectedDate: Date;
}

function QuestionList({
  selectedSlot,
  setSelectedSlot,
  selectedDate,
}: QuestionListProps) {
  const questions = [
    "What are your plans for today? How do you feel as you start your day?",
    "Is your day going well so far? Have there been any events that influenced your mood?",
    "As you end the day, freely reflect on what happened today and how you felt.",
  ];

  const getQTypeByIndex = (index: number): QType => {
    if (index === 0) return "morning";
    if (index === 1) return "lunch";
    return "evening";
  };

  const getIndexBySlot = (slot: "Morning" | "Lunch" | "Evening"): number => {
    if (slot === "Morning") return 0;
    if (slot === "Lunch") return 1;
    return 2;
  };

  const getSlotByIndex = (index: number): "Morning" | "Lunch" | "Evening" => {
    if (index === 0) return "Morning";
    if (index === 1) return "Lunch";
    return "Evening";
  };

  const [selectedIndex, setSelectedIndex] = useState<number | null>(
    getIndexBySlot(selectedSlot)
  );
  const [answers, setAnswers] = useState<string[]>(new Array(3).fill(""));
  const [submitted, setSubmitted] = useState<boolean[]>(
    new Array(3).fill(false)
  );

  useEffect(() => {
    setSelectedIndex(getIndexBySlot(selectedSlot));
  }, [selectedSlot]);

  useEffect(() => {
    const fetchAnswers = async () => {
      const filledAnswers = new Array(3).fill("");
      const filledSubmitted = new Array(3).fill(false);

      // UTC 기준 자정부터 하루 끝까지 설정
      const localDate = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate()
      );
      const start = new Date(
        Date.UTC(
          localDate.getFullYear(),
          localDate.getMonth(),
          localDate.getDate()
        )
      );
      const end = new Date(start.getTime() + 24 * 60 * 60 * 1000 - 1);

      try {
        const response = await getPeriodDiary(
          start.toISOString(),
          end.toISOString()
        );

        for (let index = 0; index < 3; index++) {
          const qtype = getQTypeByIndex(index);
          const match = response.diaries.find((entry) => entry.qtype === qtype);
          if (match) {
            let content = "";
            try {
              const parsed = JSON.parse(match.diary);
              if (parsed && typeof parsed.content === "string") {
                content = parsed.content;
              }
            } catch {
              content = match.diary; // 일반 문자열일 경우
            }

            filledAnswers[index] = content;
            filledSubmitted[index] = true;
          }
        }

        setAnswers(filledAnswers);
        setSubmitted(filledSubmitted);
      } catch (error) {
        console.error("답변 조회 실패", error);
      }
    };

    fetchAnswers();
  }, [selectedDate]);

  const toggleQuestion = (index: number) => {
    const slot = getSlotByIndex(index);
    setSelectedSlot(slot);
    setSelectedIndex((prev) => (prev === index ? null : index));
  };

  const handleSave = async (index: number) => {
    if (submitted[index]) return;
    try {
      const diaryContent: DiaryContent = {
        content: answers[index],
      };

      await postDiary({
        qtype: getQTypeByIndex(index),
        diary: JSON.stringify(diaryContent),
      });

      setSubmitted((prev) => prev.map((v, i) => (i === index ? true : v)));
    } catch (error) {
      console.error("답변 전송 실패", error);
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
                {isAnswered ? "✔️" : "❓"}
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
                  <div className="w-full whitespace-pre-wrap break-words overflow-y-auto">
                    {answers[index]}
                  </div>
                ) : (
                  <>
                    <textarea
                      className="w-full h-24 p-2 border border-gray-300 rounded text-sm resize-none"
                      placeholder="Write your answer..."
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
