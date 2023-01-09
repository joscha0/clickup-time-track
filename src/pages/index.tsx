import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { ResponsiveCalendar } from "@nivo/calendar";
import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { getEventsData, type NewEvent } from "../services/api";
import { msToString } from "../services/helper";

const Home: NextPage = () => {
  const [events, setEvents] = useState<NewEvent[]>([]);

  const [calendarEntries, setCalendarEntries] = useState<CalendarEntry[]>([]);
  const [dayOfWeekEntries, setDayOfWeekEntries] = useState<number[]>([]);

  const [isLoading, setLoading] = useState(false);

  const theme = useTheme();

  interface CalendarEntry {
    day: string;
    value: number;
  }

  useEffect(() => {
    setLoading(true);
    const apiKeyReq: string = localStorage.getItem("api-key") ?? "";
    const teamIdReq: string = localStorage.getItem("team-id") ?? "";

    getEventsData(apiKeyReq, teamIdReq).then((data) => {
      if (data) {
        const { newEvents } = data;
        setEvents(newEvents);

        const calendarData: CalendarEntry[] = [];
        const dayOfWeekData: number[] = [0, 0, 0, 0, 0, 0, 0];

        newEvents.forEach((event: NewEvent) => {
          const day = new Date(event.start).toISOString().split("T")[0];
          const calendarItemIndex = calendarData.findIndex(
            (el) => el.day === day
          );
          if (calendarItemIndex === -1) {
            calendarData.push({ value: +event.duration, day: day ?? "" });
          } else {
            calendarData[calendarItemIndex]!.value += +event.duration;
          }

          dayOfWeekData[new Date(event.start).getDay()] += +event.duration;
        });
        setCalendarEntries(calendarData);
        setDayOfWeekEntries(dayOfWeekData);
      }
      setLoading(false);
    });
  }, []);
  return (
    <>
      <Head>
        <title>CUTT - Dashboard</title>
        <meta
          property="og:title"
          content="ClickUp Time Track - Dashboard"
          key="title"
        />
      </Head>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        {isLoading ? (
          <CircularProgress />
        ) : (
          <Box sx={{ width: "100%", height: "100%" }}>
            <Grid container padding={5} spacing={2} columns={{ xs: 1, xl: 2 }}>
              <Grid item xs={1}>
                <Card>
                  <CardContent sx={{ height: 500 }}>
                    <Typography textAlign="center" variant="h5">
                      Calendar Overview
                    </Typography>
                    <ResponsiveCalendar
                      data={calendarEntries}
                      theme={{
                        textColor: theme.palette.text.secondary,
                        tooltip: {
                          container: {
                            background: theme.palette.background.paper,
                          },
                        },
                      }}
                      from={new Date(new Date().getFullYear() - 1, 1, 1)}
                      to={new Date(new Date().getFullYear(), 11, 31)}
                      emptyColor={theme.palette.background.paper}
                      colors={["#122B56", "#1A3C77", "#2D60B8", "#5E98FD"]}
                      margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
                      yearSpacing={40}
                      monthBorderColor={theme.palette.action.disabledBackground}
                      dayBorderWidth={2}
                      dayBorderColor={theme.palette.action.focus}
                      tooltip={(data) => {
                        if (data.value === undefined) return null;
                        return (
                          <Card
                            sx={{
                              padding: "10px",
                            }}
                          >
                            <span style={{ color: data.color }}>◼</span>{" "}
                            {data.day} : {msToString(parseInt(data.value))}
                          </Card>
                        );
                      }}
                      legends={[
                        {
                          anchor: "bottom-right",
                          direction: "row",
                          translateY: 36,
                          itemCount: 4,
                          itemWidth: 42,
                          itemHeight: 36,
                          itemsSpacing: 14,
                          itemDirection: "right-to-left",
                        },
                      ]}
                    />
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={1}>
                <Card>
                  <CardContent sx={{ height: 500 }}>
                    <Typography textAlign="center" variant="h5">
                      Day of the Week
                    </Typography>
                    <Box sx={{ p: 5, height: 450 }}>
                      <ResponsiveBar
                        theme={{
                          textColor: theme.palette.text.primary,
                          axis: {
                            ticks: {
                              text: {
                                fontSize: theme.typography.body1.fontSize,
                              },
                            },
                          },
                        }}
                        margin={{ bottom: 50 }}
                        axisBottom={{
                          tickSize: 5,
                          tickPadding: 5,
                          tickRotation: 0,
                        }}
                        enableLabel={false}
                        axisLeft={null}
                        isInteractive={false}
                        colors={["#3373E3"]}
                        data={[
                          {
                            id: "Mon",
                            value: dayOfWeekEntries[0]?.toString() ?? "0",
                          },
                          {
                            id: "Tue",
                            value: dayOfWeekEntries[1]?.toString() ?? "0",
                          },
                          {
                            id: "Wed",
                            value: dayOfWeekEntries[2]?.toString() ?? "0",
                          },
                          {
                            id: "Thu",
                            value: dayOfWeekEntries[3]?.toString() ?? "0",
                          },
                          {
                            id: "Fri",
                            value: dayOfWeekEntries[4]?.toString() ?? "0",
                          },
                          {
                            id: "Sat",
                            value: dayOfWeekEntries[5]?.toString() ?? "0",
                          },
                          {
                            id: "Sun",
                            value: dayOfWeekEntries[6]?.toString() ?? "0",
                          },
                        ]}
                      />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        )}
      </Box>
    </>
  );
};

export default Home;
