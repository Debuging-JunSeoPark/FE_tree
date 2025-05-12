import { useEffect, useState } from "react";
import treeMorning from "../assets/images/treeMorning.svg";
import treeLunch from "../assets/images/treeLunch.svg";
import treeEvening from "../assets/images/treeEvening.svg";
import cherryMorning from "../assets/images/cherryBlossomIconMorning.png";
import cherryLunch from "../assets/images/cherryBlossomIconLunch.png";
import cherryEvening from "../assets/images/cherryBlossomIconEvening.png";
import YellowMorning from "../assets/images/YellowM.png";
import YellowLunch from "../assets/images/YellowL.png";
import YellowEvening from "../assets/images/YellowE.png";
import { getUserProfile } from "../apis/user";

type Props = {
  selected: "Morning" | "Lunch" | "Evening";
  setSelected: React.Dispatch<
    React.SetStateAction<"Morning" | "Lunch" | "Evening">
  >;
};

function TimeSlotSelector({ selected, setSelected }: Props) {
  const [avatar, setAvatar] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const user = await getUserProfile();
        setAvatar(user.avatar);
      } catch (error) {
        console.error("유저 아바타 정보 불러오기 실패", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserProfile();
  }, []);

  const getImageForSlot = (
    label: "Morning" | "Lunch" | "Evening"
  ): string | undefined => {
    if (avatar === "PINK") {
      switch (label) {
        case "Morning":
          return cherryMorning;
        case "Lunch":
          return cherryLunch;
        case "Evening":
          return cherryEvening;
      }
    } else if (avatar === "YELLOW") {
      switch (label) {
        case "Morning":
          return YellowMorning;
        case "Lunch":
          return YellowLunch;
        case "Evening":
          return YellowEvening;
      }
    } else if (avatar === "GREEN") {
      switch (label) {
        case "Morning":
          return treeMorning;
        case "Lunch":
          return treeLunch;
        case "Evening":
          return treeEvening;
      }
    }

    return undefined; // ✅ 디폴트 없음
  };

  const timeSlots: {
    id: number;
    label: "Morning" | "Lunch" | "Evening";
  }[] = [
    { id: 1, label: "Morning" },
    { id: 2, label: "Lunch" },
    { id: 3, label: "Evening" },
  ];

  if (isLoading || avatar === null) {
    return (
      <div className="flex justify-around gap-2 m-2 mt-4 w-full">
        {[1, 2, 3].map((id) => (
          <div
            key={id}
            className="w-28 h-24 rounded-lg bg-gray-200 animate-pulse"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-row items-center justify-around gap-2 m-2 mt-4">
      {timeSlots.map((slot) => {
        const isSelected = selected === slot.label;
        const imgSrc = getImageForSlot(slot.label);

        return (
          <div
            key={slot.id}
            onClick={() => setSelected(slot.label)}
            className={`flex flex-col items-center justify-center p-1 w-29 h-22 rounded-[6px] border-2 ${
              isSelected
                ? "bg-second border-main shadow-lg"
                : "bg-white border-gray-100"
            } font-PRegular text-[10px]`}
          >
            {imgSrc ? (
              <img
                src={imgSrc}
                alt={slot.label}
                className="rounded-full w-12 h-12"
              />
            ) : (
              <div className="rounded-full w-12 h-12 bg-gray-100" />
            )}
            <div className="mt-1">{slot.label}</div>
          </div>
        );
      })}
    </div>
  );
}

export default TimeSlotSelector;
