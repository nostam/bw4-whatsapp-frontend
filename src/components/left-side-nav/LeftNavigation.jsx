import React, { useEffect, useState } from "react";
import "./styles.scss";
import { ChatItem } from "react-chat-elements";
import { BiLoaderCircle } from "react-icons/bi";
// import { CustomDropdown } from "..";
import LeftDropdownMenu from "../NavBarMenu/LeftDropdownMenu";
import NewChat from "../new-chat";
import Profile from "../profile";
import { ProfileImg } from "..";
import { useDispatch, useSelector } from "react-redux";
import { BsSearch } from "react-icons/bs";
import fetchBe from "../../client/fetchBe";
import { setCurrentChat } from "../../actions/currentChatIwht";

export default function LeftNavigation() {
  const dispatch = useDispatch();
  const [rooms, setRooms] = useState([]);
  const fetchRooms = async () => {
    try {
      const res = await fetchBe.get("/chat/room");
      setRooms(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchRooms();
  }, []);

  const { userInfos } = useSelector((state) => state.user);
  return (
    <div id="nav-left">
      <div id="nav-left-top">
        <div>
          <Profile inComp={<ProfileImg avatar={userInfos.avatar} />} />
        </div>

        <div className="d-flex row align-items-center mr-1">
          <BiLoaderCircle size={24} className="ml-4" />
          <NewChat />
          <LeftDropdownMenu />
        </div>
      </div>
      <div>
        <div className="d-flex ">
          <BsSearch id="search-icon" />
          <input
            type="text"
            placeholder="Search or start new chat"
            id="search"
          />
        </div>
      </div>

      {rooms.map((room) => (
        <div key={room._id} onClick={() => dispatch(setCurrentChat(room))}>
          <ChatItem
            avatar={room.avatar}
            alt={"room.roomName"}
            title={room.roomName}
            subtitle={"What are you doing?"}
            date={new Date()}
            unread={0}
          />
        </div>
      ))}
    </div>
  );
}
