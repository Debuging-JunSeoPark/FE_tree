export function getStartAndEndOfWeek(date: Date): { start: Date; end: Date } {
  const day = date.getUTCDay(); 
  const diffToMonday = (day === 0 ? -6 : 1) - day;

  const monday = new Date(date);
  monday.setUTCDate(date.getUTCDate() + diffToMonday);
  monday.setUTCHours(0, 0, 0, 0); 

  const sunday = new Date(monday);
  sunday.setUTCDate(monday.getUTCDate() + 6);
  sunday.setUTCHours(23, 59, 59, 999); 

  return { start: monday, end: sunday };
}
