<template>
  <v-navigation-drawer
    v-model="show"
    :app="displayApp"
    :absolute="displayApp"
    :fixed="!displayApp"
    right
    disable-route-watcher
    disable-resize-watcher
    :temporary="!displayApp"
  >
    <v-expansion-panels>
      <v-expansion-panel
        v-for="feature in settings"
        :key="feature.feature"
        v-model="feature.open"
        no-action
        ripple
      >
        <div slot="header">
          <v-icon>{{ feature.icon }}</v-icon>
        </div>
        <div slot="header">
          {{ feature.name }}
        </div>
        <v-card>
          <v-card-text class="py-0">
            <v-form>
              <v-switch
                v-model="feature.active"
                color="primary"
                label="Enable Feature"
              />
              <v-text-field
                v-for="setting in feature.settings"
                :key="setting.setting"
                :label="setting.name"
                :value="setting.value"
                filled
              />
            </v-form>
          </v-card-text>
        </v-card>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-navigation-drawer>
</template>

<script>
import { UI_EVENTS } from '@/bus';

export default {
  data() {
    return {
      show: false,
    };
  },
  computed: {
    displayApp() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          return false;
        case 'sm':
          return false;
        case 'md':
          return false;
        case 'lg':
          return true;
        case 'xl':
          return true;
        default:
          return true;
      }
    },
    settings() {
      return [
        {
          feature: 'LASTFM_API',
          name: 'Last.fm Integration',
          icon: 'fab fa-lastfm',
          active: true,
          open: false,
          settings: [
            {
              setting: 'API_KEY',
              name: 'API Key',
              type: 'input', // TODO: Use constants
              value: 'YOUCANTSEEME',
            },
          ],
        },
      ];
    },
  },
  mounted() {
    this.$bus.$on(UI_EVENTS.SETTINGS_TOGGLE, () => {
      this.show = !this.show;
    });
  },
};
</script>
