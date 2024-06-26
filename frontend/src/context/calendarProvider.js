import React, { createContext, useState } from "react";

export const CalendarContext = createContext({
  currentDay: {},
  setCurrentDay: () => {},
});

function CalendarProvider({ children }) {
  const [currentDay, setCurrentDay] = useState(new Date());

  return (
    <CalendarContext.Provider value={{ currentDay, setCurrentDay }}>
      {children}
    </CalendarContext.Provider>
  );
}

export default CalendarProvider;
