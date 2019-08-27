<template>
  <v-dialog v-model="open" max-width="500">
    <v-card v-if="account">
      <v-card-title :style="titleStyle">
        <h3>
          Are you shure you want to delete account:
          <b>'{{ this.account.name }}'?</b>
        </h3>
      </v-card-title>
      <v-card-text>
        This action cannot be undone. All operations data will be lost with this
        account. If accont is no longer usable use <b>'Close Account'</b> option
        instead.
      </v-card-text>
      <v-card-actions>
        <v-btn color="red darken-4" :loading="deleting" @click="confirm()">
          Delete
        </v-btn>
        <v-btn color="secondary" @click="cancel()">
          Cancel
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import Colors from '@/colors.js';
import { UI_EVENTS } from '@/bus.js';

export default {
  props: ['updateAccounts'],
  data() {
    return {
      account: null,
      deleting: false,
      open: false,
      titleStyle: {
        background: Colors.red.darken4,
      },
    };
  },
  mounted() {
    this.$bus.$on(UI_EVENTS.BUDGET.OPEN_DELETE_ACCOUNT, (account) => {
      this.open = true;
      this.account = account;
    });
  },
  methods: {
    cancel() {
      if (this.open) {
        this.open = false;
      }
    },
    confirm() {
      if (this.open && !this.deleting) {
        this.deleting = true;
        this.$api.budget.account.delete(this.account.id).then(() => this.updateAccounts()
          .then(() => {
            this.open = false;
          })
          .finally(() => {
            this.deleting = false;
          }));
      }
    },
  },
};
</script>
