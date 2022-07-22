import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Checkbox,
  Fade,
  IconButton,
  Modal,
  Popover,
  TextField,
  Typography,
} from "@mui/material";
import {
  MoreVert,
  Favorite,
  Share,
  FavoriteBorder,
  Edit,
  Send,
  Delete,
  KeyboardArrowDown,
  Comment,
} from "@mui/icons-material";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import Backdrop from "@mui/material/Backdrop";
import { borderRadius } from "@mui/system";
function Post({ post }) {
  console.log("poo", post);
  let results;
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const users = localStorage.getItem("userDetails");
  const currentUser = JSON.parse(users);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const userdata = useSelector((state) => state.user.value);
  console.log("userdata",userdata);
  const commentss = post.comments;
  const [commen, setCommen] = useState(commentss);
  const [posts, setPosts] = useState(commentss);
  const [pos, setPos] = useState("");
  console.log("data", userdata.user);
  const [anchorEl, setAnchorEl] = useState(null);
  const style = {
    position: "absolute",
    top: "60%",
    left: "30%",
    transform: "translate(-50%, -50%)",
    width: 200,
    bgcolor: "background.paper",
    border: "1px solid #000",
    boxShadow: 24,
    p: 4,
    borderRadius: "25px",
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  useEffect(() => {
    setIsLiked(post.likes.includes(userdata._id));
    setPosts(commentss);
  }, [userdata._id, results]);
  console.log("coooo", posts);
  const makeComment = async (text, postId) => {
    console.log("texttt", text, postId);
    await axios
      .patch("/posts/comment", {
        postId,
        text,
        username: userdata.username,
      })

      .then((result) => {
        console.log("result", result);
        results = result.data.comments;
        console.log("hello", results);

        setCommen(results);
        console.log("oooo", posts);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };
  console.log("pravee", commen);
  useEffect(() => {
    console.log("fgffg", results);
    const fetchUser = async () => {
      const res = await axios.get(`/users?userId=${post.userId}`);
      setUser(res.data);
    };
    fetchUser();
  }, [post.userId]);

  const likeHandler = async () => {
    try {
      await axios.put("/posts/" + post._id + "/like", {
        userId: userdata._id,
      });
    } catch (error) {}

    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  return (
    <div>
      <Card sx={{ margin: 5 }}>
        <CardHeader
          avatar={
            <Link to={`/profile/${user.username}`}>
              <Avatar
                src={
                  PF + user.profilePicture ||
                  "/assets/person/noAvatar.png"
                }
                aria-label="recipe"
              ></Avatar>
            </Link>
          }
          action={
            userdata.username === user.username &&
            <Link to={`/editpost/${post._id}`}>
              <IconButton aria-label="settings">
                <Edit />
              </IconButton>
            </Link>
          }
          title={user.username}
          subheader={format(post.createdAt)}
        />

      { post.img && <CardMedia
          component="img"
          height="20%"
          image={PF + post.img}
          // alt="Paella dish"
        />}

        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            {/* <Checkbox onClick={likeHandler}  icon={<FavoriteBorder  />} checkedIcon={<Favorite />} /> */}
            <Checkbox
              onClick={likeHandler}
              icon={
                post.likes.includes(userdata._id) ? (
                  <Favorite />
                ) : (
                  <FavoriteBorder />
                )
              }
              checkedIcon={
                post.likes.includes(userdata._id) ? (
                  <FavoriteBorder />
                ) : (
                  <Favorite />
                )
              }
            />
          </IconButton>
          <IconButton aria-label="share">
            <Comment onClick={handleOpen} />
          </IconButton>
          <span>{like} people liked</span>
        </CardActions>
        <CardContent>
          <Typography variant="body1" color="text.secondary">
            {post?.desc}.
          </Typography>
        </CardContent>

        <Modal
         sx={{overflow: 'auto'}}
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <Box sx={style}>
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                Comments
              </Typography>
              {commen.map((record) => {
                return (
                  <div>
                  <Typography  id="transition-modal-description"  sx={{ mt: 2 }}>
                    <span>{record.username}:</span> {record.text}
                  </Typography>
                  </div>
                );
              })}
              <CardContent sx={{ marginBottom: 3, marginLeft: -2 }}>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (e.target[0].value.length > 0) {
                      makeComment(e.target[0].value, post._id);
                      setPos("");
                    }
                  }}
                >
                  <TextField
                    value={pos}
                    onChange={(e) => setPos(e.target.value)}
                    id="standard-basic"
                    label="Comment"
                    variant="standard"
                  />
                  {/* <Send sx={{ marginTop: 2, marginLeft: 2 }} /> */}
                </form>
              </CardContent>
            </Box>
          </Fade>
        </Modal>
        {/* <Button sx={{width:120 , height:40 , marginLeft:3}} aria-describedby={id} variant="contained" onClick={handleClick}>
        Comments <KeyboardArrowDown/>
      </Button> */}
        {/* <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
         {
        commen.map((record) =>{
          return(
            <h3><span style={{fontWeight:"500"}}>{record.username}:</span> {record.text}</h3>
          )
        })
        }
      </Popover> */}
      </Card>
    </div>
  );
}

export default Post;
