import { useEffect, useState } from "react";
import { getPeriodDiary, postDiary, putTodayDiary } from "../apis/diary";
import { DiaryContent, QType } from "../apis/diary.type";
import toast from "react-hot-toast";

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
  const [editMode, setEditMode] = useState<boolean[]>([false, false, false]);
  const [todayDiaryIds, setTodayDiaryIds] = useState<(number | null)[]>([
    null,
    null,
    null,
  ]);

  useEffect(() => {
    setSelectedIndex(getIndexBySlot(selectedSlot));
  }, [selectedSlot]);

  useEffect(() => {
    const fetchAnswers = async () => {
      const filledAnswers = new Array(3).fill("");
      const filledSubmitted = new Array(3).fill(false);
      const filledDiaryIds = new Array(3).fill(null);

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

      // 오늘(UTC) 날짜 문자열
      const nowUtc = new Date();
      const currentUtcDateStr = nowUtc.toISOString().slice(0, 10); // 'YYYY-MM-DD'

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

            // createdAt이 오늘(UTC)과 같으면 diaryId 저장
            const createdAtDateStr = match.createdAt.slice(0, 10);
            if (createdAtDateStr === currentUtcDateStr) {
              filledDiaryIds[index] = match.diaryId;
            }
          }
        }
        setAnswers(filledAnswers);
        setSubmitted(filledSubmitted);
        setTodayDiaryIds(filledDiaryIds);
        setEditMode([false, false, false]); // 날짜 바뀌면 수정모드 해제
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
    try {
      const diaryContent: DiaryContent = {
        content: answers[index],
      };

      const data = {
        qtype: getQTypeByIndex(index),
        diary: JSON.stringify(diaryContent),
      };

      if (submitted[index] && todayDiaryIds[index]) {
        // 수정
        const res = await putTodayDiary(todayDiaryIds[index]!, data);
        console.log(res);
      } else {
        // selectedDate: 사용자가 선택한 Date 객체 (KST에서 생성되었더라도)
        const selectedDateUtc = new Date(
          Date.UTC(
            selectedDate.getFullYear(),
            selectedDate.getMonth(),
            selectedDate.getDate()
          )
        );
        const selectedUtcDateStr = selectedDateUtc.toISOString().slice(0, 10);
        const nowUtcDateStr = new Date().toISOString().slice(0, 10);

        if (selectedUtcDateStr !== nowUtcDateStr) {
          toast.error("Only today can be created/modified.");
          return;
        } else {
          // 최초 저장
          await postDiary(data);
        }
      }
      setSubmitted((prev) => prev.map((v, i) => (i === index ? true : v)));
      setEditMode((prev) => prev.map((v, i) => (i === index ? false : v)));
      // fetchAnswers(); // 필요시 새로고침
    } catch (error) {
      console.error("답변 전송/수정 실패", error);
    }
  };

  const handleEdit = (index: number) => {
    setEditMode((prev) => prev.map((_, i) => (i === index ? true : false)));
    setSelectedIndex(index);
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
        const isTodayDiary = todayDiaryIds[index] !== null;

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
                {isAnswered && isTodayDiary && editMode[index] ? (
                  <>
                    <textarea
                      className="w-full h-24 p-2 border border-gray-300 rounded text-sm resize-none"
                      placeholder="Edit your answer..."
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
                ) : isAnswered ? (
                  <div className="w-full whitespace-pre-wrap break-words overflow-y-auto flex flex-row items-center">
                    <span className="flex-1">{answers[index]}</span>
                    {isTodayDiary && (
                      <button
                        onClick={() => handleEdit(index)}
                        className="ml-2 px-3 py-1 rounded bg-main text-white font-PSemiBold text-sm"
                      >
                        Modify
                      </button>
                    )}
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
