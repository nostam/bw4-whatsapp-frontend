import React from "react";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import NavBarMenu from "../NavBarMenu";
import "./styles.scss";
import { BsSearch } from "react-icons/bs";
import { ProfileImg } from "..";

dayjs.extend(relativeTime);
const NavBar = () => {
  const { updatedAt, roomName, avatar, isGroup, members } = useSelector(
    (state) => state.currentChatRoom
  );
  const { userInfos } = useSelector((state) => state.user);
  const { showInfoSidebar } = useSelector((state) => state.components);

  return (
    <div id="navigation">
      <div className="mx-3">
        {members.length !== 0 && (
          <>
            <ProfileImg
              avatar={
                isGroup
                  ? avatar
                  : members?.filter((e) => e._id !== userInfos._id)[0].avatar
              }
              style={{ display: roomName ? "inline-block" : "none" }}
            />
            <div id="nav-userInfo" className="mr-1">
              <h6>
                {isGroup
                  ? roomName
                  : members?.filter((e) => e._id !== userInfos._id)[0]
                      .firstName}
              </h6>
              <small>{dayjs(updatedAt).fromNow()}</small>
            </div>
          </>
        )}
      </div>

      <div className={showInfoSidebar === true ? "three" : "two"}>
        {/* <div className="three"> */}
        {roomName && (
          <>
            <BsSearch size={17} />
            <NavBarMenu />
          </>
        )}
      </div>
    </div>
  );
};

export default NavBar;
