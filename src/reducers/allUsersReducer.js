import { all_user_action_types as c } from "../actions/constants";

const initialState = {
  users: [],
  loading: false,
  error: null,
};

export default function allUsersReducer(state = initialState, action) {
  switch (action.type) {
    case c.GET_ALL_USERS:
      return { ...state, loading: true };

    case c.GET_ALL_USERS_SUCCESS:
      return { ...state, users: action.payload, loading: false };

    case c.GET_ALL_USERS_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    default:
      return state;
  }
}
