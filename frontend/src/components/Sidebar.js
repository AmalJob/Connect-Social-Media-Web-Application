import {
  AccountBox,
  LocationOn,
  ModeNight,
  Notifications,
  People,
  RssFeed,
} from "@mui/icons-material";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Switch,
} from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Sidebar({ mode, setMode }) {
  const userdata = useSelector((state) => state.user.value);
  console.log("data", userdata);
  return (
    <Box flex={1} p={3} sx={{ display: { xs: "none", sm: "block" } }}>
      <Box>
        <List>
          <ListItem disablePadding>
            <ListItemButton component="a" href="#feed">
              <ListItemIcon>
                <RssFeed />
              </ListItemIcon>
              <ListItemText primary="Feed" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="#people">
              <ListItemIcon>
                <People />
              </ListItemIcon>
              <ListItemText primary="Friends" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="#feed">
              <ListItemIcon>
                <LocationOn />
              </ListItemIcon>
              <ListItemText primary="Location" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="#feed">
              <ListItemIcon>
                <Notifications />
              </ListItemIcon>
              <ListItemText primary="Notification" />
            </ListItemButton>
          </ListItem>
          <Link
            style={{ textDecoration: "none" }}
            to={`/profile/${userdata.username}`}
          >
            <ListItem disablePadding>
              <ListItemButton component="a" href="#feed">
                <ListItemIcon>
                  <AccountBox />
                </ListItemIcon>
                <ListItemText primary="Profile" />
              </ListItemButton>
            </ListItem>
          </Link>
          <ListItem disablePadding>
            <ListItemButton component="a" href="#feed">
              <ListItemIcon>
                <ModeNight />
              </ListItemIcon>
              <Switch
                onChange={(e) => setMode(mode === "light" ? "dark" : "light")}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Box>
  );
}

export default Sidebar;
