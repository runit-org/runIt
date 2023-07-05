import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDayEvents,
  getMonthlyEvents,
} from "../../../actions/calendarActions";

export const MonthlyEventsHandler = (id, month, year) => {
  const dispatch = useDispatch();
  const [monthlyEventsData, setMonthlyEventsData] = useState([]);

  useEffect(() => {
    if (id && month && year) {
      dispatch(getMonthlyEvents(id, month, year));
    }
  }, [dispatch, id, month, year]);

  var calendarData = useSelector(
    (calendarReducer) => calendarReducer.calendarReducer.monthly
  );

  useEffect(() => {
    if (calendarData) {
      setMonthlyEventsData(calendarData.data);
    }
  }, [calendarData]);

  return monthlyEventsData;
};

export const DayEventsHandler = (id, date, month, year) => {
  const dispatch = useDispatch();
  const [dayEventsData, setDayEventsData] = useState([]);

  useEffect(() => {
    if (id && month && year) {
      dispatch(getDayEvents(id, date, month, year));
    }
  }, [dispatch, id, date, month, year]);

  var calendarData = useSelector(
    (calendarReducer) => calendarReducer.calendarReducer.day
  );

  useEffect(() => {
    if (calendarData) {
      setDayEventsData(calendarData.data);
    }
  }, [calendarData]);

  return dayEventsData;
};
