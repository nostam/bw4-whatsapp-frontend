import React from "react";
// import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import Popover from "@material-ui/core/Popover";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { toggleInfoSidebar } from "../../actions/componentsActions";
import "./styles.scss";

// const useStyles = makeStyles((theme) => ({
// }));

export default function NavBarMenu() {
  // const classes = useStyles();
  const dispatch = useDispatch();
  function toggleSideBar() {
    dispatch(toggleInfoSidebar());
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
  const id = open ? "right-navbar-menu" : undefined;

  return (
    <div>
      <Button aria-describedby={id} color="primary" onClick={handleClick}>
        <BiDotsVerticalRounded size={24} color="white" />
      </Button>
      <Popover
        MenuList={id}
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
          <MenuItem onClick={toggleSideBar}>Group / Contact Info</MenuItem>
          <MenuItem onClick={handleClose}>Select messages</MenuItem>
          <MenuItem onClick={handleClose}>Mute notifications</MenuItem>
          <MenuItem onClick={handleClose}>Clear messages</MenuItem>
          <MenuItem onClick={handleClose}>Delete chat / Exit Group</MenuItem>
        </MenuList>
      </Popover>
    </div>
  );
}
