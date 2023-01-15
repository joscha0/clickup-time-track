/* Calendar.tsx component */

import { type NextPage } from "next";
import Calendar from "@toast-ui/react-calendar";
import "@toast-ui/calendar/dist/toastui-calendar.min.css";
import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  type SelectChangeEvent,
  useTheme,
} from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { calendarThemeDark, calendarThemeLight } from "../services/themes";

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

  const theme = useTheme();

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
    return { id: calendar, name: calendar, backgroundColor: color! };
  });

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
    <Box sx={{ width: "100%", height: "100%" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: 2,
          height: 60,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 1,
          }}
        >
          <Box sx={{ width: 40, display: { xs: "block", sm: "none" } }}></Box>
          <Button onClick={handleClickTodayButton}>Today</Button>
          <Box>
            <IconButton aria-label="last" onClick={handleClickPrevButton}>
              <ChevronLeft />
            </IconButton>
            <IconButton aria-label="next" onClick={handleClickNextButton}>
              <ChevronRight />
            </IconButton>
          </Box>
        </Box>
        <FormControl sx={{ m: 1, minWidth: 100 }} size="small">
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={viewText}
            onChange={handleClickChangeView}
          >
            <MenuItem value={"day"}>Day</MenuItem>
            <MenuItem value={"week"}>Week</MenuItem>
            <MenuItem value={"month"}>Month</MenuItem>
          </Select>
        </FormControl>
      </Box>
      {theme.palette.mode === "dark" ? (
        <CalendarDark events={events} newCalendars={newCalendars} />
      ) : (
        <CalendarLight events={events} newCalendars={newCalendars} />
      )}
    </Box>
  );
};

interface NewCalendar {
  id: string;
  name: string;
  backgroundColor: string;
}
interface CalendarProps {
  newCalendars: NewCalendar[];
  events: NewEvent[];
}

const CalendarDark = (props: CalendarProps) => {
  const { events, newCalendars } = props;
  const calendarRef = React.createRef<Calendar>();
  return (
    <Calendar
      ref={calendarRef}
      height="calc(100% - 60px)"
      usageStatistics={false}
      week={{
        eventView: ["time"],
        taskView: false,
        startDayOfWeek: 1,
      }}
      isReadOnly={true}
      view={"week"}
      calendars={newCalendars}
      events={events}
      theme={calendarThemeDark}
    />
  );
};

const CalendarLight = (props: CalendarProps) => {
  const { events, newCalendars } = props;
  const calendarRef = React.createRef<Calendar>();
  return (
    <Calendar
      ref={calendarRef}
      height="calc(100% - 60px)"
      usageStatistics={false}
      week={{
        eventView: ["time"],
        taskView: false,
        startDayOfWeek: 1,
      }}
      isReadOnly={true}
      view={"week"}
      calendars={newCalendars}
      events={events}
      theme={calendarThemeLight}
    />
  );
};

export default TimeCalendar;
