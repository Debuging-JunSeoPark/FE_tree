import { useState } from "react";
import TimeSlotSelector from "../components/TimeSlotSelector";
import Weekly from "../components/Weekly";
import QuestionList from "../components/QuestionList";
//import { QType } from "../apis/diary.type";

function Record() {
  const [selected, setSelected] = useState<"Morning" | "Lunch" | "Dinner">(
    "Morning"
  );
  // const convertToQTye = (slot: string): QType => slot.toLowerCase() as QType;

  // const getListIndex = (slot: "Morning" | "Lunch" | "Dinner") => {
  //   if (slot === "Morning") return 0;
  //   if (slot === "Lunch") return 1;
  //   return 2;
  // };

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
      <QuestionList selectedSlot={selected} setSelectedSlot={setSelected} />
    </div>
  );
}
export default Record;
