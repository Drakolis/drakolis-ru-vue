<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    style="width: 100%"
  >
    <v-list
      slot="activator"
      class="pa-0"
      style="width: 100%"
    >
      <v-list-tile
        avatar
        @click="() => {}"
      >
        <v-list-tile-avatar>
          <v-avatar size="48" :color="avatarColor">
            <v-icon dark>{{currencySymbol(selectedAccount.currency)}}</v-icon>
          </v-avatar>
        </v-list-tile-avatar>

        <v-list-tile-content>
          <v-list-tile-title>
            {{selectedAccount.name}}
          </v-list-tile-title>
          <v-list-tile-sub-title>
            <span :style="summStyle">
              {{(selectedAccount.balance || 0).toFixed(2)}}
            </span>
          </v-list-tile-sub-title>
        </v-list-tile-content>

        <v-list-tile-action>
          <v-icon color="grey lighten-1">expand_more</v-icon>
        </v-list-tile-action>
      </v-list-tile>
    </v-list>

    <v-card>
      <v-list class="pt-0">
        <v-list-tile
          avatar
          @click="() => {}"
          v-for="account in accounts"
          :key="account.id"
          class="mb-2"
        >
          <v-list-tile-avatar>
            <v-avatar size="48" :color="avatarColor">
              <v-icon dark>{{currencySymbol(account.currency)}}</v-icon>
            </v-avatar>
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>
              {{account.name}}
            </v-list-tile-title>
            <v-list-tile-sub-title>
              <span :style="summStyle">
                {{(account.balance || 0).toFixed(2)}}
              </span>
            </v-list-tile-sub-title>
          </v-list-tile-content>

          <v-list-tile-action>
            <v-btn
              @click="() => {}"
              icon
              flat
              color="red"
            >
              <v-icon>delete</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      <v-divider class="mb-2"/>
        <v-list-tile
          avatar
          @click="() => {}"
        >
          <v-list-tile-avatar>
            <v-avatar size="48" color="green">
              <v-icon dark>add</v-icon>
            </v-avatar>
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>
              Add new account
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-card>

  </v-menu>
</template>

<script>
import Colors from '@/Colors.js';

const ALLOWED_CURRENCY = ['USD', 'EUR', 'RUR'];

export default {
  data() {
    return {
      menu: false,
      avatarColor: Colors.cyan.darken2,
      summStyle: {
        color: Colors.grey.lighten3
      },
      centsStyle: {
        color: Colors.grey.lighten1
      }
    };
  },
  props: ['selectedAccount', 'accounts'],
  methods: {
    currencySymbol(currencyCode) {
      switch(currencyCode) {
        case 'USD':
          return 'mdi-currency-usd';
        case 'EUR':
          return 'mdi-currency-eur';
        case 'RUR':
          return 'mdi-currency-rub';
      }
    }
  }
}
</script>
