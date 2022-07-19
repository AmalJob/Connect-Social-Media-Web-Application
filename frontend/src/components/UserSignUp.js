import React, { useRef, useState } from "react";
import { Button, Grid, InputAdornment, TextField } from "@mui/material";
import {
  AccountCircle,
  EmailRounded,
  LockRounded,
  PermMedia,
} from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
function UserSignUp() {
  const [file, setFile] = useState(null);
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const repassword = useRef();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    trigger,
  } = useForm();
  const onSubmit = (data) => console.log(data);
  console.log(errors);
  const handleClick = async (e) => {
    e.preventDefault();
    console.log("hgggg", password.current.value, repassword.current.value);
    if (repassword.current.value !== password.current.value) {
      repassword.current.setCustomValidity("password doesnt match");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      if (file) {
        const data = new FormData();
        const fileName = Date.now() + file.name;
        data.append("name", fileName);
        data.append("file", file);
        user.profilePicture = fileName;
        console.log(user);
        try {
          await axios.post("/upload", data);
        } catch (err) {
          console.log(err);
        }
      }
      try {
        await axios.post("/auth/register", user);
        navigate("/login");
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <>
      <Grid container style={{ minHeight: "100vh" }} position="fixed">
        <Grid item xs={12} sm={6}>
          <img
            src="/assets/pic.jpg"
            alt=""
            style={{ width: "100%", height: "621px", objectFit: "cover" }}
          />
        </Grid>
        <Grid
          container
          item
          sx={12}
          sm={6}
          style={{ padding: 10 }}
          direction="column"
          alignItems="center"
          justifyContent="space-between"
        >
          <div />
          <form onSubmit={handleSubmit(onSubmit) && handleClick}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                maxWidth: "400",
                minWidth: "400",
              }}
            >
              <Grid container justifyContent="center">
                <img src="/assets/logo1.png" width={180} alt="" />
              </Grid>
              <TextField
                label="name"
                margin="normal"
                inputRef={username}
                required
                {...register("name", { required: "Name is Required" })}
                onKeyUp={() => {
                  trigger("name");
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  ),
                }}
              />
              {errors.name && (
                <small style={{ color: "red" }}>{errors.name.message}</small>
              )}
              <TextField
                label="email"
                margin="normal"
                inputRef={email}
                required
                {...register("email", {
                  required: "Email is Required",
                  pattern: {
                    value:
                      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
                    message: "Use valid Email addres",
                  },
                })}
                onKeyUp={() => {
                  trigger("email");
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailRounded />
                    </InputAdornment>
                  ),
                }}
              />
              {errors.email && (
                <small style={{ color: "red" }}>{errors.email.message}</small>
              )}
              <TextField
                label="password"
                type="password"
                margin="normal"
                inputRef={password}
                required
                {...register("password", { required: "Password is Required" })}
                onKeyUp={() => {
                  trigger("password");
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockRounded />
                    </InputAdornment>
                  ),
                }}
              />
              {errors.password && (
                <small style={{ color: "red" }}>
                  {errors.password.message}
                </small>
              )}
              <TextField
                label="Re-password"
                type="password"
                margin="normal"
                inputRef={repassword}
                required
                {...register("repassword", {
                  required: "RePassword is Required",
                })}
                onKeyUp={() => {
                  trigger("repassword");
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockRounded />
                    </InputAdornment>
                  ),
                }}
              />
              {errors.repassword && (
                <small style={{ color: "red" }}>
                  {errors.repassword.message}
                </small>
              )}
              <div style={{display:'flex' }}>

              <label htmlFor="file">
                <PermMedia />
                <input
                  style={{ display: "none" }}
                  type="file"
                  id="file"
                  accept=".png, .jpeg, .jpg"
                  onChange={(e) => setFile(e.target.files[0])}
                  // onChange={onImageChange}
                  />
              </label>
                <p>Upload Image</p> 
              </div>
              <div style={{ height: 20 }} />
              <Button type="submit" color="primary" variant="contained">
                Sign Up
              </Button>

              <div style={{ height: 20 }} />

              <Button sx={{ color: "black" }}>Already have a Account?</Button>
            </div>
          </form>
          <div />
        </Grid>
      </Grid>
    </>
  );
}

export default UserSignUp;
