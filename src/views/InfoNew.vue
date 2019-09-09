<template>
  <v-container grid-list-xl>
    <v-layout column>
      <v-flex>
        <div class="text-center">
          <p :class="nameSizeClass + ' drakolis-font'">
            {{ myData.name }}
          </p>
          <small :class="'font-weight-light ' + titleSizeClass">{{
            myData.title
          }}</small>
        </div>
      </v-flex>

      <v-flex xs12>
        <v-divider />
      </v-flex>

      <v-flex>
        <v-layout wrap>
          <v-flex xs12 sm4>
            <v-layout column>
              <v-flex xs12>
                <v-card class="elevation-5">
                  <v-img :src="myData.photoUrl" aspect-ratio="1" />
                </v-card>
              </v-flex>
              <v-flex xs12>
                <v-card class="elevation-5">
                  <v-card-title primary-title class="pb-0">
                    <span class="title">About Me</span>
                  </v-card-title>
                  <v-card-text>
                    <v-list>
                      <v-list-item>
                        <v-list-item-icon>
                          <v-icon>event</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                          <v-list-item-title>
                            {{
                              myData.dateOfBirth
                            }}
                          </v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-icon>
                          <v-icon>location_on</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                          <v-list-item-title>
                            {{
                              myData.location
                            }}
                          </v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-icon>
                          <v-icon>mdi-gender-transgender</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                          <v-list-item-title>
                            {{
                              myData.sex
                            }}
                          </v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-icon>
                          <v-icon>mdi-human-male-female</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                          <v-list-item-title>
                            {{
                              myData.orientation
                            }}
                          </v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
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
                  <v-list-item v-for="lang in myData.languages" :key="lang[0]">
                    <v-list-item-icon>
                      <drakolis-emoji :emoji="lang[1]" />
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>{{ lang[0] }}</v-list-item-title>
                      <v-list-item-subtitle>{{ lang[2] }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card-text>
              <v-card-title primary-title class="py-0">
                <span class="title">I Have Experience In</span>
              </v-card-title>
              <v-card-text>
                <v-list>
                  <v-list-group
                    v-for="item in myData.skills"
                    :key="item[0]"
                    v-model="item[3]"
                    no-action
                  >
                    <v-list-item slot="activator">
                      <v-list-item-content>
                        <v-list-item-title>{{ item[0] }}</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>

                    <v-list-item v-for="subItem in item[2]" :key="subItem">
                      <v-list-item-content>
                        <v-list-item-title>{{ subItem }}</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
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
                  <v-list-item v-for="like in myData.likes" :key="like[0]">
                    <v-list-item-icon>
                      <drakolis-emoji :emoji="like[1]" />
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>{{ like[0] }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card-text>
              <v-card-title primary-title class="py-0">
                <span class="title">I Dislike</span>
              </v-card-title>
              <v-card-text>
                <v-list>
                  <v-list-item
                    v-for="dislike in myData.dislikes"
                    :key="dislike[0]"
                  >
                    <v-list-item-icon>
                      <drakolis-emoji :emoji="dislike[1]" />
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>{{ dislike[0] }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>

      <v-flex xs12>
        <v-divider />
      </v-flex>

      <v-flex>
        <v-layout wrap align-center justify-space-around>
          <template v-for="contact in myData.contacts">
            <v-flex :key="contact.type" shrink>
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-btn
                    fab
                    large
                    :color="getContactColor(contact.type)"
                    v-on="on"
                    @click="getContactOnClickAction(contact)"
                  >
                    <v-icon>{{ getContactIcon(contact.type) }}</v-icon>
                  </v-btn>
                </template>
                <span style="text-transform: capitalize;">{{
                  getContactTooltip(contact.type)
                }}</span>
              </v-tooltip>
            </v-flex>
          </template>
        </v-layout>
      </v-flex>

      <v-flex xs12>
        <v-divider />
      </v-flex>

      <v-flex v-if="lastFMSettings" xs12>
        <v-flex xs12 sm6>
          <last-fm
            :account="
              myData &&
                myData.apis &&
                myData.apis.find(i => i.type === 'lastfm').param"
          />
        </v-flex>
      </v-flex>

      <v-flex />
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import DrakolisEmoji from '@/components/DrakolisEmoji.vue';
import LastFM from '@/components/InfoNew/LastFM/index.vue';
import data from '@/mock/drakolis.json';

export default {
  components: {
    'drakolis-emoji': DrakolisEmoji,
    'last-fm': LastFM,
  },
  data() {
    return {
      myData: {},
    };
  },
  computed: {
    ...mapGetters(['lastFMSettings']),
    nameSizeClass() {
      return ['xs'].includes(this.$vuetify.breakpoint.name)
        ? 'my-3 display-4'
        : 'my-4 display-4';
    },
    titleSizeClass() {
      return ['xs'].includes(this.$vuetify.breakpoint.name)
        ? 'display-1'
        : 'display-2';
    },
  },
  mounted() {
    this.myData = data;
  },
  methods: {
    getContactOnClickAction({ url }) {
      if (url.indexOf('http') > -1) {
        window.open(url, '_blank');
        window.focus();
      } else {
        window.location.href = url;
      }
    },
    getContactIcon(type) {
      if (type === 'mail') return 'fas fa-envelope';
      return `fab fa-${type}`;
    },
    getContactColor(type) {
      switch (type) {
        case 'vk':
          return '#4a76a8';
        case 'facebook':
          return '#4267b2';
        case 'twitter':
          return '#1da1f2';
        case 'deviantart':
          return '#475c4d';
        case 'linkedin':
          return '#0073b1';
        case 'telegram':
          return '#5682a3';
        case 'skype':
          return '#1686d9';
        case 'github':
          return '#24292e';
        case 'whatsapp':
          return '#1ebea5';
        case 'mail':
          return '#00796B';
        case 'instagramm':
          return '#303030';
        case 'discord':
          return '#7289da';
        default:
          return 'secondary';
      }
    },
    getContactTooltip(type) {
      switch (type) {
        case 'linkedin':
          return 'Linked in';
        case 'vk':
          return 'VK';
        case 'github':
          return 'GitHub';
        default:
          return type;
      }
    },
  },
};
</script>
