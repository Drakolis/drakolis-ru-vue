<template>
  <v-app dark class="app-scroll-fix">
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span class="drakolis-font">Drakolis</span>
        <span class="font-weight-light">.RU</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-tooltip bottom>
        <v-btn flat icon slot="activator">
          <v-icon>input</v-icon>
        </v-btn>
        <span>Dragons Only!</span>
      </v-tooltip>
      <v-tooltip bottom v-if="$store.state.loggedIn">
        <v-btn flat icon slot="activator" @click="openSettings">
          <v-icon>settings</v-icon>
        </v-btn>
        <span>Toggle Settings Menu</span>
      </v-tooltip>
    </v-toolbar>

    <v-content>
      <router-view/>
      <drakolis-side-sheet/>
    </v-content>
  </v-app>
</template>

<script>
import {UI_EVENTS} from "./bus.js";
import DrakolisSideSheet from "./components/DrakolisSideSheet";

export default {
  name: 'App',
  components: {
    "drakolis-side-sheet": DrakolisSideSheet
  },
  data () {
    return {
      //
    }
  },
  methods: {
    openSettings() {
      this.$bus.$emit(UI_EVENTS.SETTINGS_TOGGLE);
    }
  }
}
</script>

<style lang="scss">
.drakolis-font {
  font-family: 'Coda','Roboto',sans-serif !important;
}
.mono-font {
  font-family: 'Roboto Mono','Courier New', Courier, monospace !important;
}
.v-icon.fa, .v-icon.fab, .v-icon.fal, .v-icon.far, .v-icon.fas {
  display: inherit;
}
html {
  overflow: hidden;
}
.v-content {
  height: 100vh;
}
.v-content__wrap {
  overflow-y: scroll;
}
</style>
