import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import { ProfileImg } from "..";
import { useSelector } from "react-redux";
import { AiOutlineArrowLeft } from "react-icons/ai";
import "./profile.scss";

const useStyles = makeStyles({
  list: {
    width: 330,
  },
  fullList: {
    width: "auto",
  },
});

export default function Profile({ inComp = "Profile" }) {
  const classes = useStyles();
  const [state, setState] = React.useState(false);

  const { userInfos } = useSelector((state) => state.user);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState(open);
  };

  return (
    <div>
      <>
        <div onClick={toggleDrawer(true)}>{inComp}</div>
        <Drawer
          anchstyle={{ display: "none" }}
          or={"left"}
          open={state}
          onClose={toggleDrawer(false)}
        >
          <div
            className={clsx(classes.list)}
            role="presentation"
            id="profile-component"
          >
            <div id="proile-top">
              <h5 onClick={toggleDrawer(false)}>
                <AiOutlineArrowLeft size={20} /> Profile
              </h5>
            </div>

            <div id="img-profile">
              <ProfileImg
                avatar={userInfos.avatar}
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
              <h6>{userInfos.about}</h6>
            </div>
          </div>
        </Drawer>
      </>
    </div>
  );
}
