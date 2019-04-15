PW<template>
  <v-toolbar app clipped-right>
    <v-toolbar-title class="headline text-uppercase">
      <span class="drakolis-font">Drakolis</span>
      <span class="font-weight-light">.PW</span>
    </v-toolbar-title>
    <v-spacer></v-spacer>

    <v-menu
      v-model="signInVisible"
      :close-on-content-click="false"
      :nudge-width="250"
      offset-y
      bottom
      offset-x
      right
    >
      <v-btn flat icon slot="activator">
        <v-icon>input</v-icon>
      </v-btn>
      <login-form :switchMethod="loginFormSwitch"/>
    </v-menu>

    <v-tooltip bottom v-if="$store.state.loggedIn">
      <v-btn flat icon slot="activator" @click="settingSwitch">
        <v-icon>settings</v-icon>
      </v-btn>
      <span>Toggle Settings Menu</span>
    </v-tooltip>
  </v-toolbar>
</template>

<script>
import { UI_EVENTS } from "@/bus.js";
import LoginForm from "./LoginForm";

export default {
  components: {
    "login-form": LoginForm
  },
  data() {
    return {
      signInVisible: false
    };
  },
  methods: {
    settingSwitch() {
      this.$bus.$emit(UI_EVENTS.SETTINGS_TOGGLE);
    },
    loginFormSwitch() {
      this.signInVisible = !this.signInVisible;
    }
  }
};
</script>
