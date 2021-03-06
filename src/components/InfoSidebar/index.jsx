import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RiPencilFill, RiDeleteBin7Fill } from "react-icons/ri";
import { IoMdThumbsDown, IoMdExit } from "react-icons/io";
import { Drawer, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { MdClose, MdBlock } from "react-icons/md";
import "./styles.scss";
import { toggleInfoSidebar } from "../../actions/componentsActions";
import dayjs from "dayjs";
const drawerWidth = 420;
const mdGrey = "#2a2f32";
// const mdDark = "#131c21";
const mdBlack = "#0c1317";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  },
  title: {
    flexGrow: 1,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: mdBlack,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    fontSize: "1rem",
    color: "white",
    backgroundColor: mdGrey,
    // padding: theme.spacing(0.7, 1),
    padding: "0.5rem 1rem",
    // necessary for content to be below app bar
    // ...theme.mixins.toolbar,
    justifyContent: "flex-start",
    height: "60px",
    width: "100%",
    position: "fixed",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  },
}));

export default function InfoSidebar() {
  const classes = useStyles();
  // const theme = useTheme();
  const { showInfoSidebar } = useSelector((state) => state.components);
  const { userInfos } = useSelector((state) => state.user);
  const {
    createdAt,
    roomName,
    avatar,
    email,
    isGroup,
    description,
    members,
  } = useSelector((state) => state.currentChatRoom);
  const dispatch = useDispatch();
  const handleDrawer = () => {
    dispatch(toggleInfoSidebar());
  };
  return (
    <div id="infoSidebar">
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="right"
        open={showInfoSidebar}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        {members.length !== 0 && (
          <>
            <div className={classes.drawerHeader}>
              <IconButton onClick={handleDrawer}>
                <MdClose size={24} color="white" />
              </IconButton>
              {isGroup ? "Group Info" : "Contact Info"}
            </div>

            <div className="info">
              <div className="avatar">
                <img
                  alt="group avtar"
                  src={
                    isGroup
                      ? avatar
                      : members?.filter((e) => e._id !== userInfos._id)[0]
                          .avatar
                  }
                  style={{ backgroundColor: "white" }}
                />
              </div>
              <div className="sidebar-info">
                <div className="sidebar-info-row1">
                  <h5>
                    {isGroup
                      ? roomName
                      : members?.filter((e) => e._id !== userInfos._id)[0]
                          .firstName}
                  </h5>
                  <RiPencilFill size={24} color="grey" />
                </div>
                {isGroup && (
                  <div className="sidebar-info-row2">
                    <span>
                      {`Created date ${dayjs(createdAt).format("DD/MM/YYYY")} at
                      ${dayjs(createdAt).format("HH:mm")}`}
                    </span>
                  </div>
                )}
              </div>
            </div>
            {isGroup && (
              <div className="description">
                <h6>Description</h6>
                <div className="description-row">
                  <p>{description ? description : "Add group description"}</p>
                  <RiPencilFill size={24} color="grey" />
                </div>
              </div>
            )}
            <div className="media">
              <h6>Media, Links and Docs</h6>
            </div>
            <div className="mute-notifications">
              <h5>Mute Notifications</h5>
            </div>
            <div className="star-messages">
              <h5>Starred Messages</h5>
            </div>
            <div className="contacts-info">
              <h6>About and email</h6>
              <h5>
                {members?.filter((e) => e._id !== userInfos._id)[0].description}
              </h5>
              <hr />
              <h5 className="px-3 mx-3">
                {members?.filter((e) => e._id !== userInfos._id)[0].email}
              </h5>
            </div>
            {isGroup && (
              <div className="participants">
                <h6> {members.length} participants</h6>
                {members.map((m) => (
                  <div
                    key={m._id}
                    className="row d-flex my-3 mx-2 w-100  align-items-center"
                  >
                    <img
                      src={m.avatar}
                      style={{
                        borderRadius: "50%",
                        margin: "auto 2rem",
                        width: "40px",
                      }}
                    />
                    <h5>{m.firstName}</h5>
                  </div>
                ))}
              </div>
            )}
            {/* isGroup === false  groups in common*/}
            {isGroup ? (
              <div className="exit">
                <IoMdExit size={24} color="#ef697a" />
                <span>Exit Group</span>
              </div>
            ) : (
              <div className="exit">
                <MdBlock size={24} color="#ef697a" />
                <span>Block </span>
              </div>
            )}
            <div className="exit">
              <IoMdThumbsDown size={24} color="#ef697a" />
              <span>Report {isGroup ? "Group" : "Chat"}</span>
            </div>
            {!isGroup && (
              <div className="exit">
                <RiDeleteBin7Fill size={24} color="#ef697a" />
                <span>Delete Chat</span>
              </div>
            )}
          </>
        )}
      </Drawer>
    </div>
  );
}
