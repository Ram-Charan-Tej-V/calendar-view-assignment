import React from "react";
import { CalendarEvent } from "./CalendarView.types";
import { getCalendarGrid, isSameDay } from "../../utils/date.utils";
import { CalendarCell } from "./CalendarCell";

interface Props {
  date: Date;
  events: CalendarEvent[];
  onDayClick: (date: Date) => void;
  onEventClick: (event: CalendarEvent) => void;
}

export const MonthView: React.FC<Props> = ({ date, events, onDayClick, onEventClick }) => {
  const grid = getCalendarGrid(date);
  const today = new Date();

  const eventsByDay = (d: Date) => {
    return events.filter((ev) => isSameDay(ev.startDate, d));
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-7 gap-1">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d} className="text-xs font-semibold text-neutral-600 py-2 text-center">
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {grid.map((d) => {
          const inMonth = d.getMonth() === date.getMonth();
          const dayEvents = eventsByDay(d);
          const isToday = isSameDay(d, today);
          return (
            <CalendarCell
              key={d.toISOString()}
              date={d}
              inMonth={inMonth}
              events={dayEvents}
              isToday={isToday}
              onClick={onDayClick}
              onEventClick={onEventClick}
            />
          );
        })}
      </div>
    </div>
  );
};
