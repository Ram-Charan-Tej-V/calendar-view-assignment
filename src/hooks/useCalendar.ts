import { useCallback, useState } from "react";

export type ViewMode = "month" | "week";

export const useCalendar = (initialDate: Date = new Date(), initialView: ViewMode = "month") => {
  const [currentDate, setCurrentDate] = useState<Date>(initialDate);
  const [view, setView] = useState<ViewMode>(initialView);

  const goToNextMonth = useCallback(() => {
    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  }, []);

  const goToPreviousMonth = useCallback(() => {
    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  }, []);

  const goToToday = useCallback(() => {
    setCurrentDate(() => new Date());
  }, []);

  const setMonth = useCallback((year: number, month: number) => {
    setCurrentDate(new Date(year, month, 1));
  }, []);

  return {
    currentDate,
    view,
    setView,
    setMonth,
    goToNextMonth,
    goToPreviousMonth,
    goToToday
  };
};
