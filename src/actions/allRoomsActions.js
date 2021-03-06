import { all_rooms_action_types as c } from "./constants";

export const setAllRooms = (rooms) => ({
  type: c.UPDATE_ALL_ROOMS,
  payload: rooms,
});
