import { format, startOfWeek, addDays, isSameDay } from "date-fns";
import { useEffect, useState } from "react";
import icon from "../assets/images/Icon.png";
import cicon from "../assets/images/cherryBlossomIcon.png";
import yicon from "../assets/images/forsythiaIcon.png";
import { getUserProfile } from "../apis/user";

import { FaChevronDown } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface WeeklyProps {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
}

function Weekly({ selectedDate, setSelectedDate }: WeeklyProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [avatar, setAvatar] = useState<string>("GREEN");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const user = await getUserProfile();
        setAvatar(user.avatar);
      } catch (error) {
        console.error("유저 아바타 정보 불러오기 실패", error);
      }
    };
    fetchUserProfile();
  }, []);

  const start = startOfWeek(selectedDate, { weekStartsOn: 1 });

  const week = Array.from({ length: 7 }, (_, i) => {
    const day = addDays(start, i);
    return {
      fullDate: day,
      label: format(day, "EEE"),
      date: format(day, "d"),
      isSelected: isSameDay(day, selectedDate),
    };
  });

  const getSelectedIcon = () => {
    if (avatar === "PINK") return cicon;
    if (avatar === "YELLOW") return yicon;
    return icon;
  };

  return (
    <div className="flex flex-col m-1">
      <div className="flex items-center gap-2 relative">
        <div className="font-PBlack text-2xl">
          {format(selectedDate, "yyyy MMM")}
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-main text-sm focus:outline-none"
        >
          <FaChevronDown />
        </button>
        {isOpen && (
          <div className="absolute z-50 top-10">
            <DatePicker
              selected={selectedDate}
              onChange={(date: Date | null) => {
                if (date) {
                  setSelectedDate(date);
                }
                setIsOpen(false);
              }}
              inline
              calendarStartDay={1}
            />
          </div>
        )}
      </div>

      <div className="flex flex-row items-center justify-center gap-2">
        {week.map((day, index) => (
          <div
            key={index}
            onClick={() => setSelectedDate(day.fullDate)}
            className={`flex flex-col items-center rounded-2xl p-1 w-11.5 h-17 font-PBold cursor-pointer
               ${
                 day.isSelected ? "bg-main text-white" : "bg-white text-Title"
               }`}
          >
            <div>{day.label}</div>
            <div className="flex items-center justify-center rounded-full w-8 h-8">
              {day.isSelected ? (
                <img src={getSelectedIcon()} alt="selected" className="rounded-full" />
              ) : (
                <div className="bg-[#d9d9d9] text-white w-full h-full flex items-center justify-center rounded-full text-sm">
                  {day.date}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Weekly;