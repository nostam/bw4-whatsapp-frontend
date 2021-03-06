import fetchBe from "../client/fetchBe";
import { all_user_action_types as c } from "./constants";

export const getAllUsers = () => ({
  type: c.GET_ALL_USERS,
});

export const getAllUsersSuccess = (users) => ({
  type: c.GET_ALL_USERS_SUCCESS,
  payload: users,
});

export const getAllUsersFailure = () => ({
  type: c.GET_ALL_USERS_FAILURE,
});

export function fetchAllUsers() {
  return async (dispatch) => {
    dispatch(getAllUsers());
    try {
      const res = await fetchBe.get("/users");
      dispatch(getAllUsersSuccess(res.data));
    } catch (error) {
      dispatch(getAllUsersFailure(error));
    }
  };
}
