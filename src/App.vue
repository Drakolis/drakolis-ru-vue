<template>
  <v-app dark class="app-scroll-fix">
    <v-toolbar app clipped-right>
      <v-toolbar-title class="headline text-uppercase">
        <span class="drakolis-font">Drakolis</span>
        <span class="font-weight-light">.RU</span>
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

        <v-card>
          <v-card-title>
            <h3>{{$t('global.auth.signIn')}}</h3>
          </v-card-title>
          <v-divider/>
          <v-card-text>
            <v-form>
              <v-text-field v-model="login"/>
              <v-text-field v-model="password"/>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn flat @click="singInSwitch">{{$t('global.cancel')}}</v-btn>
            <v-btn flat color="primary" @click="singInSwitch">{{$t('global.auth.signIn')}}</v-btn>
          </v-card-actions>
        </v-card>
      </v-menu>

      <v-tooltip bottom v-if="$store.state.loggedIn">
        <v-btn flat icon slot="activator" @click="settingSwitch">
          <v-icon>settings</v-icon>
        </v-btn>
        <span>Toggle Settings Menu</span>
      </v-tooltip>
    </v-toolbar>
    <drakolis-side-sheet v-if="$store.state.loggedIn"/>

    <v-content>
      <router-view/>
    </v-content>
    <drakolis-notifications/>
  </v-app>
</template>

<script>
import {UI_EVENTS} from "./bus.js";
import DrakolisSideSheet from "./components/DrakolisSideSheet";
import Notifications from "./components/Notifications";

export default {
  name: 'App',
  components: {
    "drakolis-side-sheet": DrakolisSideSheet,
    "drakolis-notifications": Notifications
  },
  data () {
    return {
      signInVisible: false,
      login: "",
      password: ""
    }
  },
  methods: {
    settingSwitch() {
      this.$bus.$emit(UI_EVENTS.SETTINGS_TOGGLE);
    },
    singInSwitch() {
      this.$api.user.signIn(this.login, this.password);
      this.signInVisible = !this.signInVisible;
    }
  },
  mounted() {
    //Error notify
    [UI_EVENTS.ERROR_DEVELOPMENT, UI_EVENTS.ERROR_RESTRICTED].forEach(
      error => {
        this.$bus.$on(error, () => {
          this.$snotify.error(this.$t(`${error}.info`), this.$t(`${error}.title`));
        })
      }
    );
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
.v-content__wrap {
  overflow-y: scroll;
}
.v-content {
  height: 100vh;
}
/*
  overflow: auto;
}
*/
</style>
