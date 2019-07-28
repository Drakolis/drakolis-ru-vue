<template>
  <v-app class="app-scroll-fix">
    <div v-if="loaded">
      <side-sheet v-if="$store.state.loggedIn" />
      <menu-bar />
      <v-content>
        <router-view />
      </v-content>
    </div>
    <loader v-else />
    <notifications />
  </v-app>
</template>

<script>
import { UI_EVENTS } from "./bus.js";
import SideSheet from "./components/Layout/SideSheet";
import MenuBar from "./components/Layout/MenuBar";
import Notifications from "./components/Layout/Notifications";
import Loader from "./views/Loader";

export default {
  data() {
    return {
      loaded: false
    };
  },
  name: "App",
  components: {
    "side-sheet": SideSheet,
    "menu-bar": MenuBar,
    notifications: Notifications,
    loader: Loader
  },
  mounted() {
    Promise.all([
      this.$api.settings.loadAppSettings().then(data => {
        this.$store.commit("loadSettings", data);
      })
    ]).then(() => {
      this.loaded = true;
    });
    //Error notify
    [
      UI_EVENTS.ERROR_DEVELOPMENT,
      UI_EVENTS.ERROR_RESTRICTED,
      UI_EVENTS.ERROR_EXTERNAL_SERVICE_FAIL,
      UI_EVENTS.ERROR_CONFIG
    ].forEach(error => {
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

<style lang="stylus">
.drakolis-font {
  font-family: "Coda", "Roboto", sans-serif !important;
}
.v-application .display-4.drakolis-font {
  font-family: "Coda", "Roboto", sans-serif !important;
}
.v-application .display-3.drakolis-font {
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
