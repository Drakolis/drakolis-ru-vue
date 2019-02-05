import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loggedIn: true,
    features: {
      multipleAccounts: false
    }
  },
  mutations: {
    signIn(state) {
      state.loggedIn = true;
    },
    signOut(state) {
      state.loggedIn = false;
    }
  },
  actions: {}
});
