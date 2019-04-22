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
      state.settings = settings;
    }
  },
  actions: {}
});
