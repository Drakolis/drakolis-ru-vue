import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loggedIn: false,
    features: {
      multipleAccounts: false
    },
    settings: {}
  },
  mutations: {
    signIn(state) {
      state.loggedIn = true;
    },
    signOut(state) {
      state.loggedIn = false;
    },
    loadSettings(state, settings) {
      const keys = settings.map(s => s.key);
      const newSettings = {};
      keys.forEach(k => {
        const setting = settings.find(s => s.key === k);
        newSettings[k] =
          setting.datetime !== null
            ? setting.datetime
            : setting.boolean !== null
              ? setting.boolean
              : setting.float !== null
                ? setting.float
                : setting.integer !== null
                  ? setting.integer
                  : setting.string !== null
                    ? setting.string
                    : null;
      });
      state.settings = newSettings;
    }
  },
  actions: {}
});
