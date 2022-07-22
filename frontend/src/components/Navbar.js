import {
  AppBar,
  Avatar,
  Badge,
  Box,
  InputBase,
  Toolbar,
  Typography,
  styled,
  Menu,
  MenuItem,
} from "@mui/material";
import { Groups, LocationOn, Mail, Notifications } from "@mui/icons-material";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../Redux/Slices/UserData";

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

const Search = styled("div")(({ theme }) => ({
  backgroundColor: "white",
  padding: "0 10px",
  borderRadius: theme.shape.borderRadius,
  width: "40%",
}));

const Icons = styled(Box)(({ theme }) => ({
  display: "none",
  gap: "20px",
  alignItems: "center",
  [theme.breakpoints.up("sm")]: {
    display: "flex",
  },
}));

const UserBox = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "10px",
  alignItems: "center",
  [theme.breakpoints.up("sm")]: {
    display: "none",
  },
}));

function Navbar() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const user = localStorage.getItem("userDetails");
  const navigate = useNavigate();
  const userdata = useSelector((state) => state.user.value);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const handleClick = () => {
    sessionStorage.removeItem("token");
    dispatch(signIn(""));

    navigate("/login");
  };
  return (
    <AppBar position="sticky" sx={{ bgcolor: "#134059" }}>
      <StyledToolbar>
        <Link
          to="/"
          style={{
            textDecoration: "none",
            textDecorationStyle: "none",
            color: "#FFF",
          }}
        >
          <Typography
            variant="h6"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            Social
          </Typography>
        </Link>
        <Groups sx={{ display: { xs: "block", sm: "none" } }} />
        <Search>
          <InputBase placeholder="search..." />
        </Search>
        <Icons>
          <LocationOn />
          <Badge  badgeContent={4} color="error">
            <Mail onClick={()=>{navigate('/messenger')}} />
          </Badge>
          <Badge badgeContent={4} color="error">
            <Notifications />
          </Badge>
          <Avatar
            sx={{ width: "35px", height: "35px", objectFit: "cover" }}
            src={
              userdata.profilePicture
                ? PF + userdata.profilePicture
                : PF + "person/noAvatar.png"
            }
            onClick={(e) => setOpen(true)}
          />
        </Icons>
        <UserBox onClick={(e) => setOpen(true)}>
          <Avatar
            sx={{ width: "35px", height: "35px", objectFit: "cover" }}
            src={
              userdata.profilePicture
                ? PF + userdata.profilePicture
                : PF + "person/noAvatar.png"
            }
          />
          <Typography variant="span">Amal</Typography>
        </UserBox>
      </StyledToolbar>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        // anchorEl={anchorEl}
        open={open}
        onClose={(e) => setOpen(false)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem>Profile</MenuItem>
        <MenuItem>My account</MenuItem>
        <MenuItem onClick={handleClick}>Logout</MenuItem>
      </Menu>
    </AppBar>
  );
}

export default Navbar;
