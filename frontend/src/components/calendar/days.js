import React from "react";

function Days(props) {
  const firstDayOfMonth = new Date(
    props.day.getFullYear(),
    props.day.getMonth(),
    1
  );

  const indexOfFIrstDay = firstDayOfMonth.getDay();

  let currentCalendarDays = [];

  //sets the first day of the calendar
  for (let calendarIndex = 0; calendarIndex < 42; calendarIndex++) {
    if (calendarIndex === 0 && indexOfFIrstDay === 0) {
      firstDayOfMonth.setDate(firstDayOfMonth.getDate() - 7);
    } else if (calendarIndex === 0) {
      firstDayOfMonth.setDate(
        firstDayOfMonth.getDate() + (calendarIndex - indexOfFIrstDay)
      );
    } else {
      firstDayOfMonth.setDate(firstDayOfMonth.getDate() + 1);
    }

    let calendarDay = {
      isCurrMonth: firstDayOfMonth.getMonth() === props.day.getMonth(),
      fullDate: new Date(firstDayOfMonth),
      month: firstDayOfMonth.getMonth(),
      day: firstDayOfMonth.getDate(),
      selected: firstDayOfMonth.toDateString() === props.day.toDateString(),
      year: firstDayOfMonth.getFullYear(),
    };

    currentCalendarDays.push(calendarDay);
  }

  return (
    <div className="calendar-days">
      {currentCalendarDays.map((days, index) => {
        return (
          <div
            key={index}
            className={`day ${days.isCurrMonth ? `currMonth` : ``} ${
              days.selected ? `selectedDay` : ``
            } ${
              props.eventIndexes
                ? props.eventIndexes.some(
                    (data) =>
                      data.day === days.day && props.currentMonth === days.month
                  )
                  ? `hasEvent`
                  : ``
                : ``
            } `}
            onClick={() => props.changeCurrentDay(days)}
          >
            <p>{days.day}</p>
          </div>
        );
      })}
    </div>
  );
}

export default Days;
