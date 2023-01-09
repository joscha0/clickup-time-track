/* Calendar.tsx component */

import { NextPage } from "next";
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
  SelectChangeEvent,
  useTheme,
} from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

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
    return { id: calendar, name: calendar, backgroundColor: color };
  });

  const primaryColor = "#3373E3";
  const backgroundColor = "#121212";
  const borderColor = "1px solid #2f2f2f";
  const backgroundColorLight = "#fff";
  const borderColorLight = "1px solid #e5e5e5";

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
        theme={
          theme.palette.mode === "dark"
            ? {
                common: {
                  backgroundColor: backgroundColor,
                  border: borderColor,
                  holiday: {
                    color: "#fff",
                  },
                },
                week: {
                  today: {
                    color: primaryColor,
                  },
                  nowIndicatorLabel: {
                    color: primaryColor,
                  },
                  nowIndicatorToday: {
                    border: "1px solid " + primaryColor,
                  },
                  nowIndicatorPast: {
                    border: "1px dashed " + primaryColor,
                  },
                  nowIndicatorBullet: {
                    backgroundColor: primaryColor,
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
                    color: "#fff",
                  },
                },
              }
            : {
                common: {
                  backgroundColor: backgroundColorLight,
                  border: borderColorLight,
                  holiday: {
                    color: "#000",
                  },
                },
                week: {
                  today: {
                    color: primaryColor,
                  },
                  nowIndicatorLabel: {
                    color: primaryColor,
                  },
                  nowIndicatorToday: {
                    border: "1px solid " + primaryColor,
                  },
                  nowIndicatorPast: {
                    border: "1px dashed " + primaryColor,
                  },
                  nowIndicatorBullet: {
                    backgroundColor: primaryColor,
                  },
                  dayName: {
                    borderLeft: borderColorLight,
                    borderTop: borderColorLight,
                    borderBottom: borderColorLight,
                  },
                  timeGrid: {
                    borderRight: borderColorLight,
                  },
                  timeGridLeft: {
                    borderRight: borderColorLight,
                  },
                  timeGridHalfHourLine: {
                    borderBottom: "1px solid #2F2F2F59",
                  },
                  timeGridHourLine: {
                    borderBottom: borderColorLight,
                  },
                  futureTime: {
                    color: "#000",
                  },
                },
              }
        }
      />
    </Box>
  );
};

export default TimeCalendar;
