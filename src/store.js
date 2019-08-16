import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loggedIn: false,
    features: {
      multipleAccounts: {
        enabled: true
      }
    },
    settings: false
  },
  getters: {
    loggedIn({ loggedIn }) {
      return loggedIn;
    },
    lastFMSettings(state) {
      return state.settings &&
        state.settings.lastfm &&
        state.settings.lastfm.enabled
        ? state.settings.lastfm
        : false;
    }
  },
  mutations: {
    signIn(state) {
      state.loggedIn = true;
    },
    signOut(state) {
      state.loggedIn = false;
    },
    loadSettings(state, settings) {
      if (settings) {
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
    }
  },
  actions: {}
});
