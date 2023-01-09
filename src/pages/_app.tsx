import { type AppType } from "next/dist/shared/lib/utils";

import "../styles/globals.css";

import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import React, { useState } from "react";
import { Box } from "@mui/material";
import ResponsiveDrawer from "../components/drawer";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#3373E3",
    },
  },
  typography: {
    fontFamily:
      '"Montserrat", -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarColor: "#2b2b2b #121212",
          "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
            backgroundColor: "#121212",
          },
          "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
            borderRadius: 8,
            backgroundColor: "#2b2b2b",
            minHeight: 24,
            border: "3px solid #121212",
          },
          "&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus":
            {
              backgroundColor: "#959595",
            },
          "&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active":
            {
              backgroundColor: "#959595",
            },
          "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover":
            {
              backgroundColor: "#959595",
            },
          "&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner": {
            backgroundColor: "#121212",
          },
        },
      },
    },
  },
});

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#3373E3",
    },
  },
  typography: {
    fontFamily:
      '"Montserrat", -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarColor: "#bebebe #f0f0f0",
          "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
            backgroundColor: "#f0f0f0",
          },
          "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
            borderRadius: 8,
            backgroundColor: "#bebebe",
            minHeight: 24,
            border: "3px solid #f0f0f0",
          },
          "&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus":
            {
              backgroundColor: "#959595",
            },
          "&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active":
            {
              backgroundColor: "#959595",
            },
          "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover":
            {
              backgroundColor: "#959595",
            },
          "&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner": {
            backgroundColor: "#f0f0f0",
          },
        },
      },
    },
  },
});

const MyApp: AppType = ({ Component, pageProps }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const drawerWidth = 240;

  const [drawerIndex, setDrawerIndex] = useState(0);

  return (
    <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <ResponsiveDrawer
          drawerWidth={drawerWidth}
          isDarkTheme={isDarkTheme}
          toggleTheme={toggleTheme}
        />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          <Component
            {...pageProps}
            drawerIndex={drawerIndex}
            setDrawerIndex={setDrawerIndex}
          />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default MyApp;
