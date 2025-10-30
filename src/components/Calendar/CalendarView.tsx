import React, { Suspense, useCallback, useMemo, useState } from "react";
import { CalendarEvent, CalendarViewProps } from "./CalendarView.types";
import { useCalendar } from "../../hooks/useCalendar";
import { MonthView } from "./MonthView";
const EventModal = React.lazy(() => import("./EventModal").then((m) => ({ default: m.EventModal })));

export const CalendarView: React.FC<CalendarViewProps> = ({
  events,
  onEventAdd,
  onEventUpdate,
  onEventDelete,
  initialView = "month",
  initialDate = new Date()
}) => {
  const { currentDate, view, setView, goToNextMonth, goToPreviousMonth, goToToday } = useCalendar(
    initialDate,
    initialView
  );

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<CalendarEvent | undefined>(undefined);

  const eventsByDate = useMemo(() => events, [events]);

  const handleDayClick = useCallback(
    (date: Date) => {
      setEditing({
        id: "",
        title: "",
        startDate: date,
        endDate: new Date(date.getTime() + 1000 * 60 * 60) // default 1 hour
      });
      setModalOpen(true);
    },
    []
  );

  const handleEventClick = useCallback((ev: CalendarEvent) => {
    setEditing(ev);
    setModalOpen(true);
  }, []);

  const handleSave = useCallback(
    (ev: CalendarEvent) => {
      if (editing?.id) {
        onEventUpdate(editing.id, ev);
      } else {
        onEventAdd(ev);
      }
    },
    [onEventAdd, onEventUpdate, editing]
  );

  const handleDelete = useCallback(
    (id: string) => {
      onEventDelete(id);
    },
    [onEventDelete]
  );

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <button onClick={goToPreviousMonth} className="px-3 py-1 rounded border">
            Prev
          </button>
          <button onClick={goToToday} className="px-3 py-1 rounded border">
            Today
          </button>
          <button onClick={goToNextMonth} className="px-3 py-1 rounded border">
            Next
          </button>
        </div>

        <div className="flex items-center gap-2">
          <div className="text-lg font-semibold">{currentDate.toLocaleString(undefined, { month: "long", year: "numeric" })}</div>

          <select
            aria-label="view-toggle"
            value={view}
            onChange={(e) => setView(e.target.value as "month" | "week")}
            className="border px-2 py-1 rounded"
          >
            <option value="month">Month</option>
            <option value="week">Week</option>
          </select>
        </div>
      </div>

      {view === "month" && (
        <MonthView date={currentDate} events={eventsByDate} onDayClick={handleDayClick} onEventClick={handleEventClick} />
      )}

      {/* Week view placeholder — implement later */}
      {view === "week" && <div className="text-sm text-neutral-600">Week view coming soon</div>}

      <Suspense fallback={null}>
        <EventModal open={modalOpen} initial={editing} onClose={() => setModalOpen(false)} onSave={handleSave} onDelete={handleDelete} />
      </Suspense>
    </div>
  );
};
