import Vue from "vue";

Vue.prototype.$bus = new Vue();

export const UI_EVENTS = {
  SETTINGS_TOGGLE: "settings.toggle",

  ERROR_DEVELOPMENT: "error.development",
  ERROR_RESTRICTED: "error.restricted",

  BUDGET: {
    OPEN_EDIT_ACCOUNT: "open.editAccount@budget",
    OPEN_DELETE_ACCOUNT: "open.deleteAccount@budget",

    OPEN_EDIT_OPERATION: "open.editOperation@budget",
    OPEN_DELETE_OPERATION: "open.deleteOperation@budget"
  },

  SHOW_CONTEXT_MENU: "showContextMenu",
  HIDE_CONTEXT_MENU: "hideContextMenu"
};
