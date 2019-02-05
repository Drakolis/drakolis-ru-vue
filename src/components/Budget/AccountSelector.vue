<template>
  <v-list>
    <v-list-tile
      avatar
      @click=""
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

      <v-list-tile-action v-if="multipleAccountsFeature">
        <v-icon color="grey lighten-1">expand_more</v-icon>
      </v-list-tile-action>
    </v-list-tile>
  </v-list>
</template>

<script>
import Colors from '../../Colors.js';

const ALLOWED_CURRENCY = ['USD', 'EUR', 'RUR'];

export default {
  data() {
    return {
      avatarColor: Colors.grey.darken2,
      summStyle: {
        color: Colors.grey.lighten3
      },
      centsStyle: {
        color: Colors.grey.lighten1
      }
    };
  },
  props: ['selectedAccount'],
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
  },
  computed: {
    multipleAccountsFeature() {
      return this.$store.state.features.multipleAccounts
        && this.$store.state.features.multipleAccounts.enabled;
    }
  }
}
</script>
