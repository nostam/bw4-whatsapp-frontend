import React, { useState } from "react";
import "./chat.style.scss";
import Picker from "emoji-picker-react";
import { GrEmoji } from "react-icons/gr";
import { MdAttachFile } from "react-icons/md";
import { BsFillMicFill } from "react-icons/bs";

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
  const [message, setMessage] = useState("");

  const [showEmoji, setEmojiShow] = useState(false);
  const toggleshowEmoji = () => setEmojiShow(!showEmoji);

  return (
    <div id="chat-component">
      <EmojiPicker show={showEmoji} />
      <div id="message-wrapper">
        <GrEmoji size={30} onClick={toggleshowEmoji} />

        <label>
          <MdAttachFile size={25} style={{ margin: "0 10px" }} />

          <input accept="image/*" id="icon-button-file" type="file" />
        </label>

        <input
          type="text"
          name=""
          id="input-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message"
        />
        <BsFillMicFill size={25} />
      </div>
    </div>
  );
}
