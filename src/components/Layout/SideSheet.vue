<template>
  <v-navigation-drawer
    v-model="show"
    :app="displayApp"
    fixed
    right
    disable-route-watcher
    :temporary="!displayApp"
    clipped
  >

    <v-expansion-panel>
      <v-expansion-panel-content
        v-for="feature in settings"
        v-model="feature.open"
        :key="feature.feature"
        no-action
        ripple
      >
        <div slot="header">
          <v-icon>{{feature.icon}}</v-icon>
        </div>
        <div slot="header">
          {{feature.name}}
        </div>
        <v-card>
          <v-card-text class="py-0">
            <v-form>
              <v-switch
                color="primary"
                v-model="feature.active"
                label="Enable Feature"
              />
              <v-text-field
                v-for="setting in feature.settings"
                :key="setting.setting"
                :label="setting.name"
                :value="setting.value"
                box
              >
              </v-text-field>
            </v-form>
          </v-card-text>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>

  </v-navigation-drawer>
</template>

<script>
import {UI_EVENTS} from "@/bus.js";

export default {
  data() {
    return {
      show: false
    };
  },
  computed: {
    displayApp() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return false
        case 'sm': return false
        case 'md': return false
        case 'lg': return true
        case 'xl': return true
      }
    },
    settings() {
      return [
        {
          feature: "LASTFM_API",
          name: "Last.fm Integration",
          icon: "fab fa-lastfm",
          active: true,
          open: false,
          settings: [
            {
              setting: "API_KEY",
              name: "API Key",
              type: "input", //TODO: Use constants
              value: "YOUCANTSEEME"
            }
          ]
        }
      ];
    }
  },
  mounted() {
    this.$bus.$on(UI_EVENTS.SETTINGS_TOGGLE, () => {this.show = !this.show});
  }
}
</script>
