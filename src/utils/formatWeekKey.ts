// utils/formatWeekKey.ts
import { getStartAndEndOfWeek } from "./getStartAndEndOfWeek";

export function formatWeekKey(date: Date): string {
  const year = date.getFullYear();
  const month = date.toLocaleString("en-US", { month: "short" });
  const monday = getStartAndEndOfWeek(date).start;
  const weekNum = Math.ceil((monday.getDate() + 6) / 7);
  return `${year} ${month} week${weekNum}`;
}
