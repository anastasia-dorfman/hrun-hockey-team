import { useState } from "react";
import { useLoaderData, Link } from "react-router-dom";
// import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  addDays,
  isSameMonth,
  isSameDay,
  startOfWeek,
  endOfWeek,
  parseISO,
  min,
  max,
  addMonths,
} from "date-fns";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import Wrapper from "../assets/wrappers/Schedule";
import CalendarDay from "../components/CalendarDay";
import customFetch from "../utils/customFetch";
import { shouldUseMockData } from "../utils/environment";
import { mockGames } from "../data/mockData.js";

export const loader = async ({ request }) => {
  try {
    if (shouldUseMockData) {
      return { data: { games: mockGames } };
    }
    const { data } = await customFetch.get("/games");
    return {
      data,
    };
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const Schedule = () => {
  const { data } = useLoaderData();
  const games = data.games || [];

  const gameDates = games.map((game) => parseISO(game.dateTime));
  const earliestDate = min(gameDates);
  const latestDate = max(gameDates);

  const [currentDate, setCurrentDate] = useState(new Date());

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(addDays(monthEnd, 7));

  const days = eachDayOfInterval({
    start: calendarStart,
    end: calendarEnd,
  }).slice(0, 35);

  const weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const weekDaysShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const handleDateChange = (date) => {
    if (date >= earliestDate && date <= latestDate) {
      setCurrentDate(date);
    }
  };

  const handlePrevMonth = () => {
    const newDate = addMonths(currentDate, -1);
    if (startOfMonth(newDate) >= startOfMonth(earliestDate)) {
      setCurrentDate(newDate);
    }
  };

  const handleNextMonth = () => {
    const newDate = addMonths(currentDate, 1);
    if (startOfMonth(newDate) <= startOfMonth(latestDate)) {
      setCurrentDate(newDate);
    }
  };

  const isPrevMonthDisabled =
    startOfMonth(currentDate) <= startOfMonth(earliestDate);
  const isNextMonthDisabled = endOfMonth(currentDate) >= endOfMonth(latestDate);

  return (
    <Wrapper>
      <h1>Schedule</h1>
      <div className="calendar-container">
        <div className="calendar-header-container">
          <MdKeyboardArrowLeft
            className={`arrow ${isPrevMonthDisabled ? "disabled" : ""}`}
            onClick={handlePrevMonth}
          />
          <DatePicker
            selected={currentDate}
            onChange={handleDateChange}
            dateFormat="MMM yyyy"
            showMonthYearPicker
            minDate={earliestDate}
            maxDate={latestDate}
            className="b2"
          />
          <MdKeyboardArrowRight
            className={`arrow ${isNextMonthDisabled ? "disabled" : ""}`}
            onClick={handleNextMonth}
          />
        </div>
        <h2 className="month-selected">{format(currentDate, "MMMM")}</h2>
        <div className="weekday-header">
          {weekDays.map((day, index) => (
            <h5 key={index} className="weekday-name">
              {day}
            </h5>
          ))}
        </div>
        <div className="calendar-grid">
          {days.map((day, index) => (
            <CalendarDay
              key={index}
              day={day}
              currentDate={currentDate}
              games={games}
            />
          ))}
        </div>
        <div className="b2 calendar-footer-container">
          <div
            className={`left ${isPrevMonthDisabled ? "disabled" : ""}`}
            onClick={handlePrevMonth}
          >
            <MdKeyboardArrowLeft className="arrow" />
            <span className="calendar-footer">
              {format(addMonths(currentDate, -1), "MMM yyyy")}
            </span>
          </div>
          <div
            className={`right ${isNextMonthDisabled ? "disabled" : ""}`}
            onClick={handleNextMonth}
          >
            <span className="calendar-footer">
              {format(addMonths(currentDate, 1), "MMM yyyy")}
            </span>
            <MdKeyboardArrowRight className="arrow" />
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Schedule;
