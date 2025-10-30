export const isSameDay = (a: Date, b: Date): boolean =>
  a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

export const getCalendarGrid = (date: Date): Date[] => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1);
  const startDay = firstDay.getDay(); // 0 (Sun) - 6
  const startDate = new Date(firstDay);
  startDate.setDate(firstDay.getDate() - startDay);

  const grid: Date[] = [];
  for (let i = 0; i < 42; i++) {
    grid.push(new Date(startDate));
    startDate.setDate(startDate.getDate() + 1);
  }
  return grid;
};
