import { Box, CircularProgress } from "@mui/material";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { getEventsData, NewEvent } from "../services/api";
import List from "../components/list";

const ListPage: NextPage = () => {
  const [events, setEvents] = useState<NewEvent[]>([]);
  const [teamId, setTeam] = useState("");

  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const apiKeyReq: string = localStorage.getItem("api-key") ?? "";
    const teamIdReq: string = localStorage.getItem("team-id") ?? "";
    setTeam(teamIdReq);
    getEventsData(apiKeyReq, teamIdReq).then((data) => {
      if (data) {
        const { newEvents } = data;
        setEvents(newEvents);
      }
      setLoading(false);
    });
  }, []);
  return (
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
        <List events={events} teamId={teamId} />
      )}
    </Box>
  );
};

export default ListPage;
