<template>
  <div>
    <v-list two-line v-if="loaded">
      <template v-for="item in data">
        <div
          :key="item.title"
        >
          <v-list-tile
            avatar
            :href="item.url"
            target="_blank"
          >
            <v-list-tile-avatar>
              <img v-if="getAvatarForEntry(item)" :src="getAvatarForEntry(item)">
              <v-icon v-else class="primary">music_video</v-icon>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>{{item.name}}</v-list-tile-title>
              <v-list-tile-sub-title>
                <span class="text--primary">
                  {{item.artist['#text']}}
                </span>
                  - {{item.album['#text']}}
              </v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <small>
                {{
                  getDateForEntry(item)
                }}
              </small>
            </v-list-tile-action>
          </v-list-tile>
          <v-divider></v-divider>
        </div>
      </template>
    </v-list>
    <breeding-rhombus-spinner
      v-else
      style="margin: auto; margin-top: 325px"
      :animation-duration="2000"
      :size="65"
      color="#FFF"
    />
  </div>
</template>

<script>
import data from "@/mock/last.json";
import { BreedingRhombusSpinner } from "epic-spinners";

export default {
  components: {
    "breeding-rhombus-spinner": BreedingRhombusSpinner
  },
  data() {
    return {
      loaded: true,
      data: data.recenttracks.track.slice(0, 10)
    };
  },
  methods: {
    getAvatarForEntry(item) {
      return item.image.find(i => i.size === "medium")["#text"];
    },
    getDateForEntry(item) {
      return item["@attr"] && item["@attr"].nowplaying
        ? "Now playing"
        : item.date["#text"];
    }
  }
};
</script>
