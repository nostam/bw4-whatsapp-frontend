import { useEffect, useRef, useState } from "react";
import socketIoClient from "socket.io-client";
const ONE_TO_ONE_MESSAGE_EVENT = "initOneToOne";
const SECKET_SERVER_URL = process.env.REACT_APP_API_URL;

const useChat = (roomId) => {
  const [messages, setMessages] = useState([]);
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = socketIoClient(SECKET_SERVER_URL, {
      query: { roomId },
    });

    socketRef.current.on(ONE_TO_ONE_MESSAGE_EVENT, (message) => {
      const incomingMessage = {
        ...message,
        currentUser: message.senderId === socketRef.current.id,
      };
    });
  });

  return [];
};

export default useChat;
