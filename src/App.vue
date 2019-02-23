<template>
  <v-app dark class="app-scroll-fix">
    <side-sheet v-if="$store.state.loggedIn"/>
    <menu-bar/>
    <v-content>
      <router-view/>
    </v-content>
    <notifications/>
  </v-app>
</template>

<script>
import { UI_EVENTS } from "./bus.js";
import SideSheet from "./components/Layout/SideSheet";
import MenuBar from "./components/Layout/MenuBar"
import Notifications from "./components/Layout/Notifications";

export default {
  name: "App",
  components: {
    "side-sheet": SideSheet,
    "menu-bar": MenuBar,
    notifications: Notifications
  },
  mounted() {
    //Error notify
    [UI_EVENTS.ERROR_DEVELOPMENT, UI_EVENTS.ERROR_RESTRICTED].forEach(error => {
      this.$bus.$on(error, () => {
        this.$snotify.error(
          this.$t(`${error}.info`),
          this.$t(`${error}.title`)
        );
      });
    });
  }
};
</script>

<style lang="scss">
.drakolis-font {
  font-family: "Coda", "Roboto", sans-serif !important;
}
.mono-font {
  font-family: "Roboto Mono", "Courier New", Courier, monospace !important;
}
.v-icon.fa,
.v-icon.fab,
.v-icon.fal,
.v-icon.far,
.v-icon.fas {
  display: inherit;
}
html {
  overflow: hidden;
}
.v-content__wrap {
  overflow-y: scroll;
}
.v-content {
  height: 100vh;
}
</style>
