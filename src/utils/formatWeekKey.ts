import { getStartAndEndOfWeek } from "./getStartAndEndOfWeek";

export function formatWeekKey(date: Date): string {
  const year = date.getUTCFullYear();
  const month = date.toLocaleString("en-US", {
    month: "short",
    timeZone: "UTC", 
  });

  const monday = getStartAndEndOfWeek(date).start;
  const weekNum = Math.ceil((monday.getUTCDate() + 6) / 7); 

  return `${year} ${month} week${weekNum}`;
}
