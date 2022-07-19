import {
  Button,
  CircularProgress,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useRef, useState } from "react";
import { AccountCircle, LockRounded } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useDispatch } from "react-redux";
import { signIn } from "../Redux/Slices/UserData";

function UserLogin() {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    trigger,
  } = useForm();
  const onSubmit = (data) => console.log(data);
  const email = useRef();
  const password = useRef();
  const [errorss, setErrorss] = useState(false);
  const navigate = useNavigate();
  const Signup = () => {
    navigate("/signup");
  };

  const handleClick = async (e) => {
    e.preventDefault();
    // loginCall({ email: email.current.value , password: password.current.value}, dispatch)

    //  navigate('/')

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      //
      const { data } = await axios.post("auth/login", {
        email: email.current.value,
        password: password.current.value,
      });
      dispatch(signIn(data));
      console.log(data);
      localStorage.setItem("userDetails", JSON.stringify(data));
      sessionStorage.setItem("token", JSON.stringify(data.token));

      navigate("/");
    } catch (error) {
      console.log("err", error.response.data);
      setErrorss(error.response.data);
    }
  };

  return (
    <>
      <Grid container style={{ minHeight: "100vh" }} position="fixed">
        <Grid item xs={12} sm={6}>
          <img
            src="/assets/pic.jpg"
            alt=""
            style={{ width: "100%", height: "622.5px", objectFit: "cover" }}
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
          {errorss && (
            <Typography variant="h6" fontWeight={200} color="red">
              {errorss}
            </Typography>
          )}
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
                inputRef={email}
                label="email"
                margin="normal"
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
                      <AccountCircle />
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
              <div style={{ height: 20 }} />
              <Button type="submit" color="primary" variant="contained">
                'Log in'
              </Button>
              <div style={{ height: 20 }} />

              <Button sx={{ color: "black" }} onClick={Signup}>
                Create New Account
              </Button>
            </div>
          </form>
          <div />
        </Grid>
      </Grid>
    </>
  );
}

export default UserLogin;
