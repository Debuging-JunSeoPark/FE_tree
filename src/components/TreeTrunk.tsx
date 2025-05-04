function TreeTrunk() {
  return (
    <div className="flex flex-col items-center gap-2 w-84 h-101 rounded-xl border-2 border-homeBorder shadow-lg">
      <div className="w-full h-84 rounded-t-xl bg-sub">tree trunk</div>
      <span className="flex flex-col items-end justify-end w-full mr-4 ">
        <div className="font-PLight text-xs">Daily Progress Visual</div>
        <div className="font-PExtraBold text-main font-base">1/21 answered</div>
      </span>
    </div>
  );
}
export default TreeTrunk;
