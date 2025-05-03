import { format, startOfWeek, addDays } from "date-fns";
function Weekly() {
  const date = new Date();
  const start = startOfWeek(date, { weekStartsOn: 1 });

  const week = Array.from({ length: 7 }, (_, i) => {
    const day = addDays(start, i);
    return {
      label: format(day, "EEE"),
      date: format(day, "d"),
      isToday: format(day, "d") === format(date, "d"),
    };
  });
  return (
    <div className="flex flex-row items-center justify-center gap-2">
      {week.map((day, index) => (
        <div
          key={index}
          className={`flex flex-col items-center rounded-2xl p-1 w-11.5 h-17 font-PBold ${
            day.isToday ? "bg-main text-white" : "bg-white text-Title"
          }`}
        >
          <div>{day.label}</div>
          <div className="flex items-center justify-center rounded-4xl bg-[#d9d9d9] text-white  w-8 h-8">
            {day.date}
          </div>
        </div>
      ))}
    </div>
  );
}
export default Weekly;
