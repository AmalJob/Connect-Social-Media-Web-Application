import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  TextField,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Swal from "sweetalert2";
function EditPost() {
  const navigate = useNavigate();
  const postId = useParams().postId;
  const [post, setPost] = useState({});
  const [desc, setDesc] = useState("");
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const userdata = useSelector((state) => state.user.value);
  console.log("data", userdata.user);
  const tok = sessionStorage.getItem("token");
  const token = JSON.parse(tok);
  console.log("tok", token);
  useEffect(() => {
    const editpost = async () => {
      const config = {
        headers: {
          "Content-type": "application/json",
          "auth-token": token,
        },
      };

      const res = await axios.get(`/posts/editpost/${postId}`, config);
      console.log("poost", res.data.desc);
      setPost(res.data);
      setDesc(res.data.desc);
    };
    editpost();
  }, [postId]);

  const submitPost = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          "auth-token": token,
        },
      };
      const res = await axios.patch(
        "/posts/updatepost",
        { desc, postId: post._id },
        config
      );
      console.log("result", res);
      navigate(`/profile/${userdata.user.username}`);
    } catch (error) {
      console.log(error);
    }
  };

  const deletePost = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axios.delete(`/posts/deletePost/${postId}`);
          if (res) {
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
            navigate(`/profile/${userdata.user.username}`);
          }
        } catch (error) {
          console.log(error);
        }
      }
    });

    //  try {

    //   await axios.delete(`/posts/deletePost/${postId}` )
    //   navigate(`/profile/${userdata.user.username}`)
    //  } catch (error) {
    //   console.log(error);
    //  }
  };

  return (
    <>
      <Navbar />
      <div
        style={{
          display: "flex",
          marginTop: 5,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Card sx={{ maxWidth: 345, marginTop: 10 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image={PF + post.img}
              alt="green iguana"
            />
            <CardContent>
              <TextField
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              ></TextField>
              {/* <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography> */}
            </CardContent>
            <Button
              onClick={() => submitPost()}
              sx={{
                marginLeft: 10,
                marginBottom: 1,
                backgroundColor: "blue",
                color: "white",
              }}
            >
              Post
            </Button>
            <Button onClick={() => deletePost()}>delete</Button>
          </CardActionArea>
        </Card>
      </div>
    </>
  );
}

export default EditPost;
