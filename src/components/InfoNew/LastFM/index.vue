<template>
  <v-card>
    <v-toolbar
      dense
      color="red darken-3">
      <v-toolbar-title>Last.FM</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon :href="hrefAccount" target="_blank">
        <v-icon>mdi-lastfm</v-icon>
      </v-btn>
      <v-btn icon @click="">
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
          <track-list v-if="account" :method="tab.method" :account="account"/>
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
import TrackList from "./TrackList";

export default {
  components: {
    "track-list": TrackList
  },
  props: ["account"],
  data() {
    return {
      selectedTab: "tab-recent",
      color: "red darken-3",
      tabs: [
        {
          name: "Recent",
          icon: "schedule",
          code: "tab-recent",
          method: "recent"
        },
        {
          name: "Loved",
          icon: "favorite",
          code: "tab-loved",
          method: "loved"
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
