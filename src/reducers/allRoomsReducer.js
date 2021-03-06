import { all_rooms_action_types as c } from "../actions/constants";

const initialState = {
  rooms: [],
  loading: false,
  error: null,
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case c.UPDATE_ALL_ROOMS:
      return { ...state, rooms: action.payload };

    default:
      return state;
  }
}
