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
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../../Redux/Slices/UserData";
import Swal from "sweetalert2";
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
  const [img, setImg] = useState(null);
  const [file, setFile] = useState(null);
  const [mesg, setMesg] = useState(null)
  const userdata = useSelector((state) => state.user.value);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const tok = sessionStorage.getItem("token");
  const token = JSON.parse(tok);
  useEffect(() => {
    const editpost = async () => {
      const config = {
        headers: {
          "Content-type": "application/json",
          "auth-token": token,
        },
      };
      const res = await axios.get(`/users/edituserinfo/${userId}` , config);
      console.log("poost", res.data);
      setUser(res.data);
      setUsername(res.data.username);
    };
    editpost();
  }, [userId]);

  const updateUsername = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          "auth-token": token,
        },
      };
      const res = await axios.patch("/users/updateusername", {
        username,
        userId: user._id,
      } , config);
      const result = res.data
      console.log("result", res.data);
      dispatch(signIn(result));
     window.location.reload()
    } catch (error) {
      console.log(error);
    }
  };
  console.log("new", newpassword);

  const updatePassword = async (e) => {
    e.preventDefault()
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          "auth-token": token,
        },
      };
      const res = await axios.patch("/users/updatepassword", {
        password,
        newpassword,
        userId: user._id,
      } , config);
      console.log("result", res);
      //   navigate(`/profile/${userdata.user.username}`)
    } catch (error) {
      console.log(error);
      setErr(error.response.data);
    }
  };
  const onImageChange = (event) => {
    setFile(event.target.files[0]);
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
        setImg(e.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };
  const submitHandler = async (e) => {
    e.preventDefault();
  
   
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      var image = fileName;
      console.log(image);
      try {
        await axios.post("/upload", data);
      } catch (err) {
        console.log(err);
      }
    
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          "auth-token": token,
        },
      };

   const res =  await axios.patch("/users/updateprofilePicture",  {image,  userId: user._id,} );
    const respons = res.data
console.log("updat",res.data);
dispatch(signIn(respons)); 
Swal.fire({
  // position: 'top-end',
  icon: 'success',
  title: 'Profile Picture Updated',
  showConfirmButton: false,
  timer: 1500
})
setFile(null)
    } catch (error) {}
  }else{
    Swal.fire({
      // position: 'top-right',
      icon: 'info',
      title: 'Please select Image',
      showConfirmButton: false,
      timer: 1500
    })
  }
  }
console.log("pic",user.profilePicture);
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
                <Tab label="Profile Pic" value="3" />
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
              <form action="">
              <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                <Password sx={{ color: "action.active", mr: 1, my: 0.5 }} />
                <TextField
                  required
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
              required
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
              </form>
            </TabPanel>
            <TabPanel value="3">
              
              <form action="">
              <Box sx={{ display: "flex", justifyContent:'center', alignItems: "center" }}>
              <label htmlFor="file">
                <img  src={
                    img ? img :  user.profilePicture
                        ? PF + user.profilePicture 
                        : PF + "person/noAvatar.png"
                      // img
                    } 
                    id="target"
                     style={{ borderRadius: '50%' , width:150 , height:150, objectFit:'cover'}}/>
             
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png, .jpeg, .jpg"
                // onChange={(e) =>
                //   setFile(e.target.files[0])}
                onChange={onImageChange}
              />
            </label>
              {/* <div > */}
                     
                {/* </div> */}
              </Box>
             
              <div>
                <Button
                  onClick={submitHandler}
                  sx={{
                    backgroundColor: "blue",
                    color: "white",
                    mt: 2,
                    marginLeft: 14,
                  }}
                >
                  update
                </Button>
              </div>
              </form>
            </TabPanel>
          </TabContext>
        </Box>
      </div>
    </>
  );
}

export default UserInfo;
