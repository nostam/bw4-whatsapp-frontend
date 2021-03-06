import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./chat.style.scss";
import Picker from "emoji-picker-react";
import { GrEmoji } from "react-icons/gr";
import { MdAttachFile, MdClear } from "react-icons/md";
import { BsFillMicFill } from "react-icons/bs";
import { MessageBox } from "react-chat-elements";

import io from "socket.io-client";
import { setAllRooms } from "../../actions/allRoomsActions";
import { updateMessages } from "../../actions/currentChatIwht";
// import { setAllRooms } from "../../actions/allRoomsActions";

// import useChat from "../../hooks/useChat";

const connOpt = {
  transports: ["websocket", "polling"],
};

export let socket = io(process.env.REACT_APP_API_URL, connOpt);

const EmojiPicker = ({ show }) => {
  return show ? (
    <div id="emoji-picker-react">
      <Picker />
    </div>
  ) : (
    <></>
  );
};

export default function Chat() {
  const [newMessage, setNewMessage] = useState("");
  const [showEmoji, setEmojiShow] = useState(false);

  const toggleshowEmoji = () => setEmojiShow(!showEmoji);
  const { components, currentChatRoom, user } = useSelector((state) => state);

  const dispatch = useDispatch();

  const { messages } = currentChatRoom;

  const userId = user.userInfos._id;

  useEffect(() => {
    socket.emit("login", { userId: userId });

    // Getting all roon that user subscribed
    socket.on("roomList", (roomlist) => dispatch(setAllRooms(roomlist)));

    socket.on("connect", () => {
      console.log("socket.connected", socket.connected);
    });

    socket.on("sendMsgBack", (data) => dispatch(updateMessages(data)));

    return () => socket.removeAllListeners();
  }, [dispatch, userId]);

  const sendMessage = (e) => {
    e.preventDefault();

    if (newMessage !== "") {
      // SEND msg ro selected room
      socket.emit("sendMessageToRoom", {
        roomId: currentChatRoom._id,
        text: newMessage,
        senderId: userId,
      });

      setNewMessage(""); //resets the message text
    }
  };

  return (
    <div id="chat-component">
      <div id="message-box">
        {messages.map((msg, idx) => (
          <MessageBox
            key={idx}
            position={msg.sender === userId ? "left" : "right"}
            type={"text"}
            text={msg.text}
          />
        ))}
      </div>

      <EmojiPicker show={showEmoji} />
      <div
        id="message-wrapper"
        style={{
          width: components.showInfoSidebar ? `calc(100% - 740px)` : "auto",
        }}
      >
        {showEmoji ? (
          <MdClear onClick={toggleshowEmoji} size={35} />
        ) : (
          <GrEmoji size={30} onClick={toggleshowEmoji} />
        )}
        <MdAttachFile size={25} style={{ margin: "0 10px" }} />
        <label>
          <input accept="image/*" id="icon-button-file" type="file" />
        </label>

        <form className="w-100" onSubmit={(e) => sendMessage(e)}>
          <input
            id="input-message"
            type="text"
            name=""
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message"
          />
        </form>

        <BsFillMicFill size={25} style={{ margin: "0 10px" }} />
      </div>
    </div>
  );
}
