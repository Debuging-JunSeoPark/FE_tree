export type TimePeriod = "morning" | "lunch" | "evening";

export const getTimePeriod = (): TimePeriod => {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return "morning";
  if (hour >= 12 && hour < 18) return "lunch";
  return "evening";
};
