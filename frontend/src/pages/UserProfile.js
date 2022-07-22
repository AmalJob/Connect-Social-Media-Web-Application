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
import { Add, Edit } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import {Link, useNavigate} from 'react-router-dom'
import { Audio } from "react-loader-spinner";
function UserProfile() {
  const [user, setUser] = useState({});
  const username = useParams().username;
  const userdata = useSelector((state) => state.user.value);
  console.log("data", userdata.user);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const navigate = useNavigate()
  useEffect(()=>{
    if(!sessionStorage.getItem('token')){
       navigate('/login')
    }
  })

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
       { user ? <Card sx={{ mt: 1 }}>
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
                  <Link
                    style={{ textDecoration: "none" }}
                    to={`/edituserinfo/${userdata._id}`} 
                  >
            { userdata.username === user.username &&      <Edit /> }
            </Link>
                  {/* <span className="profileInfoDesc">{user.desc}</span> */}
                  {/* {username !==userdata.user.username && (
      <Button sx={{backgroundColor:'blue', color:'white' }} onClick={handleFollow} > 
        Follow <Add/>
      </Button>
    ) } */}
                </div>
              </div>
            </div>
          </div>
        </Card> : 
         (
          <div
            style={{
              margin: "30px auto",
              maxWidth: "150px",
              padding: "20px",
              textAlign: "center",
              marginTop: "100px",
            }}
          >
            <Audio height="100" width="100" color="red" ariaLabel="loading" />
          </div>
        )}
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
