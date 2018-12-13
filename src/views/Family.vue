<template>
  <v-container>
    <v-layout
      wrap
    >
      <v-flex xs12 class="py-5" v-if="!pageLoaded">
        <breeding-rhombus-spinner style="margin: auto" :animation-duration="2000" :size="65" color="#00A8AB" />
      </v-flex>
      <template v-for="person in personData">
        <v-flex xs3 :key="person.id + '_info'">
          <v-card>
            <v-img
              :src="person.photoUrl"
              aspect-ratio="1"
            ></v-img>
            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0">
                  {{person.name}}
                </h3>
                <div class="mt-2">
                  <ul class="unstyled">
                    <li>
                      <span class="font-weight-bold">DOB: </span>{{person.dateOfBirth}}
                    </li>
                    <li>
                      <span class="font-weight-bold">OCC: </span>{{person.occupation}}
                    </li>
                    <li>
                      <span class="font-weight-bold">ABT: </span>{{person.about}}
                    </li>
                  </ul>
                </div>
              </div>
            </v-card-title>

            <v-card-actions v-if="person.cvLanguages && person.cvLanguages.length > 0 && true">
              <v-btn flat color="primary" v-for="lang in person.cvLanguages" :key="lang+'_resume'">
                {{`Resume (${lang.toUpperCase()})`}}
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>

        <v-flex xs3 :key="person.id + '_contacts'" class="px-2">
          <template
            v-for="contact in person.contacts"
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
        </v-flex>

        <v-flex xs3 :key="person.id + '_lastfm'">
        </v-flex>

        <v-flex xs3 :key="person.id + '_empty'">
        </v-flex>

        <v-flex xs12 :key="person.id + '_divider'">
          <v-divider class="mt-4"></v-divider>
        </v-flex>
      </template>

    </v-layout>
  </v-container>
</template>

<script>
import {API_HOST} from "../config/index";
import { BreedingRhombusSpinner } from 'epic-spinners'

const getFamilyDataURL = API_HOST + "/family";
export default {
  components: {
    "breeding-rhombus-spinner": BreedingRhombusSpinner
  },
  data() {
    return {
      pageLoaded: false,
      pageError: null,
      personData: []
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
    }
  },
  mounted() {
    /*
    this.$http.get(getFamilyDataURL)
      .then(res => {
        this.personData = res.body.family;
        this.pageLoaded = true;
      })
      .catch(res => {
        this.pageError = res;
        this.pageLoaded = true;
      });
    */
    setTimeout(() => {
      this.personData = require('../mock').family;
      this.pageLoaded = true;
    }, 1000 + 2000 * Math.random());
  }
}
</script>

<style>
ul.unstyled {
  list-style-type: none;
  padding-left: 4pt;
}

.v-icon.fa, .v-icon.fab, .v-icon.fal, .v-icon.far, .v-icon.fas {
  display: inherit;
}
</style>
