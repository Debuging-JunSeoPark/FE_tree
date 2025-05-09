import treeMorning from "../assets/images/treeMorning.svg";
import treeLunch from "../assets/images/treeLunch.svg";
import treeEvening from "../assets/images/treeEvening.svg";
type Props = {
  selected: "Morning" | "Lunch" | "Evening";
  setSelected: React.Dispatch<
    React.SetStateAction<"Morning" | "Lunch" | "Evening">
  >;
};

function TimeSlotSelector({ selected, setSelected }: Props) {
  const timeSlots: {
    id: number;
    label: "Morning" | "Lunch" | "Evening";
    count: string;
    src: string;
  }[] = [
    { id: 1, label: "Morning", count: "1/3", src: treeMorning },
    { id: 2, label: "Lunch", count: "2/3", src: treeLunch },
    { id: 3, label: "Evening", count: "3/3", src: treeEvening },
  ];
  return (
    <div className="flex flex-row items-center justify-around gap-2 m-2 mt-4">
      {timeSlots.map((slot) => {
        const isSelected = selected == slot.label;
        return (
          <div
            key={slot.id}
            onClick={() => setSelected(slot.label)}
            className={`flex flex-col items-center justify-center p-1 w-29 h-22  rounded-[6px] border-2 ${
              isSelected
                ? "bg-second border-main shadow-lg"
                : "bg-white border-gray-100"
            } font-PRegular text-[10px]`}
          >
            <img
              src={slot.src}
              alt={slot.label}
              className="rounded-full w-12 h-12"
            />
            <div>{slot.label}</div>
            <div>{slot.count}</div>
          </div>
        );
      })}
    </div>
  );
}
export default TimeSlotSelector;
