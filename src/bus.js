import Vue from "vue";

Vue.prototype.$bus = new Vue();

export const UI_EVENTS = {
  UPDATE_ROOM_USERS: "updateRoomUsers",
  SHOW_PROFILE_DIALOG: "showProfileDialog",
  SHOW_CONTEXT_MENU: "showContextMenu",
  HIDE_CONTEXT_MENU: "hideContextMenu"
};
