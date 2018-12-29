<template>
  <v-container grid-list-xl>
    <v-layout
      column
    >
      <v-flex>
        <div class="text-xs-center">
          <p class="drakolis-font display-4 my-4">{{myData.name}}</p>
          <small class="display-2 font-weight-light">{{myData.title}}</small>
        </div>
      </v-flex>

      <v-flex xs12>
        <v-divider></v-divider>
      </v-flex>

      <v-flex>
        <v-layout>
          <v-flex xs4>
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

          <v-flex xs4>
            <v-card class="elevation-5">
              <v-card-title primary-title class="pb-0">
                <span class="title">Languages I Speak</span>
              </v-card-title>
              <v-card-text>
                <v-list>
                  <v-list-tile v-for="lang in myData.languages" :key="lang[0]">
                      <v-list-tile-action v-html="emojify(lang[1])">
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

          <v-flex xs4>
            <v-card class="elevation-5 teal darken-1">
              <v-card-title primary-title class="pb-0">
                <span class="title">I Like</span>
              </v-card-title>
              <v-card-text>
                <v-list class="teal darken-1">
                  <v-list-tile v-for="like in myData.likes" :key="like[0]">
                      <v-list-tile-action v-html="emojify(like[1])">
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
                <v-list class="teal darken-1">
                  <v-list-tile v-for="dislike in myData.dislikes" :key="dislike[0]">
                      <v-list-tile-action v-html="emojify(dislike[1])">
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

      <v-flex>
        <v-timeline
          align-top
        >
          <TimelineItemExpandable v-for="entry in myData.timeline" :entry="entry" :key="entry.name"/>
        </v-timeline>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import {API_HOST} from "../config/index";
import { BreedingRhombusSpinner } from 'epic-spinners'
import emojijs from "emoji-js";
import TimelineItemExpandable from "../components/InfoNew/TimelineItemExpandable"

const emoji = new emojijs();
emoji.img_set = 'google';
emoji.allow_native = false;
emoji.supports_css = false;
emoji.img_sets.google.path = 'https://unpkg.com/emoji-datasource-google@4.0.4/img/google/64/';
emoji.img_sets.google.sheet = 'https://unpkg.com/emoji-datasource-google@4.0.4/img/google/sheets-256/64.png';

const getFamilyDataURL = API_HOST + "/family";
export default {
  components: {
    "breeding-rhombus-spinner": BreedingRhombusSpinner,
    TimelineItemExpandable
  },
  data() {
    return {
      myData: {}
    }
  },
  methods: {
    showCV(person) {
    },
    getContactOnClickAction({url, type}) {
      if (url.indexOf('http')>-1){
          window.open(url, '_blank');
          window.focus();
      } else {
          window.location.href = url;
      }
    },
    getContactIcon(type) {
      if (type === 'mail')
        return `fas fa-envelope`;
      return `fab fa-${type}`;
    },
    getContactColor(type) {
      switch (type) {
        case "vk":
          return '#4a76a8';
        case "facebook":
          return '#4267b2';
        case "twitter":
          return '#1da1f2';
        case "deviantart":
          return '#475c4d';
        case "telegram":
          return '#5682a3';
        case "skype":
          return '#1686d9';
        case "github":
          return '#24292e';
        case "whatsapp":
          return '#1ebea5';
        case "mail":
          return '#00796B';
        case "instagramm":
          return '#303030';
        case "discord":
          return "#7289da";
        default:
          return 'secondary';
      }
    },
    getContactTooltip(type) {
        switch (type) {
            case "vk":
                return 'VK';
            case "github":
                return 'GitHub';
            default:
                return type;
        }
    },
    emojify(string) {
      return emoji.replace_colons(string)
    }
  },
  mounted() {
    this.myData = require('../mock/drakolis');
  }
}
</script>

<style>
.emoji {
  width: 32px;
  height: 32px;
  display: block;
}
</style>
