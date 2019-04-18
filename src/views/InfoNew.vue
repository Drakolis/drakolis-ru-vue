<template>
  <v-container grid-list-xl>
    <v-layout
      column
    >
      <v-flex>
        <div class="text-xs-center">
          <p :class="'drakolis-font ' + nameSizeClass">{{myData.name}}</p>
          <small :class="'font-weight-light ' + titleSizeClass">{{myData.title}}</small>
        </div>
      </v-flex>

      <v-flex xs12>
        <v-divider></v-divider>
      </v-flex>

      <v-flex>
        <v-layout wrap>
          <v-flex xs12 sm4>
            <v-layout column>
              <v-flex xs12>
                <v-card class="elevation-5">
                  <v-img
                    :src="myData.photoUrl"
                    aspect-ratio="1"
                  ></v-img>
                </v-card>
              </v-flex>
              <v-flex xs12>
                <v-card class="elevation-5">
                  <v-card-title primary-title class="pb-0">
                    <span class="title">About Me</span>
                  </v-card-title>
                  <v-card-text>
                    <v-list>
                        <v-list-tile>
                          <v-list-tile-action>
                            <v-icon>event</v-icon>
                          </v-list-tile-action>
                          <v-list-tile-content>
                            <v-list-tile-title>{{myData.dateOfBirth}}</v-list-tile-title>
                          </v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile>
                          <v-list-tile-action>
                            <v-icon>location_on</v-icon>
                          </v-list-tile-action>
                          <v-list-tile-content>
                            <v-list-tile-title>{{myData.location}}</v-list-tile-title>
                          </v-list-tile-content>
                        </v-list-tile>
                    </v-list>
                  </v-card-text>
                </v-card>
              </v-flex>
            </v-layout>
          </v-flex>

          <v-flex xs12 sm4>
            <v-card class="elevation-5">
              <v-card-title primary-title class="pb-0">
                <span class="title">Languages I Speak</span>
              </v-card-title>
              <v-card-text>
                <v-list>
                  <v-list-tile v-for="lang in myData.languages" :key="lang[0]">
                      <v-list-tile-action>
                        <drakolis-emoji :emoji="lang[1]"></drakolis-emoji>
                      </v-list-tile-action>
                      <v-list-tile-content>
                        <v-list-tile-title>{{lang[0]}}</v-list-tile-title>
                        <v-list-tile-sub-title>{{lang[2]}}</v-list-tile-sub-title>
                      </v-list-tile-content>
                  </v-list-tile>
                </v-list>
              </v-card-text>
              <v-card-title primary-title class="py-0">
                <span class="title">I Have Experience In</span>
              </v-card-title>
              <v-card-text>
                <v-list>
                  <v-list-group
                    v-for="item in myData.skills"
                    v-model="item[3]"
                    :key="item[0]"
                    no-action
                  >
                    <v-list-tile slot="activator">
                      <v-list-tile-content>
                        <v-list-tile-title>{{ item[0] }}</v-list-tile-title>
                      </v-list-tile-content>
                    </v-list-tile>

                    <v-list-tile
                      v-for="subItem in item[2]"
                      :key="subItem"
                    >
                      <v-list-tile-content>
                        <v-list-tile-title>{{ subItem }}</v-list-tile-title>
                      </v-list-tile-content>
                    </v-list-tile>
                  </v-list-group>
                </v-list>
              </v-card-text>
            </v-card>
          </v-flex>

          <v-flex xs12 sm4>
            <v-card class="elevation-5">
              <v-card-title primary-title class="pb-0">
                <span class="title">I Like</span>
              </v-card-title>
              <v-card-text>
                <v-list>
                  <v-list-tile v-for="like in myData.likes" :key="like[0]">
                      <v-list-tile-action>
                        <drakolis-emoji :emoji="like[1]"></drakolis-emoji>
                      </v-list-tile-action>
                      <v-list-tile-content>
                        <v-list-tile-title>{{like[0]}}</v-list-tile-title>
                      </v-list-tile-content>
                  </v-list-tile>
                </v-list>
              </v-card-text>
              <v-card-title primary-title class="py-0">
                <span class="title">I Dislike</span>
              </v-card-title>
              <v-card-text>
                <v-list>
                  <v-list-tile v-for="dislike in myData.dislikes" :key="dislike[0]">
                      <v-list-tile-action>
                        <drakolis-emoji :emoji="dislike[1]"></drakolis-emoji>
                      </v-list-tile-action>
                      <v-list-tile-content>
                        <v-list-tile-title>{{dislike[0]}}</v-list-tile-title>
                      </v-list-tile-content>
                  </v-list-tile>
                </v-list>
              </v-card-text>
            </v-card>
          </v-flex>

        </v-layout>
      </v-flex>

      <v-flex xs12>
        <v-divider></v-divider>
      </v-flex>

      <v-flex>
        <v-layout wrap justify-space-around>
          <template
            v-for="contact in myData.contacts"
          >
            <v-tooltip bottom :key="contact.type">
              <v-btn fab large
                slot="activator"
                @click="getContactOnClickAction(contact)"
                :color="getContactColor(contact.type)"
              ><v-icon>{{getContactIcon(contact.type)}}</v-icon>
              </v-btn>
              <span style="text-transform: capitalize;" class="subheading">{{getContactTooltip(contact.type)}}</span>
            </v-tooltip>
          </template>
        </v-layout>
      </v-flex>

      <v-flex xs12>
        <v-divider></v-divider>
      </v-flex>

      <v-flex xs12>
        <v-flex xs12 sm6>
          <last-fm :account="myData && myData.apis && myData.apis.find(i => i.type === 'lastfm').param"></last-fm>
        </v-flex>
      </v-flex>

      <v-flex>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { API_HOST } from "../config/index";
import { BreedingRhombusSpinner } from "epic-spinners";
import TimelineItemExpandable from "../components/InfoNew/TimelineItemExpandable";
import DrakolisEmoji from "../components/DrakolisEmoji";
import LastFM from "@/components/InfoNew/LastFM";

const getFamilyDataURL = API_HOST + "/family";
export default {
  components: {
    "breeding-rhombus-spinner": BreedingRhombusSpinner,
    "expandable-timeline-item": TimelineItemExpandable,
    "drakolis-emoji": DrakolisEmoji,
    "last-fm": LastFM
  },
  data() {
    return {
      myData: {}
    };
  },
  computed: {
    nameSizeClass() {
      return [/*'sm',*/ "xs"].includes(this.$vuetify.breakpoint.name)
        ? "my-3 display-3"
        : "my-4 display-4";
    },
    titleSizeClass() {
      return [/*'sm',*/ "xs"].includes(this.$vuetify.breakpoint.name)
        ? "display-2"
        : "display-1";
    }
  },
  methods: {
    getContactOnClickAction({ url, type }) {
      if (url.indexOf("http") > -1) {
        window.open(url, "_blank");
        window.focus();
      } else {
        window.location.href = url;
      }
    },
    getContactIcon(type) {
      if (type === "mail") return `fas fa-envelope`;
      return `fab fa-${type}`;
    },
    getContactColor(type) {
      switch (type) {
        case "vk":
          return "#4a76a8";
        case "facebook":
          return "#4267b2";
        case "twitter":
          return "#1da1f2";
        case "deviantart":
          return "#475c4d";
        case "linkedin":
          return "#0073b1";
        case "telegram":
          return "#5682a3";
        case "skype":
          return "#1686d9";
        case "github":
          return "#24292e";
        case "whatsapp":
          return "#1ebea5";
        case "mail":
          return "#00796B";
        case "instagramm":
          return "#303030";
        case "discord":
          return "#7289da";
        default:
          return "secondary";
      }
    },
    getContactTooltip(type) {
      switch (type) {
        case "linkedin":
          return "Linked in";
        case "vk":
          return "VK";
        case "github":
          return "GitHub";
        default:
          return type;
      }
    }
  },
  mounted() {
    this.myData = require("../mock/drakolis");
  }
};
</script>
