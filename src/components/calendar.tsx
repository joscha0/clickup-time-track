/* Calendar.tsx component */

import { NextPage } from "next";
import Calendar from "@toast-ui/react-calendar";
import "@toast-ui/calendar/dist/toastui-calendar.min.css";
import React, { useState } from "react";
import { ArrowLeft2, ArrowRight2 } from "iconsax-react";
import {
  Box,
  Button,
  Fab,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { ArrowLeft, ChevronLeft, ChevronRight } from "@mui/icons-material";

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

  const [viewText, setViewText] = useState("week");

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
  const handleClickChangeView = (event: SelectChangeEvent) => {
    const view = event.target.value as ViewType;
    if (calendarRef.current) {
      const calendarInstance = calendarRef.current.getInstance();
      if (calendarInstance) {
        calendarInstance.changeView(view);
      }
    }
    setViewText(view);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <h1 className="py-4 text-center text-3xl text-white">Calendar</h1>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 1,
          }}
        >
          <Button variant="contained" onClick={handleClickTodayButton}>
            Today
          </Button>
          <Fab size="small" aria-label="last" onClick={handleClickPrevButton}>
            <ChevronLeft />
          </Fab>
          <Fab size="small" aria-label="next" onClick={handleClickNextButton}>
            <ChevronRight />
          </Fab>
        </Box>
        <FormControl>
          <InputLabel id="demo-simple-select-label">View</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={viewText}
            label="View"
            onChange={handleClickChangeView}
          >
            <MenuItem value={"day"}>Day</MenuItem>
            <MenuItem value={"week"}>Week</MenuItem>
            <MenuItem value={"month"}>Month</MenuItem>
          </Select>
        </FormControl>
      </Box>
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
    </Box>
  );
};

export default TimeCalendar;
