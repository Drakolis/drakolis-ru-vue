<template>
  <v-list class="pa-0" style="width: 100%">
    <v-list-tile avatar @click="() => {}">
      <v-list-tile-avatar>
        <v-avatar size="48" :color="avatarColor">
          <v-icon dark>
            {{ currencySymbol(account.currency) }}
          </v-icon>
        </v-avatar>
      </v-list-tile-avatar>

      <v-list-tile-content>
        <v-list-tile-title>
          {{ account.name }}
        </v-list-tile-title>
        <v-list-tile-sub-title>
          <span :style="summStyle">
            {{ (account.balance || 0).toFixed(2) }}
          </span>
        </v-list-tile-sub-title>
      </v-list-tile-content>

      <v-list-tile-action>
        <v-icon color="grey lighten-1">
          expand_more
        </v-icon>
      </v-list-tile-action>
    </v-list-tile>
  </v-list>
</template>

<script>
import Colors from '@/colors.js';

export default {
  props: ['account'],
  data() {
    return {
      avatarColor: Colors.cyan.darken2,
      summStyle: {
        color: Colors.grey.lighten3,
      },
      centsStyle: {
        color: Colors.grey.lighten1,
      },
    };
  },
  methods: {
    currencySymbol(currencyCode) {
      switch (currencyCode) {
        case 'USD':
          return 'mdi-currency-usd';
        case 'EUR':
          return 'mdi-currency-eur';
        case 'RUR':
          return 'mdi-currency-rub';
      }
    },
  },
};
</script>
