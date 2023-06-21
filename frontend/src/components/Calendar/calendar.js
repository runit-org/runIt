import React, { useState } from "react";
import Days from "./days";

function Calendar() {
  const [days, setDays] = useState([
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
  ]);

  const [months, setMonths] = useState([
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]);

  const [currentDay, setCurrentDay] = useState(new Date());

  const changeCurrentDay = (day) => {
    setCurrentDay(new Date(day.year, day.month, day.day));
  };

  const nextMonth = () => {
    setCurrentDay(new Date(currentDay.setMonth(currentDay.getMonth() + 1)));
  };

  const prevMonth = () => {
    setCurrentDay(new Date(currentDay.setMonth(currentDay.getMonth() - 1)));
  };

  return (
    <div className="calendar">
      <div className="head">
        <h5 className="m-0">Calendar</h5>
        <button onClick={prevMonth}>
          <span className="">prev</span>
        </button>
        <p className="m-0">
          {months[currentDay.getMonth()]}
          {currentDay.getFullYear()}
        </p>

        <button onClick={nextMonth}>
          <span className="">next</span>
        </button>
      </div>
      <div className="body">
        <div className="header">
          {days.map((i, index) => {
            return (
              <div key={index} className="week">
                {i}
              </div>
            );
          })}
        </div>

        <Days day={currentDay} changeCurrentDay={changeCurrentDay} />
      </div>
    </div>
  );
}

export default Calendar;
