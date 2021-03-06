import { current_chat_whith as c } from "../actions/constants";

const initialState = {
  loading: false,
  error: null,
  avatar: "",
  admins: [],
  members: [],
  roomName: "",
  _id: "",
  isGroup: false,
  messages: [],
  updatedAt: "",
  createdAt: "",
};

export default function currentChatReducers(state = initialState, action) {
  switch (action.type) {
    case c.SET_CURRENT_CHAT:
      return { ...action.payload };

    case c.UPDATE_MESSAGES:
      return { ...state, messages: [...state.messages, action.payload] };

    default:
      return state;
  }
}
