import React, { useState } from 'react'
import { CalendarView } from './components/Calendar/CalendarView'
import { CalendarEvent } from './components/Calendar/CalendarView.types'

export default function App() {
  const [events, setEvents] = useState<CalendarEvent[]>([
    {
      id: 'evt-1',
      title: 'Team Standup',
      description: 'Daily sync',
      startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 15, 9, 0),
      endDate: new Date(new Date().getFullYear(), new Date().getMonth(), 15, 9, 30),
      color: '#3b82f6',
      category: 'Meeting'
    }
  ])

  return (
    <div className="min-h-screen bg-neutral-50 p-6">
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-xl shadow">
        <CalendarView
          events={events}
          onEventAdd={(ev) => setEvents((prev) => [...prev, ev])}
          onEventUpdate={(id, updates) =>
            setEvents((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)))
          }
          onEventDelete={(id) => setEvents((prev) => prev.filter((p) => p.id !== id))}
        />
      </div>
    </div>
  )
}
