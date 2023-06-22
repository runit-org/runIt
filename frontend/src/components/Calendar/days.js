import React from "react";
import { Badge } from "react-bootstrap";

function Days(props) {
  const firstMonthDay = new Date(
    props.day.getFullYear(),
    props.day.getMonth(),
    1
  );

  const dayOfFirstDay = firstMonthDay.getDay();
  let currentDays = [];

  for (let day = 0; day < 42; day++) {
    if (day === 0 && dayOfFirstDay === 0) {
      firstMonthDay.setDate(firstMonthDay.getDate() - 7);
    } else if (day === 0) {
      firstMonthDay.setDate(firstMonthDay.getDate() + (day - dayOfFirstDay));
    } else {
      firstMonthDay.setDate(firstMonthDay.getDate() + 1);
    }

    let calendarDay = {
      isCurrMonth: firstMonthDay.getMonth() === props.day.getMonth(),
      fullDate: new Date(firstMonthDay),
      month: firstMonthDay.getMonth(),
      day: firstMonthDay.getDate(),
      selected: firstMonthDay.toDateString() === props.day.toDateString(),
      year: firstMonthDay.getFullYear(),
    };

    currentDays.push(calendarDay);
  }

  return (
    <div className="calendar-days">
      {currentDays.map((days, index) => {
        return (
          <div
            key={index}
            className={`day ${days.isCurrMonth ? `currMonth` : ``} ${
              days.selected ? `selectedDay` : ``
            }`}
            onClick={() => props.changeCurrentDay(days)}
          >
            <p>{days.day}</p>
            {props.eventIndexes
              ? props.eventIndexes.map((data, index) => {
                  return data.day === days.day &&
                    props.currentMonth === days.month ? (
                    <Badge key={index}>{data.count}</Badge>
                  ) : (
                    ""
                  );
                })
              : null}
          </div>
        );
      })}
    </div>
  );
}

export default Days;
