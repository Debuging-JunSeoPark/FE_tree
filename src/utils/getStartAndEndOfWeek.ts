// src/utils/getStartAndEndOfWeek.ts
export function getStartAndEndOfWeek(date: Date): { start: Date; end: Date } {
    const day = date.getDay(); // 일요일: 0, 월요일: 1 ...
    const diffToMonday = (day === 0 ? -6 : 1) - day;
    const monday = new Date(date);
    monday.setDate(date.getDate() + diffToMonday);
    monday.setHours(0, 0, 0, 0);
  
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    sunday.setHours(23, 59, 59, 999);
  
    return { start: monday, end: sunday };
  }
  