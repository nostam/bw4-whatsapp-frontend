import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Drawer } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { AiOutlineArrowLeft } from "react-icons/ai";

// import clsx from "clsx";
import "./profile.scss";
import "../InfoSidebar/styles.scss";
import { toggleProfileSidebar } from "../../actions/componentsActions";
import { ProfileImg } from "..";

const drawerWidth = 330;
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

export default function DrawerProfile() {
  const classes = useStyles();
  const { userInfos } = useSelector((state) => state.user);
  const { showProfileSidebar } = useSelector((state) => state.components);
  const dispatch = useDispatch();
  const handleDrawer = () => {
    dispatch(toggleProfileSidebar());
  };
  return (
    <div id="infoSidebar">
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={showProfileSidebar}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div
          className={classes.list}
          role="presentation"
          id="profile-component"
        >
          <div id="proile-top">
            <div className="d-flex row align-items-center px-2">
              <AiOutlineArrowLeft
                size={24}
                className="mx-2"
                onClick={handleDrawer}
              />
              <h5 className="mx-4">Profile</h5>
            </div>
          </div>

          <div id="img-profile">
            <ProfileImg
              img_url={userInfos.avatar}
              style={{ width: "170px", hieght: "250px", borderRadius: "50%" }}
            />
          </div>
          <div className="border-bottom">
            Your Name
            <h4>{userInfos.firstName}</h4>
          </div>

          <p>
            This is not username or pin. This name will be visible to your
            WhatsApp concatcts
          </p>

          <div>
            About
            <h4>Hey there! I am using WhatsApp.</h4>
          </div>
        </div>
      </Drawer>
    </div>
  );
}
