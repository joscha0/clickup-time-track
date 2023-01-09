import { Box, CircularProgress } from "@mui/material";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import Settings from "../components/settings";

const SettingsPage: NextPage = () => {
  const [teamId, setTeam] = useState("");
  const [apiKey, setApi] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const apiKeyReq: string = localStorage.getItem("api-key") ?? "";
    const teamIdReq: string = localStorage.getItem("team-id") ?? "";
    setTeam(teamIdReq);
    setApi(apiKeyReq);
    setLoading(false);
  }, []);
  return (
    <>
      <Head>
        <title>CUTT - Settings</title>
        <meta
          property="og:title"
          content="ClickUp Time Track - Settings"
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
          <Settings
            setApi={setApi}
            setTeam={setTeam}
            apiKey={apiKey}
            teamId={teamId}
          />
        )}
      </Box>
    </>
  );
};

export default SettingsPage;
