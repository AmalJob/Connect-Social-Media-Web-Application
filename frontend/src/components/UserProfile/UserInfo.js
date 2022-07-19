import { Box, Button, Tab, Tabs, TextField, Typography } from "@mui/material";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import TabPanel from "@mui/lab/TabPanel/TabPanel";
import TabContext from "@mui/lab/TabContext/TabContext";
import TabList from "@mui/lab/TabList/TabList";
import { AccountCircle, Password } from "@mui/icons-material";
import axios from "axios";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signIn } from "../../Redux/Slices/UserData";
function UserInfo() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = useParams().userId;
  const [value, setValue] = useState("1");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const [user, setUser] = useState({});
  const [err, setErr] = useState("");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    const editpost = async () => {
      const res = await axios.get(`/users/edituserinfo/${userId}`);
      console.log("poost", res.data);
      setUser(res.data);
      setUsername(res.data.username);
    };
    editpost();
  }, [userId]);

  const updateUsername = async () => {
    try {
      const res = await axios.patch("/users/updateusername", {
        username,
        userId: user._id,
      });
      console.log("result", res.data.username);
      //   navigate(`/profile/${userdata.user.username}`)
      dispatch(signIn({ type: "Update", name: res.data.username }));
    } catch (error) {
      console.log(error);
    }
  };
  console.log("new", newpassword);

  const updatePassword = async () => {
    try {
      const res = await axios.patch("/users/updatepassword", {
        password,
        newpassword,
        userId: user._id,
      });
      console.log("result", res);
      //   navigate(`/profile/${userdata.user.username}`)
    } catch (error) {
      console.log(error);
      setErr(error.response.data);
    }
  };

  return (
    <>
      <Navbar />
      {err && <h1>{err}</h1>}
      <div
        style={{
          display: "flex",
          marginTop: 100,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box sx={{ typography: "body1", border: "solid 1px" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="Username" value="1" />
                <Tab label="Password" value="2" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                <AccountCircle
                  sx={{ color: "action.active", mr: 1, my: 0.5 }}
                />
                <TextField
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  id="input-username"
                  label="Username"
                  variant="standard"
                />
              </Box>

              <Button
                onClick={updateUsername}
                sx={{
                  backgroundColor: "blue",
                  color: "white",
                  mt: 2,
                  marginLeft: 10,
                }}
              >
                update
              </Button>
            </TabPanel>
            <TabPanel value="2">
              <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                <Password sx={{ color: "action.active", mr: 1, my: 0.5 }} />
                <TextField
                  placeholder="******"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  id="input-with-sx"
                  label="Password"
                  variant="standard"
                />
              </Box>
              <Password sx={{ color: "action.active", mr: 1, my: 0.5 }} />
              <TextField
                id="input-with-sx"
                value={newpassword}
                onChange={(e) => setNewPassword(e.target.value)}
                label="Re-Password"
                variant="standard"
              />
              <div>
                <Button
                  onClick={updatePassword}
                  sx={{
                    backgroundColor: "blue",
                    color: "white",
                    mt: 2,
                    marginLeft: 10,
                  }}
                >
                  update
                </Button>
              </div>
            </TabPanel>
          </TabContext>
        </Box>
      </div>
    </>
  );
}

export default UserInfo;
