import {
  CalendarMonth,
  ChevronLeft,
  GitHub,
  Settings,
} from "@mui/icons-material";
import ListIcon from "@mui/icons-material/List";
import MenuIcon from "@mui/icons-material/Menu";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import DashboardIcon from "@mui/icons-material/Dashboard";
import {
  Toolbar,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  List,
  Drawer,
  Box,
  IconButton,
  Typography,
  styled,
  BoxProps,
  useTheme,
} from "@mui/material";
import Link from "next/link";
import Image from "next/image";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

interface Props {
  drawerWidth: number;
  toggleTheme: () => void;
  isDarkTheme: boolean;
}

const ResponsiveDrawer = ({ drawerWidth, toggleTheme, isDarkTheme }: Props) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState("");
  const router = useRouter();

  const theme = useTheme();
  const [open, setOpen] = useState(true);

  const handleDrawerClose = () => {
    setOpen(false);
    console.log(open);
  };

  const handleDrawerToggle = () => {
    setOpen(!open);
    setMobileOpen(!mobileOpen);
    console.log(open);
  };

  useEffect(() => {
    setCurrentPage(router.asPath);
    const handleRouteChange = (url: string) => {
      setCurrentPage(url);
    };

    router.events.on("routeChangeStart", handleRouteChange);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [router]);

  const drawer = (
    <Box onClick={handleDrawerToggle}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100vh",
          maxHeight: "100dvh",
        }}
      >
        <List disablePadding>
          <ListItem>
            <Box
              sx={{
                display: "flex",
                width: "100%",
              }}
            >
              <Box
                sx={{
                  py: 3,
                  display: "flex",
                  gap: 1,
                  justifyContent: "center",
                }}
              >
                <Image src="/logo.png" alt="logo" width={42} height={42} />
                <Box>
                  <Typography fontWeight="bold">ClickUp</Typography>
                  <Typography>Time Track</Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flex: 1,
                  alignItems: "flex-start",
                  justifyContent: "flex-end",
                }}
              >
                <IconButton onClick={handleDrawerToggle}>
                  <ChevronLeft />
                </IconButton>
              </Box>
            </Box>
            <Divider />
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              selected={currentPage === "/"}
              component={Link}
              href="/"
            >
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              selected={currentPage === "/calendar"}
              component={Link}
              href="/calendar"
            >
              <ListItemIcon>
                <CalendarMonth />
              </ListItemIcon>
              <ListItemText primary="Calendar" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              selected={currentPage === "/list"}
              component={Link}
              href="/list"
            >
              <ListItemIcon>
                <ListIcon />
              </ListItemIcon>
              <ListItemText primary="List" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              selected={currentPage === "/settings"}
              component={Link}
              href="/settings"
            >
              <ListItemIcon>
                <Settings />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItemButton>
          </ListItem>
        </List>
        <Box sx={{ display: "flex", justifyContent: "space-around" }}>
          <IconButton
            onClick={toggleTheme}
            aria-label="toggle Dark and Light theme mode"
          >
            {isDarkTheme ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
          <IconButton
            component={Link}
            href="https://github.com/joscha0/clickup-time-track"
            target="_blank"
            aria-label="GitHub"
            rel="noreferrer"
          >
            <GitHub />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );

  return (
    <Box>
      <Box
        position="fixed"
        sx={{
          zIndex: 999,
          display: { sm: open ? "none" : "block" },
          width: { sm: `calc(100% - ${open ? drawerWidth : 0}px)` },
          ml: { sm: open ? `${drawerWidth}px` : 0 },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </Box>
      <Box
        component="nav"
        sx={{ width: { sm: open ? drawerWidth : 0 }, flexShrink: { sm: 0 } }}
        aria-label="drawer"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,

              transition: theme.transitions.create(["width"], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
              }),
              ...(!open && {
                width: 0,
                transition: theme.transitions.create(["width"], {
                  easing: theme.transitions.easing.easeOut,
                  duration: theme.transitions.duration.enteringScreen,
                }),
              }),
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
};

export default ResponsiveDrawer;
