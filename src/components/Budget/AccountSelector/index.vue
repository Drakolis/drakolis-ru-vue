<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    style="width: 100%"
  >
    <selected-item
      slot="activator"
      :account="selectedAccount"
    />

    <v-card>
      <v-list class="pt-0">
        <list-item
          v-for="account in accountsSorted"
          :key="account.id"
          :account="account"
          @selectValue="onSelectAccount"
          @deleteValue="onDeleteAccount"
        />
        <v-divider class="mb-2"/>
        <list-item-new />
      </v-list>
    </v-card>

  </v-menu>
</template>

<script>
import SelectorSelectedItem from "./SelectorSelectedItem";
import SelectorItem from "./SelectorItem";
import SelectorItemNew from "./SelectorItemNew";
const ALLOWED_CURRENCY = ["USD", "EUR", "RUR"];

export default {
  data() {
    return {
      menu: false
    }
  },
  components: {
    'selected-item': SelectorSelectedItem,
    'list-item': SelectorItem,
    'list-item-new': SelectorItemNew
  },
  props: ["selectedAccount", "accounts"],
  methods: {
    onDeleteAccount() {
      this.menu = false;
    },
    onSelectAccount(accountId) {
      this.menu = false;
      this.$emit('selectValue', accountId);
    }
  },
  computed: {
    accountsSorted() {
      const ar = this.accounts.sort(
        (a, b) => (a.id === this.selectedAccount.id ? -1 : 1)
      );
      return ar;
    }
  },
  watch: {
    accounts: function(newVal, oldVal) {
      this.$forceUpdate();
    },
    selectedAccount: function(newVal, oldVal) {
      this.$forceUpdate();
    }
  }
};
</script>
