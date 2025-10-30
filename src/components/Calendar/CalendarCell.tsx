import React, { useCallback, useMemo } from "react";
import { CalendarEvent } from "./CalendarView.types";
import { isSameDay } from "../../utils/date.utils";
import clsx from "clsx";

interface Props {
  date: Date;
  inMonth: boolean;
  events: CalendarEvent[];
  isToday: boolean;
  isSelected?: boolean;
  onClick: (date: Date) => void;
  onEventClick: (e: CalendarEvent) => void;
}

export const CalendarCell: React.FC<Props> = React.memo(function CalendarCell({
  date,
  inMonth,
  events,
  isToday,
  onClick,
  onEventClick,
  isSelected = false
}) {
  const eventPreview = useMemo(() => events.slice(0, 3), [events]);
  const extraCount = Math.max(0, events.length - 3);

  const handleKeyDown = useCallback(
    (ev: React.KeyboardEvent) => {
      if (ev.key === "Enter" || ev.key === " ") {
        ev.preventDefault();
        onClick(date);
      }
    },
    [date, onClick]
  );

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`${date.toDateString()}. ${events.length} events.`}
      aria-pressed={isSelected}
      onKeyDown={handleKeyDown}
      onClick={() => onClick(date)}
      className={clsx(
        "border border-neutral-200 h-32 p-2 hover:bg-neutral-50 transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500",
        !inMonth && "text-neutral-400 bg-neutral-50"
      )}
    >
      <div className="flex justify-between items-start mb-1">
        <span className="text-sm font-medium text-neutral-900">{date.getDate()}</span>
        {isToday && (
          <span className="w-6 h-6 bg-primary-500 rounded-full text-white text-xs flex items-center justify-center">
            {date.getDate()}
          </span>
        )}
      </div>

      <div className="space-y-1 overflow-hidden">
        {eventPreview.map((ev) => (
          <div
            key={ev.id}
            role="button"
            tabIndex={0}
            onClick={(e) => {
              e.stopPropagation();
              onEventClick(ev);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.stopPropagation();
                onEventClick(ev);
              }
            }}
            className="text-xs px-2 py-1 rounded truncate"
            style={{ backgroundColor: ev.color ?? "#3b82f6" }}
            title={`${ev.title} — ${ev.description ?? ""}`}
          >
            {ev.title}
          </div>
        ))}

        {extraCount > 0 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClick(date);
            }}
            className="text-xs text-primary-600 hover:underline"
            aria-label={`${extraCount} more events`}
          >
            +{extraCount} more
          </button>
        )}
      </div>
    </div>
  );
});
