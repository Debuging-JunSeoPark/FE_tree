import { useState } from "react";
import TimeSlotSelector from "../components/TimeSlotSelector";
import Weekly from "../components/Weekly";
import QuestionList from "../components/QuestionList";

function Record() {
  const [selected, setSelected] = useState<string | null>("Morning");
  return (
    <div>
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
      <QuestionList />
    </div>
  );
}
export default Record;
