import { useState } from "react";
import TimeSlotSelector from "../components/TimeSlotSelector";
import Weekly from "../components/Weekly";
import QuestionList from "../components/QuestionList";
import { QType } from "../apis/diary.type";

function Record() {
  const [selected, setSelected] = useState<"Morning" | "Lunch" | "Evening">(
    "Morning"
  );
  const convertToQTye = (slot: string): QType =>
    (slot.toLowerCase() + "1") as QType;
  return (
    <div className="flex flex-col gap-1">
      <Weekly />
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
      <QuestionList qtype={convertToQTye(selected)} />
    </div>
  );
}
export default Record;
