import React, { useContext } from "react";
import { ChevronLeft, ChevronRight } from "../../layouts/icons";
import Days from "./days";
import { MonthlyEventsHandler } from "./utilities/action-handler";
import { Months, WeekDays } from "./utilities/calendar-builder";
import { CalendarContext } from "../../Context/calendar-context";

function Calendar(props) {
  var days = WeekDays();
  var months = Months();

  const { currentDay, setCurrentDay } = useContext(CalendarContext);

  const monthlyEvents = MonthlyEventsHandler(
    props.userId,
    currentDay.getMonth() + 1,
    currentDay.getFullYear()
  );

  const changeCurrentDay = (day) => {
    setCurrentDay(new Date(day.year, day.month, day.day));
  };

  const nextMonth = () => {
    setCurrentDay(new Date(currentDay.setMonth(currentDay.getMonth() + 1)));
  };

  const prevMonth = () => {
    setCurrentDay(new Date(currentDay.setMonth(currentDay.getMonth() - 1)));
  };

  if (monthlyEvents) {
    var indexes = [];

    for (var i = 0; i < monthlyEvents.length; i++) {
      if (monthlyEvents[i] > 0) {
        indexes.push({ day: i + 1, count: monthlyEvents[i] });
      }
    }
  }

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
