import Vue from "vue";

Vue.prototype.$bus = new Vue();

export const UI_EVENTS = {
  SETTINGS_TOGGLE: "settings.toggle",

  ERROR_DEVELOPMENT: "error.development",
  ERROR_RESTRICTED: "error.restricted",

  SHOW_CONTEXT_MENU: "showContextMenu",
  HIDE_CONTEXT_MENU: "hideContextMenu"
};
