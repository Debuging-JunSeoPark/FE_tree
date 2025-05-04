import icon from "../assets/images/Icon.png";
function Home() {
  return (
    <div className="flex flex-col justify-around items-center h-full gap-4">
      <div className="flex flex-row items-center p-3 gap-2 w-84 h-14.5 rounded-xl border-2 border-homeBorder">
        <img
          src={icon}
          alt="아이콘"
          className="w-10 h-10 rounded-full border-1 border-[#80A94D]"
        />
        <div className="font-PBold text-base text-black">Your Nickname</div>
      </div>
      <div>
        <div className="text-base text-black font-PMedium">
          Questions Challenge
        </div>
        <div className="flex flex-col items-center gap-2 w-84 h-101 rounded-xl border-2 border-homeBorder shadow-lg">
          <div className="w-full h-84 rounded-t-xl bg-sub">tree trunk</div>
          <span className="flex flex-col items-end justify-end w-full mr-4 ">
            <div className="font-PLight text-xs">Daily Progress Visual</div>
            <div className="font-PExtraBold text-main font-base">
              1/21 answered
            </div>
          </span>
        </div>
      </div>
      <div>
        <div className="text-base text-black font-PMedium">
          Quote of the Day
        </div>
        <div className="flex flex-row items-center p-3 gap-2 w-84 h-32 rounded-xl border-2 border-homeBorder shadow-lg"></div>
      </div>
    </div>
  );
}
export default Home;
