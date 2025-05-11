import { useState } from "react";
import TimeSlotSelector from "../components/TimeSlotSelector";
import Weekly from "../components/Weekly";
import QuestionList from "../components/QuestionList";

function Record() {
  const [selected, setSelected] = useState<"Morning" | "Lunch" | "Evening">(
    "Morning"
  );
  const getUTCDate = () => {
    const now = new Date();
    return new Date(
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())
    );
  };

  const [selectedDate, setSelectedDate] = useState(getUTCDate());

  return (
    <div className="flex flex-col gap-1">
      <Weekly selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      <TimeSlotSelector selected={selected} setSelected={setSelected} />
      <div className="flex flex-col">
        <div className="font-PSemiBold text-lg text-Title">
          {selected} Reflection
        </div>
        <div className="font-PMedium text-xs text-sub">
          Wrap up your day by sharing your thoughts
        </div>
      </div>
      {/*질문리스트*/}
      <QuestionList
        selectedSlot={selected}
        setSelectedSlot={setSelected}
        selectedDate={selectedDate}
      />
    </div>
  );
}
export default Record;
