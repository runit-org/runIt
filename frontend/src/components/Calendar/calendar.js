import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { ChevronLeft, ChevronRight } from "../SiteElements/icons";
import Days from "./days";

function Calendar() {
  // eslint-disable-next-line no-unused-vars
  const [days, setDays] = useState([
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
  ]);

  // eslint-disable-next-line no-unused-vars
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
        {currentDay.getFullYear()}
        <Button onClick={prevMonth}>
          <ChevronLeft />
        </Button>
        <h6 className="m-0">{months[currentDay.getMonth()]}</h6>

        <Button onClick={nextMonth}>
          <ChevronRight />
        </Button>
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
