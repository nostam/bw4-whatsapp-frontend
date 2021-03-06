// import { useEffect, useRef, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import socketIoClient from "socket.io-client";
// import { setAllRooms } from "../actions/allRoomsActions";

// const ONE_TO_ONE_MESSAGE_EVENT = "initOneToOne";
// const SECKET_SERVER_URL = process.env.REACT_APP_API_URL;

// const useChat = (roomId) => {
//   const [messages, setMessages] = useState([]);
//   const socketRef = useRef();
//   const { user, currentChatRoom } = useSelector((state) => state);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     socketRef.current = socketIoClient(SECKET_SERVER_URL, {
//       query: { roomId },
//     });

//     socketRef.current.emit("login", {
//       userId: user._id,
//     });

//     socketRef.current.on("roomList", (data) => dispatch(setAllRooms(data)));

//     socketRef.current.emit(ONE_TO_ONE_MESSAGE_EVENT, {
//       sender: user._id,
//       receiver: currentChatRoom._id,
//     });

//     // const incomingMessage = {
//     //   ...message,
//     //   currentUser: message.senderId === socketRef.current.id,
//     // };

//     // setMessages((messages) => [...messages, incomingMessage]);

//     // Destroys the socket reference
//     // when the connection is closed
//     return () => {
//       socketRef.current.disconnect();
//     };
//   }, [roomId, user._id, currentChatRoom._id, dispatch]);

//   const sendMessage = (messageBody) => {
//     socketRef.current.emit("sendMessageToRoom", {
//       sender: socketRef.current.id,
//       text: messageBody,
//       room: roomId,
//     });
//   };

//   return { messages, sendMessage };
// };

// expot default useChat;
