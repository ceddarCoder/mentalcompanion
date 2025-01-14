// components/Calendar.tsx
"use client";

import React, { useState } from 'react';
import { Calendar } from '@/components/ui/calendar'; // Import the shadcn Calendar component

export const JournalCalendar = ({ onDateChange }: { onDateChange: (date: Date) => void }) => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const handleChange = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    if (selectedDate) {
      onDateChange(selectedDate);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Calendar</h2>
      <Calendar
        mode="single"
        selected={date}
        onSelect={handleChange}
        className="rounded-md border"
      />
    </div>
  );
};