import React from "react";
// import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import Popover from "@material-ui/core/Popover";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { toggleProfileSidebar } from "../../actions/componentsActions";
import "./styles.scss";

// const useStyles = makeStyles((theme) => ({
// }));

export default function LeftDropdownMenu() {
  // const classes = useStyles();
  const dispatch = useDispatch();
  function toggleProfile() {
    dispatch(toggleProfileSidebar());
    handleClose();
  }
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "left-navbar-menu" : undefined;

  return (
    <div>
      <Button aria-describedby={id} color="primary" onClick={handleClick}>
        <BiDotsVerticalRounded size={24} color="white" />
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuList
          className="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>New Group</MenuItem>
          <MenuItem onClick={handleClose}>Create a room</MenuItem>
          <MenuItem onClick={toggleProfile}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>Archived</MenuItem>
          <MenuItem onClick={handleClose}>Starred</MenuItem>
          <MenuItem onClick={handleClose}>Settings</MenuItem>
          <MenuItem onClick={handleClose}>Logout</MenuItem>
        </MenuList>
      </Popover>
    </div>
  );
}
