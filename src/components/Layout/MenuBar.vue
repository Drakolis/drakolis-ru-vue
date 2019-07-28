<template>
  <v-app-bar app clipped-left color="darkest">
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
      <template v-slot:activator="{ on }">
        <v-btn text icon v-on="on">
          <v-icon>input</v-icon>
        </v-btn>
      </template>
      <login-form :switchMethod="loginFormSwitch"/>
    </v-menu>

    <v-tooltip bottom v-if="$store.state.loggedIn">
      <template v-slot:activator="{ on }">
        <v-btn text icon v-on="on" @click="settingSwitch">
          <v-icon>settings</v-icon>
        </v-btn>
      </template>
      <span>Toggle Settings Menu</span>
    </v-tooltip>
  </v-app-bar>
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
