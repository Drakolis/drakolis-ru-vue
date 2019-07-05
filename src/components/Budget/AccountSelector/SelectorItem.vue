<template>
  <v-list-tile
    avatar
    @click="selectAccount(account.id)"
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
      @click="deleteAccount(account)"
      icon
      flat
      color="red darken-3"
    >
      <v-icon>delete</v-icon>
    </v-btn>
  </v-list-tile-action>
</v-list-tile>
</template>

<script>
import { UI_EVENTS } from "@/bus.js";
import Colors from "@/Colors.js";

export default {
  data() {
    return {
      avatarColor: Colors.cyan.darken2,
      summStyle: {
        color: Colors.grey.lighten3
      },
      centsStyle: {
        color: Colors.grey.lighten1
      }
    }
  },
  props: ['account'],
  methods: {
    currencySymbol(currencyCode) {
      switch (currencyCode) {
        case "USD":
          return "mdi-currency-usd";
        case "EUR":
          return "mdi-currency-eur";
        case "RUR":
          return "mdi-currency-rub";
      }
    },
    deleteAccount(account) {
      this.$bus.$emit(UI_EVENTS.BUDGET.OPEN_DELETE_ACCOUNT, account);
    },
    selectAccount(accountId) {
      this.$emit('selectValue', accountId);
    }
  },
}
</script>
