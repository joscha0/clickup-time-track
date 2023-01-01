/* Calendar.tsx component */

import { NextPage } from "next";
import Calendar from "@toast-ui/react-calendar";
import "@toast-ui/calendar/dist/toastui-calendar.min.css";
import React, { useState } from "react";
import { ArrowLeft2, ArrowRight2 } from "iconsax-react";

interface NewEvent {
  id: string;
  calendarId: string;
  title: string;
  start: string;
  end: string;
  category: string;
  duration: string;
}

interface Props {
  events: NewEvent[];
  calendars: string[];
}

const TimeCalendar: NextPage<Props> = (props) => {
  const { events, calendars } = props;

  var [viewText, setViewText] = useState("week");

  const colors = [
    "#4285F4",
    "#FBBC04",
    "#34A853",
    "#F72A25",
    "#1967D2",
    "#188038",
  ];

  const newCalendars = calendars.map((calendar, index) => {
    const color = colors[index % colors.length];
    return { id: calendar, name: calendar, backgroundColor: color };
  });

  const backgroundColor = "#121212";
  const borderColor = "1px solid #2f2f2f";

  const calendarRef = React.createRef<Calendar>();

  const handleClickNextButton = () => {
    if (calendarRef.current) {
      const calendarInstance = calendarRef.current.getInstance();
      if (calendarInstance) {
        calendarInstance.next();
      }
    }
  };
  const handleClickPrevButton = () => {
    if (calendarRef.current) {
      const calendarInstance = calendarRef.current.getInstance();
      if (calendarInstance) {
        calendarInstance.prev();
      }
    }
  };
  const handleClickTodayButton = () => {
    if (calendarRef.current) {
      const calendarInstance = calendarRef.current.getInstance();
      if (calendarInstance) {
        calendarInstance.today();
      }
    }
  };

  type ViewType = "month" | "week" | "day";
  const handleClickChangeView = (view: ViewType) => {
    if (calendarRef.current) {
      const calendarInstance = calendarRef.current.getInstance();
      if (calendarInstance) {
        calendarInstance.changeView(view);
      }
    }
    setViewText(view);
  };

  return (
    <div className="w-full">
      <h1 className="py-4 text-center text-3xl text-white">Calendar</h1>
      <div className="flex content-center justify-between bg-black">
        <div className="flex content-center space-x-2 p-3">
          <button className="btn" onClick={handleClickTodayButton}>
            Today
          </button>
          <button className="btn-circle btn" onClick={handleClickPrevButton}>
            <ArrowLeft2 size="32" color="#fff" />
          </button>
          <button className="btn-circle btn" onClick={handleClickNextButton}>
            <ArrowRight2 size="32" color="#fff" />
          </button>
        </div>
        <div className="dropdown p-3">
          <label tabIndex={0} className="btn">
            {viewText}
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu rounded-box mt-1 w-52 bg-base-100 p-2 shadow"
          >
            <li>
              <a onClick={() => handleClickChangeView("day")}>Day</a>
            </li>
            <li>
              <a onClick={() => handleClickChangeView("week")}>Week</a>
            </li>
            <li>
              <a onClick={() => handleClickChangeView("month")}>Month</a>
            </li>
          </ul>
        </div>
      </div>
      <Calendar
        ref={calendarRef}
        usageStatistics={false}
        week={{ eventView: ["time"], taskView: false, startDayOfWeek: 1 }}
        isReadOnly={true}
        view={"week"}
        calendars={newCalendars}
        events={events}
        theme={{
          common: {
            backgroundColor: backgroundColor,
            border: borderColor,
            holiday: {
              color: "#fff",
            },
            saturday: {
              color: "#fff",
            },
          },
          week: {
            today: {
              color: "#575ae7",
            },
            dayName: {
              borderLeft: borderColor,
              borderTop: borderColor,
              borderBottom: borderColor,
            },
            timeGrid: {
              borderRight: borderColor,
            },
            timeGridLeft: {
              borderRight: borderColor,
            },
            timeGridHalfHourLine: {
              borderBottom: "1px solid #2F2F2F59",
            },
            timeGridHourLine: {
              borderBottom: borderColor,
            },
            futureTime: {
              color: "#b8b8b8",
            },
          },
        }}
      />
    </div>
  );
};

export default TimeCalendar;
