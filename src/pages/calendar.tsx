import { Box, CircularProgress } from "@mui/material";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { getEventsData, type NewEvent } from "../services/api";
import dynamic from "next/dynamic";
import Head from "next/head";
const TimeCalendar = dynamic(() => import("../components/calendar"), {
  ssr: false,
});

const Calendar: NextPage = () => {
  const [events, setEvents] = useState<NewEvent[]>([]);
  const [calendars, setCalendars] = useState<string[]>([]);

  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const apiKeyReq: string = localStorage.getItem("api-key") ?? "";
    const teamIdReq: string = localStorage.getItem("team-id") ?? "";

    getEventsData(apiKeyReq, teamIdReq).then((data) => {
      if (data) {
        const { newEvents, calendars } = data;
        setEvents(newEvents);
        setCalendars(calendars);
      }
      setLoading(false);
    });
  }, []);
  return (
    <>
      <Head>
        <title>CUTT - Calendar</title>
        <meta
          property="og:title"
          content="ClickUp Time Track - Calendar"
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
          <TimeCalendar events={events} calendars={calendars} />
        )}
      </Box>
    </>
  );
};

export default Calendar;
