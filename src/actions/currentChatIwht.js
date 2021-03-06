import { current_chat_whith as c } from "./constants";

export const setCurrentChat = (room) => ({
  type: c.SET_CURRENT_CHAT,
  payload: room,
});

export const updateMessages = (msg) => ({
  type: c.UPDATE_MESSAGES,
  payload: msg,
});
