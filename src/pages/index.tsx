import { Box, Typography } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
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
      <Box sx={{ p: 10 }}>
        <Typography variant="h1">Dashboard</Typography>
      </Box>
    </>
  );
};

export default Home;
