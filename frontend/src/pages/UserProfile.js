import { Box, Button, Stack } from "@mui/material";
import Feed from "../components/Feed";
import Navbar from "../components/Navbar";
import { Card } from "@mui/material";
import React, { useEffect, useState } from "react";
import "../components/profile/Profile.css";
import axios from "axios";
import { useParams } from "react-router";
import Rightbar from "../components/Rightbar/Rightbar";
import Sidebar from "../components/Sidebar";
import { Add } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";

function UserProfile() {
  const [user, setUser] = useState({});
  const username = useParams().username;
  const userdata = useSelector((state) => state.user.value);
  console.log("data", userdata.user);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?username=${username}`);
      console.log("res", res.data);
      setUser(res.data);
    };
    fetchUser();
  }, [username]);

  const handleFollow = async () => {
    try {
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Box bgcolor={"background.default"} color={"text.primary"}>
        <Navbar />
        <Card sx={{ mt: 1 }}>
          <div className="profile">
            <div className="profileRight">
              <div className="profileRightTop">
                <div className="profileCover">
                  <img
                    className="profileCoverImg"
                    src={
                      user.coverPicture
                        ? PF + user.coverPicture
                        : PF + "person/noCover.png"
                    }
                    alt=""
                  />
                  <img
                    className="profileUserImg"
                    src={
                      user.profilePicture
                        ? PF + user.profilePicture
                        : PF + "person/noAvatar.png"
                    }
                    alt=""
                  />
                </div>
                <div className="profileInfo">
                  <h4 className="profileInfoName">{user.username}</h4>
                  <span className="profileInfoDesc">{user.desc}</span>
                  {/* {username !==userdata.user.username && (
      <Button sx={{backgroundColor:'blue', color:'white' }} onClick={handleFollow} > 
        Follow <Add/>
      </Button>
    ) } */}
                </div>
              </div>
            </div>
          </div>
        </Card>
        <Stack direction="row" spacing={2} justifyContent="space-between">
          <Sidebar pos />

          <Feed username={username} />
          <Rightbar user={user} />
        </Stack>
      </Box>
    </>
  );
}

export default UserProfile;
