<template>
  <v-card>
    <v-toolbar
      color="red darken-3">
      <v-toolbar-title>Last.FM</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon :href="hrefAccount" target="_blank">
        <v-icon>mdi-lastfm</v-icon>
      </v-btn>
      <v-btn icon @click="refresh">
        <v-icon>refresh</v-icon>
      </v-btn>
    </v-toolbar>
    <v-card-text
      style="height: 760px"
    >
      <v-tabs-items v-model="selectedTab">
        <v-tab-item
          v-for="tab in tabs"
          :key="tab.code"
          :value="tab.code"
        >
          <component :is="tab.component" :account="account"></component>
        </v-tab-item>
      </v-tabs-items>
    </v-card-text>
    <v-tabs
      fixed-tabs
      v-model="selectedTab"
      icons-and-text
      slider-color="white"
    >
      <v-tab
        v-for="tab in tabs"
        :key="tab.code"
        :href="`#${tab.code}`"
      >
        {{tab.name}}
        <v-icon>{{tab.icon}}</v-icon>
      </v-tab>
    </v-tabs>
  </v-card>
</template>


<script>
import RecentTracks from "./RecentTracks";

export default {
  components: {
    "recent-tracks": RecentTracks
  },
  props: ["account"],
  data() {
    return {
      selectedTab: "tab-rec",
      color: "red darken-3",
      tabs: [
        {
          name: "Recent",
          icon: "schedule",
          code: "tab-rec",
          component: "recent-tracks"
        },
        {
          name: "Favorites",
          icon: "favorite",
          code: "tab-fav",
          component: "recent-tracks"
        }
      ]
    };
  },
  computed: {
    hrefAccount() {
      return "https://www.last.fm/user/" + this.account;
    }
  }
};
</script>
