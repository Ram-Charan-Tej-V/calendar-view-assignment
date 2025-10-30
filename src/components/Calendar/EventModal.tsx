import React, { useEffect, useRef, useState } from "react";
import { CalendarEvent } from "./CalendarView.types";

interface Props {
  open: boolean;
  initial?: Partial<CalendarEvent>;
  onClose: () => void;
  onSave: (event: CalendarEvent) => void;
  onDelete?: (id: string) => void;
}

const PRESET_COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

export const EventModal: React.FC<Props> = ({ open, initial, onClose, onSave, onDelete }) => {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [startDate, setStartDate] = useState<string>(
    initial?.startDate ? new Date(initial.startDate).toISOString().slice(0, 16) : ""
  );
  const [endDate, setEndDate] = useState<string>(
    initial?.endDate ? new Date(initial.endDate).toISOString().slice(0, 16) : ""
  );
  const [color, setColor] = useState(initial?.color ?? PRESET_COLORS[0]);

  useEffect(() => {
    setTitle(initial?.title ?? "");
    setDescription(initial?.description ?? "");
    setStartDate(initial?.startDate ? new Date(initial.startDate).toISOString().slice(0, 16) : "");
    setEndDate(initial?.endDate ? new Date(initial.endDate).toISOString().slice(0, 16) : "");
    setColor(initial?.color ?? PRESET_COLORS[0]);
  }, [initial, open]);

  const firstRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    if (open) firstRef.current?.focus();
  }, [open]);

  if (!open) return null;

  const handleSave = () => {
    if (!title.trim()) {
      alert("Title is required");
      return;
    }
    const s = new Date(startDate);
    const e = new Date(endDate);
    if (e <= s) {
      alert("End must be after start");
      return;
    }
    const event: CalendarEvent = {
      id: initial?.id ?? `evt-${Math.random().toString(36).slice(2, 9)}`,
      title: title.trim(),
      description: description.trim() || undefined,
      startDate: s,
      endDate: e,
      color,
      category: initial?.category
    };
    onSave(event);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-modal w-full max-w-lg p-6">
        <h2 id="modal-title" className="text-lg font-semibold mb-4">
          {initial?.id ? "Edit Event" : "Create Event"}
        </h2>

        <label className="block text-sm">
          Title <span className="text-red-500">*</span>
          <input
            ref={firstRef}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={100}
            className="mt-1 block w-full border p-2 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
          />
        </label>

        <label className="block text-sm mt-3">
          Description
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={500}
            className="mt-1 block w-full border p-2 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
          />
        </label>

        <div className="grid grid-cols-2 gap-3 mt-3">
          <label className="text-sm">
            Start
            <input
              type="datetime-local"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="mt-1 block w-full border p-2 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
            />
          </label>
          <label className="text-sm">
            End
            <input
              type="datetime-local"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="mt-1 block w-full border p-2 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
            />
          </label>
        </div>

        <div className="mt-3">
          <div className="text-sm mb-1">Color</div>
          <div className="flex gap-2">
            {PRESET_COLORS.map((c) => (
              <button
                key={c}
                onClick={() => setColor(c)}
                aria-label={`select color ${c}`}
                className={`w-8 h-8 rounded ${color === c ? "ring-2 ring-offset-1 ring-primary-500" : ""}`}
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-6">
          {initial?.id && (
            <button
              onClick={() => {
                if (initial.id && confirm("Delete this event?")) {
                  onDelete?.(initial.id);
                  onClose();
                }
              }}
              className="px-3 py-2 rounded text-sm border text-red-600"
            >
              Delete
            </button>
          )}

          <button onClick={onClose} className="px-3 py-2 rounded text-sm border">
            Cancel
          </button>
          <button onClick={handleSave} className="px-4 py-2 rounded text-sm bg-primary-600 text-white">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
