/* Calendar.tsx component */

import { NextPage } from "next";
import Calendar from "@toast-ui/react-calendar";
import "@toast-ui/calendar/dist/toastui-calendar.min.css";
import { useEffect } from "react";

interface NewEvent {
  id: string;
  calendarId: string;
  title: string;
  start: string;
  end: string;
  category: string;
}

interface Props {
  events: NewEvent[];
  calendars: string[];
}

const TimeCalendar: NextPage<Props> = (props) => {
  const { events, calendars } = props;

  const colors = [
    "#4285F4",
    "#FBBC04",
    "#34A853",
    "#F72A25",
    "#1967D2",
    "#188038",
  ];
  useEffect(() => {
    console.log(events);
  }, []);
  const newCalendars = calendars.map((calendar, index) => {
    var color = colors[index % colors.length];
    return { id: calendar, name: calendar, backgroundColor: color };
  });

  const backgroundColor = "#121212";
  const borderColor = "1px solid #2f2f2f";

  return (
    <div className="w-full ">
      <h1 className="py-4 text-center text-3xl text-white">Calendar</h1>
      <Calendar
        usageStatistics={false}
        week={{ eventView: ["time"], taskView: false, startDayOfWeek: 1 }}
        isReadOnly={true}
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
