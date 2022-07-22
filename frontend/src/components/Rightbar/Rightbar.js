import {
  Add,
  Drafts,
  Edit,
  Home,
  LocationCity,
  Remove,
  Send,
  SettingsAccessibility,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  ImageList,
  ImageListItem,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Users } from "../../DummyData";
import Online from "../Online";
import "./Rightbar.css";
import { signIn } from "../../Redux/Slices/UserData";
import { Link } from "react-router-dom";
function Rightbar({ user }) {
  const dispatch = useDispatch();
  const [followed, setFollowed] = useState(false);
  console.log("user", user);
  const [friends, setFriends] = useState([]);
  const users = localStorage.getItem("userDetails");
  const currentUser = JSON.parse(users);
  const userdata = useSelector((state) => state.user.value);
  console.log("datahellooo", userdata);
  const tok = sessionStorage.getItem("token");
  const token = JSON.parse(tok);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  useEffect(() => {
    setFollowed(userdata.following.includes(user?._id));
  }, [user?._id]);

  useEffect(() => {
    const getFriends = async () => {
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            "auth-token": token,
          },
        };
        const friendList = await axios.get("/users/friends/"+userdata._id , config);
        setFriends(friendList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [user]);

  const handleFollow = async () => {
    try {
      if (followed) {
        const config = {
          headers: {
            "Content-type": "application/json",
            "auth-token": token,
          },
        };
        const res = await axios.put("/users/" + user._id + "/unfollow", {
          userId: userdata._id,
        } , config);
        const respo= res.data
        console.log("respo", respo);
        dispatch( signIn(respo))
        //  dispatch( signIn("hellooooo"))
      } else {
        const config = {
          headers: {
            "Content-type": "application/json",
            "auth-token": token,
          },
        };
        const response = await axios.put("/users/" + user._id + "/follow", {
          userId: userdata._id,
        }, config);
        const resp= response.data
        console.log("resp",resp);
        dispatch( signIn(resp))
        //  dispatch( signIn(response))
      }
    } catch (error) {
      console.log(error);
    }
    setFollowed(!followed);
  };

  const HomeRightbar = () => {
    return (
      <>
        <Typography variant="h6" fontWeight={200} mb={1}>
          {" "}
          Friends
        </Typography>
        {friends.map((friend) => (
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemAvatar>
                <Link to={`/profile/${friend.username}`}>
                <Avatar
                  alt=""
                  src={
                    friend.profilePicture
                      ? PF + friend.profilePicture
                      : PF + "person/noAvatar.png"
                  }
                />
                </Link>
              </ListItemAvatar>
              <ListItemText id="" primary={friend.username} />
            </ListItemButton>
          </ListItem>
        ))}
        <Typography variant="h6" fontWeight={200} mt={2} mb={2}>
          Latest Photos
        </Typography>
        <ImageList gap={5} cols={3} rowHeight={100}>
          <ImageListItem>
            <img
              src="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e"
              alt=""
            />
          </ImageListItem>
          <ImageListItem>
            <img
              src="https://images.unsplash.com/photo-1551782450-a2132b4ba21d"
              alt=""
            />
          </ImageListItem>
          <ImageListItem>
            <img
              src="https://images.unsplash.com/photo-1522770179533-24471fcdba45"
              alt=""
            />
          </ImageListItem>
        </ImageList>
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
        {user.username !== userdata.username && (
          <button class="custom-btn btn-3" onClick={handleFollow}>
            <span>
              {followed ? "Unfollow" : "Follow"}
              {followed ? <Remove /> : <Add />}
            </span>
          </button>
        )}
        {/* <button class="custom-btn btn-3"><span>Read More</span></button> */}

        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader component="div" id="nested-list-header">
              <span>
                <h1>
                  About Information 
                </h1>
              </span>
            </ListSubheader>
          }
        >
          <ListItemButton>
            <ListItemIcon>
              <SettingsAccessibility />
            </ListItemIcon>
            <ListItemText primary={user.username} />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <LocationCity />
            </ListItemIcon>
            <ListItemText primary={user.email} />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            <ListItemText primary="From" />
          </ListItemButton>
        </List>
      </>
    );
  };

  return (
    <Box p={2} flex={2} sx={{ display: { xs: "none", sm: "block" } }}>
      <Box width={300}>{user ? <ProfileRightbar /> : <HomeRightbar />}</Box>
    </Box>
  );
}

export default Rightbar;
