import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "../../layouts/icons";
import Days from "./days";
import {
  DayEventsHandler,
  MonthlyEventsHandler,
} from "./utilities/action-handler";
import { Months, WeekDays } from "./utilities/calendar-builder";

function Calendar(props) {
  var days = WeekDays();
  var months = Months();

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

  const monthlyEvents = MonthlyEventsHandler(
    props.userId,
    currentDay.getMonth() + 1,
    currentDay.getFullYear()
  );

  if (monthlyEvents) {
    var indexes = [];

    for (var i = 0; i < monthlyEvents.length; i++) {
      if (monthlyEvents[i] > 0) {
        indexes.push({ day: i + 1, count: monthlyEvents[i] });
      }
    }
  }

  const dayEvents = DayEventsHandler(
    props.userId,
    currentDay.getDate(),
    currentDay.getMonth() + 1,
    currentDay.getFullYear()
  );

  useEffect(() => {
    if (props.calendarData && dayEvents) {
      props.calendarData(dayEvents);
    }
  }, [dayEvents, props]);

  return (
    <div className="calendar">
      <div className="head">
        <span> {currentDay.getFullYear()}</span>
        <div className="month-controls">
          <div onClick={prevMonth}>
            <ChevronLeft />
          </div>
          <h6 className="m-0">{months[currentDay.getMonth()]}</h6>
          <div onClick={nextMonth}>
            <ChevronRight />
          </div>
        </div>
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

        <Days
          day={currentDay}
          changeCurrentDay={changeCurrentDay}
          eventIndexes={indexes}
          currentMonth={currentDay.getMonth()}
        />
      </div>
    </div>
  );
}

export default Calendar;
