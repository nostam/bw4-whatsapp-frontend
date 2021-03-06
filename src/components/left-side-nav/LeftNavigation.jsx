import React from "react";
import "./styles.scss";
import { ChatItem } from "react-chat-elements";
import { BiLoaderCircle } from "react-icons/bi";
import LeftDropdownMenu from "../NavBarMenu/LeftDropdownMenu";
import NewChat from "../new-chat";
import Profile from "../profile";
import { ProfileImg } from "..";
import { useDispatch, useSelector } from "react-redux";
import { BsSearch } from "react-icons/bs";
import { setCurrentChat } from "../../actions/currentChatIwht";
import { socket } from "../chat/Chat";
export default function LeftNavigation() {
  const dispatch = useDispatch();
  // const [rooms, setRooms] = useState([]);
  const { rooms } = useSelector((state) => state.allRooms);

  // useEffect(() => {
  //   const fetchRooms = async () => {
  //     try {
  //       const res = await fetchBe.get("/chat/room");

  //       setRooms(res.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   fetchRooms();
  const { userInfos } = useSelector((state) => state.user);
  // }, []);
  const onChatClick = (room) => {
    dispatch(setCurrentChat(room));
    socket.emit("addUserToRoom", {
      userId: userInfos._id,
      roomId: room._id,
      nickname: userInfos.firsName,
    });
  };

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
      <div className="left-menu-searchbox">
        <div className="searchbox-wrapper">
          <BsSearch id="search-icon" />
          <input
            type="text"
            placeholder="Search or start new chat"
            id="search"
          />
        </div>
      </div>


      {userInfos._id &&
        rooms.map((room) => (
          <div key={room._id} onClick={() => dispatch(setCurrentChat(room))}>
            <ChatItem
              avatar={
                room.isGroup
                  ? room.avatar
                  : room.members?.filter((m) => m._id !== userInfos._id)[0]
                      .avatar
              }
              alt={"room.roomName"}
              title={
                room.isGroup
                  ? room.roomName
                  : room.members?.filter((m) => m._id !== userInfos._id)[0]
                      .firstName
              }
              subtitle={room.messages[room.messages.length - 1].text}
              date={room.messages[room.messages.length - 1].createdAt}
              unread={0}
            />
          </div>
        ))}
    </div>
  );
}
