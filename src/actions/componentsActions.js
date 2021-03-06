import { components_action_types as c } from "./constants";

export const toggleInfoSidebar = () => ({
  type: c.TOGGLE_INFOSIDEBAR,
});

export const toggleProfileSidebar = () => ({
  type: c.TOGGLE_PROFILE_SIDEBAR,
});

export const toggleNewChatSidebar = () => ({
  type: c.TOGGLE_NEW_CHAT_SIDEBAR,
});
