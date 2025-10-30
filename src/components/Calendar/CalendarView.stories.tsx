import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { CalendarView } from "./CalendarView";
import { CalendarEvent } from "./CalendarView.types";

const meta: Meta<typeof CalendarView> = {
  title: "Components/Calendar/CalendarView",
  component: CalendarView
};
export default meta;

type Story = StoryObj<typeof CalendarView>;

const sampleEvents: CalendarEvent[] = [
  {
    id: "evt-1",
    title: "Team Standup",
    description: "Daily sync",
    startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 15, 9, 0),
    endDate: new Date(new Date().getFullYear(), new Date().getMonth(), 15, 9, 30),
    color: "#3b82f6",
    category: "Meeting"
  },
  {
    id: "evt-2",
    title: "Design Review",
    startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 16, 14, 0),
    endDate: new Date(new Date().getFullYear(), new Date().getMonth(), 16, 15, 30),
    color: "#10b981",
    category: "Design"
  }
];

export const Default: Story = {
  render: () => {
    const [events, setEvents] = useState<CalendarEvent[]>(sampleEvents);

    return (
      <div style={{ maxWidth: 1100 }}>
        <CalendarView
          events={events}
          onEventAdd={(ev) => setEvents((prev) => [...prev, ev])}
          onEventUpdate={(id, updates) =>
            setEvents((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)))
          }
          onEventDelete={(id) => setEvents((prev) => prev.filter((p) => p.id !== id))}
        />
      </div>
    );
  }
};

export const EmptyState: Story = {
  render: () => {
    const [events, setEvents] = useState<CalendarEvent[]>([]);
    return (
      <div style={{ maxWidth: 1100 }}>
        <CalendarView events={events} onEventAdd={(ev) => setEvents([ev])} onEventUpdate={() => {}} onEventDelete={() => {}} />
      </div>
    );
  }
};
