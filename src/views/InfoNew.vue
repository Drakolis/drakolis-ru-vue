<template>
  <v-container>
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
        <v-divider class="my-4"></v-divider>
      </v-flex>

      <v-flex>
        <v-layout>
          <v-flex xs3 class="mx-2">
            <v-card class="elevation-5">
              <v-img
                :src="myData.photoUrl"
                aspect-ratio="1"
              ></v-img>
            </v-card>
          </v-flex>

          <v-flex xs3 class="mx-2">
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
              <v-card-title primary-title class="py-0">
                <span class="title">Languages I Speak</span>
              </v-card-title>
              <v-card-text>
                <v-list>
                  <v-list-tile v-for="lang in myData.languages" :key="lang[0]">
                      <v-list-tile-action v-html="emojify(lang[1])">
                      </v-list-tile-action>
                      <!-- <v-list-tile-avatar>
                        <v-avatar>
                          <img :src="lang[1]" alt="langicon">
                        </v-avatar>
                      </v-list-tile-avatar> -->
                      <v-list-tile-content>
                        <v-list-tile-title>{{lang[0]}}</v-list-tile-title>
                        <v-list-tile-sub-title>{{lang[2]}}</v-list-tile-sub-title>
                      </v-list-tile-content>
                  </v-list-tile>
                </v-list>
              </v-card-text>
            </v-card>
          </v-flex>

          <v-flex xs3 class="mx-2">
            <v-card class="elevation-5 teal darken-1">
              <v-card-title primary-title class="pb-0">
                <span class="title">My Likes</span>
              </v-card-title>
              <v-card-text>
              </v-card-text>
              <v-card-title primary-title class="py-0">
                <span class="title">My Dislikes</span>
              </v-card-title>
              <v-card-text>
              </v-card-text>
              <v-card-title primary-title class="py-0">
                <span class="title">My Hobbies</span>
              </v-card-title>
              <v-card-text>
              </v-card-text>
            </v-card>
          </v-flex>

          <v-flex xs3 class="mx-2">
            <v-card class="elevation-5">
              <v-img
                :src="myData.avatarUrl"
                aspect-ratio="1"
              ></v-img>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>

      <v-flex xs12>
        <v-divider class="my-4"></v-divider>
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
        <v-divider class="my-4"></v-divider>
      </v-flex>

      <v-flex>
        <v-timeline
        >
          <v-timeline-item v-for="entry in myData.timeline" :color="entry.color || 'primary'">
            <span slot="opposite" class="subheading font-weight-medium">
              {{entry.dateFrom}} - {{entry.dateTo || 'Present'}}
            </span>
            <v-card :class="entry.color || 'primary'">
              <v-card-title primary-title>
                <span class="title">{{entry.name}}</span>&nbsp;@&nbsp;<small class="title font-weight-light">{{entry.companyName}}</small>
              </v-card-title>
              <v-card-text class="secondary">rgegwgwgwwrgwrg</v-card-text>
            </v-card>
          </v-timeline-item>
        </v-timeline>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import {API_HOST} from "../config/index";
import { BreedingRhombusSpinner } from 'epic-spinners'
import emojijs from "emoji-js";

const emoji = new emojijs();
emoji.img_set = 'google';
emoji.allow_native = false;
emoji.supports_css = false;
emoji.img_sets.google.path = 'https://unpkg.com/emoji-datasource-google@4.0.4/img/google/64/';
emoji.img_sets.google.sheet = 'https://unpkg.com/emoji-datasource-google@4.0.4/img/google/sheets-256/64.png';

const getFamilyDataURL = API_HOST + "/family";
export default {
  components: {
    "breeding-rhombus-spinner": BreedingRhombusSpinner
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
