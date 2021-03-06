import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
// import MoreVertIcon from "@material-ui/icons/MoreVert";
import { BiDotsVerticalRounded } from "react-icons/bi";
import React from "react";
import { Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import Profile from "./profile/Profile";
import { BsSearch } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { setCurrentChat } from "../actions/currentChatIwht";
import { toggleNewChatSidebar } from "../actions/componentsActions";

export const ContinueWith = ({ title, className, loginWith }) => {
  return (
    <div className="col-12 my-1">
      <a className={className} href={loginWith}>
        <i className="fab fa-facebook"></i>
        {title}
      </a>
    </div>
  );
};

export const DangerAlert = ({ messsage }) => (
  <div>
    <Alert variant="danger">{messsage}</Alert>
  </div>
);

export const WhatsAppLogo = (maxWidth = "25px") => (
  <div style={{ display: "flex", justifyContent: "center" }}>
    <Link to="/">
      <img
        style={{ maxWidth: maxWidth }}
        src={process.env.PUBLIC_URL + "whatsap.png"}
        alt="Spotify Logo White"
      />
    </Link>
  </div>
);

export const CustomDropdown = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div style={{ display: "inline", padding: "0" }}>
      <IconButton
        aria-label="more"
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        style={{ padding: 0, margin: 0 }}
      >
        <BiDotsVerticalRounded size={25} color="white" />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <Profile />
        </MenuItem>
      </Menu>
    </div>
  );
};

export const ProfileImg = ({ avatar, style }) => (
  <img src={avatar} alt="user-img" className="user-image" style={style} />
);

export const WhastAppBanner = () => (
  <div className="landing-header">
    <Link to="/">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="39"
        height="39"
        viewBox="0 0 39 39"
      >
        <path
          fill="#00E676"
          d="M10.7 32.8l.6.3c2.5 1.5 5.3 2.2 8.1 2.2 8.8 0 16-7.2 16-16 0-4.2-1.7-8.3-4.7-11.3s-7-4.7-11.3-4.7c-8.8 0-16 7.2-15.9 16.1 0 3 .9 5.9 2.4 8.4l.4.6-1.6 5.9 6-1.5z"
        ></path>
        <path
          fill="#FFF"
          d="M32.4 6.4C29 2.9 24.3 1 19.5 1 9.3 1 1.1 9.3 1.2 19.4c0 3.2.9 6.3 2.4 9.1L1 38l9.7-2.5c2.7 1.5 5.7 2.2 8.7 2.2 10.1 0 18.3-8.3 18.3-18.4 0-4.9-1.9-9.5-5.3-12.9zM19.5 34.6c-2.7 0-5.4-.7-7.7-2.1l-.6-.3-5.8 1.5L6.9 28l-.4-.6c-4.4-7.1-2.3-16.5 4.9-20.9s16.5-2.3 20.9 4.9 2.3 16.5-4.9 20.9c-2.3 1.5-5.1 2.3-7.9 2.3zm8.8-11.1l-1.1-.5s-1.6-.7-2.6-1.2c-.1 0-.2-.1-.3-.1-.3 0-.5.1-.7.2 0 0-.1.1-1.5 1.7-.1.2-.3.3-.5.3h-.1c-.1 0-.3-.1-.4-.2l-.5-.2c-1.1-.5-2.1-1.1-2.9-1.9-.2-.2-.5-.4-.7-.6-.7-.7-1.4-1.5-1.9-2.4l-.1-.2c-.1-.1-.1-.2-.2-.4 0-.2 0-.4.1-.5 0 0 .4-.5.7-.8.2-.2.3-.5.5-.7.2-.3.3-.7.2-1-.1-.5-1.3-3.2-1.6-3.8-.2-.3-.4-.4-.7-.5h-1.1c-.2 0-.4.1-.6.1l-.1.1c-.2.1-.4.3-.6.4-.2.2-.3.4-.5.6-.7.9-1.1 2-1.1 3.1 0 .8.2 1.6.5 2.3l.1.3c.9 1.9 2.1 3.6 3.7 5.1l.4.4c.3.3.6.5.8.8 2.1 1.8 4.5 3.1 7.2 3.8.3.1.7.1 1 .2h1c.5 0 1.1-.2 1.5-.4.3-.2.5-.2.7-.4l.2-.2c.2-.2.4-.3.6-.5s.4-.4.5-.6c.2-.4.3-.9.4-1.4v-.7s-.1-.1-.3-.2z"
        ></path>
      </svg>
      <span className="landing-headerTitle"> WHATSAPP WEB </span>
    </Link>
  </div>
);

export const SingleUser = ({ user }) => {
  const dispatch = useDispatch();
  return (
    <div
      className="d-flex single-user"
      onClick={() => {
        dispatch(setCurrentChat(user));
        dispatch(toggleNewChatSidebar());
      }}
    >
      <div className="mx-3 my-1 pt-2">
        <ProfileImg avatar={user.avatar} />
      </div>
      <div
        style={{
          borderTop: "1px solid #90918e",
          width: "70%",
          paddingTop: "10px",
        }}
      >
        <h6>{user.firstName}</h6>
        <small>{user.about}</small>
      </div>
    </div>
  );
};

export const Input = ({ placeholder }) => (
  <div
    className="d-flex"
    style={{
      position: "relative",
      margin: "5px 10px 5px 0px",
      borderRadius: "15px",
      width: "300px",
      backgroundColor: "#323739",
      color: "white",
      paddingLeft: "40px",
      border: "none",
      height: "35px",
    }}
  >
    <BsSearch
      className="search-icon"
      style={{ top: "15px", left: "35px", zIndex: 10 }}
    />
    <input type="text" placeholder={placeholder} className="search" />
  </div>
);
