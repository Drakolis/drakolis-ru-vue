<template>
  <div>
    <delete-account-dialog :updateAccounts="updateAccounts"/>
    <edit-account-dialog  :updateAccounts="updateAccounts"/>
  </div>
</template>

<script>
import DeleteAccountDialog from "./DeleteAccountDialog";
import EditAccountDialog from "./EditAccountDialog";
import { UI_EVENTS } from "@/bus.js";

export default {
  components: {
    "delete-account-dialog": DeleteAccountDialog,
    "edit-account-dialog": EditAccountDialog
  },
  props: ["updateAccounts"],
  data() {
    return {};
  },
  mounted() {
    [
      UI_EVENTS.BUDGET.OPEN_EDIT_ACCOUNT,
      UI_EVENTS.BUDGET.OPEN_EDIT_OPERATION,
      UI_EVENTS.BUDGET.OPEN_DELETE_OPERATION
    ].forEach(event => {
      this.$bus.$on(event, accountId => {
        this.accountId = accountId;
        switch (event) {
          case UI_EVENTS.BUDGET.OPEN_EDIT_ACCOUNT:
            this.openEditAccountModal = true;
            break;
          case UI_EVENTS.BUDGET.OPEN_DELETE_ACCOUNT:
            this.openDeleteAccountModal = true;
            break;
        }
      });
    });
  }
};
</script>
