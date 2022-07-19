import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import Post from "./Post";
import axios from "axios";
import CreatePost from "./CreatePost";
import { useSelector } from "react-redux";

function Feed({ username, home }) {
  const [posts, setPosts] = useState([]);

  const tok = sessionStorage.getItem("token");
  const token = JSON.parse(tok);
  console.log("tok", token);
  const userdata = useSelector((state) => state.user.value);
  console.log("state dtas", userdata);

  console.log("abc", posts);
  const fetchPosts = async () => {
    const config = {
      headers: {
        "Content-type": "application/json",
        "auth-token": token,
      },
    };
    const res = username
      ? await axios.get("/posts/profile/" + username, config)
      : await axios.get(`posts/timeline/${userdata.user._id}`, config);

    setPosts(
      res.data.sort((p1, p2) => {
        return new Date(p2.createdAt) - new Date(p1.createdAt);
      })
    );
  };
  useEffect(() => {
    fetchPosts();
  }, []);
  return (
    <Box flex={4} p={2}>
      {username == userdata.user.username && (
        <CreatePost fetchpost={fetchPosts} />
      )}
      {home && <CreatePost fetchpost={fetchPosts} />}
      {posts.map((p) => (
        <Post key={p._id} post={p} />
      ))}
    </Box>
  );
}

export default Feed;
