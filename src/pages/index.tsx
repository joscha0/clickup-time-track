import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import { ResponsiveCalendar } from "@nivo/calendar";
import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { getEventsData, type NewEvent } from "../services/api";
import { msToString } from "../services/helper";

const Home: NextPage = () => {
  const [events, setEvents] = useState<NewEvent[]>([]);

  const [calendarEntries, setCalendarEntries] = useState<CalendarEntry[]>([]);

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
        });
        setCalendarEntries(calendarData);
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
                      colors={["#61cdbb", "#97e3d5", "#e8c1a0", "#f47560"]}
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
            </Grid>
          </Box>
        )}
      </Box>
    </>
  );
};

export default Home;
