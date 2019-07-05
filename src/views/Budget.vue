<template>
  <v-container style="height:100%">
    <v-layout
      wrap
      v-if="!pageLoaded"
    >
      <v-flex xs12 class="py-5">
        <breeding-rhombus-spinner style="margin: auto" :animation-duration="2000" :size="65" color="#00A8AB" />
      </v-flex>
    </v-layout>

    <v-layout
      justify-space-between
      row
      fill-height
      v-if="pageLoaded"
    >
      <v-flex xs7 class="pr-1">
        <v-layout
          justify-start
          column
        >
          <v-flex xs12 class="mb-2">

            <v-card>
              <v-card-text>
                <v-layout>
                  <v-flex><h2>Account</h2></v-flex>
                  <v-flex>
                    <account-selector
                      :selectedAccount="selectedAccount"
                      :accounts="accounts"
                      @selectValue="(val) => {selectedAccountId = val}"
                    />
                  </v-flex>
                </v-layout>
              </v-card-text>
            </v-card>
          </v-flex>
          <v-flex xs12 class="mb-2">

            <v-card>
              <v-card-actions>
                <v-btn flat color="green">
                  Add Income
                  <v-icon class="ml-2">add</v-icon>
                </v-btn>
                <v-btn flat color="orange">
                  Add Expense
                  <v-icon class="ml-2">remove</v-icon>
                </v-btn>
                <v-btn flat color="blue" v-if="multipleAccountsFeature">
                  Add Transfer
                  <v-icon class="ml-2">subdirectory_arrow_right</v-icon>
                </v-btn>
              </v-card-actions>
              <v-card-title primary-title class="py-1">
                <h2>Budget Table</h2>
              </v-card-title>

              <v-card-text>
                <h3 class="mb-2">
                  Expenses
                </h3>
                <v-data-table
                  :headers="headers"
                  :items="expenses"
                  class="elevation-1"
                  hide-actions
                >
                  <template slot="items" slot-scope="props">
                    <td>{{ props.item.name }}</td>
                    <td>{{ props.item.category }}</td>
                    <td>{{ formatTime(props.item.date) }}</td>
                    <td>{{ props.item.sum }}</td>
                  </template>
                </v-data-table>
              </v-card-text>

              <v-card-text>
                <h3 class="mb-2">
                  Income
                </h3>
                <v-data-table
                  :headers="headers"
                  :items="income"
                  class="elevation-1"
                  hide-actions
                >
                  <template slot="items" slot-scope="props">
                    <td>{{ props.item.name }}</td>
                    <td>{{ props.item.category }}</td>
                    <td>{{ formatTime(props.item.date) }}</td>
                    <td>{{ props.item.sum }}</td>
                  </template>
                </v-data-table>
              </v-card-text>
            </v-card>

          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs5 class="pl-1">
        <v-layout
          justify-start
          column
        >
          <v-flex xs12 class="mb-2">
            <v-card>
              <v-card-actions>
              </v-card-actions>
              <v-card-title primary-title class="py-1">
                <h2>Expenses Categories Graph</h2>
              </v-card-title>
              <v-card-text>
                <chart-demo/>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>

    </v-layout>
    <popups :updateAccounts="updateAccounts"/>
  </v-container>
</template>

<script>
import { BreedingRhombusSpinner } from "epic-spinners";
import ChartDemo from "../components/Budget/ChartDemo";
import AccountSelector from "../components/Budget/AccountSelector";
import Popups from "@/components/Budget/Popups";
import moment from "moment";

export default {
  components: {
    "breeding-rhombus-spinner": BreedingRhombusSpinner,
    "chart-demo": ChartDemo,
    "account-selector": AccountSelector,
    popups: Popups
  },
  data() {
    return {
      pageLoaded: false,
      pageError: null,

      accounts: null,
      operations: null,
      categories: null,

      selectedAccountId: 0,
      headers: [
        {
          value: "name",
          text: "Name"
        },
        {
          value: "category",
          text: "Category"
        },
        {
          value: "date",
          text: "Date"
        },
        {
          value: "sum",
          text: "Sum"
        }
      ]
    };
  },
  mounted() {
    Promise.all([this.updateAccounts(), this.updateCategories()]).then(() => {
      this.pageLoaded = true;
    });
  },
  methods: {
    updateAccounts() {
      return this.$api.budget.account.showAll().then(res => {
        this.accounts = res.body.data;
        this.selectedAccountId =
          this.selectedAccountId &&
          this.accounts.find(account => account.id === this.selectedAccountId)
            ? this.selectedAccountId
            : (this.accounts.length > 0
              ? this.accounts[0].id
              : 0);
        this.updateOperations();
      });
    },
    updateCategories() {
      return this.$api.budget.categories
        .showAll()
        .then(res => (this.categories = res.body.data));
    },
    updateOperations() {
      return this.$api.budget.account
        .showOperations(this.selectedAccountId)
        .then(res => (this.operations = res.body.data));
    },
    formatTime(time) {
      return moment(time).format("LLL");
    }
  },
  computed: {
    multipleAccountsFeature() {
      return (
        this.$store.state.features.multipleAccounts &&
        this.$store.state.features.multipleAccounts.enabled
      );
    },
    selectedAccount() {
      return (
        this.accounts &&
        this.accounts.find(acc => acc.id === this.selectedAccountId) || {}
      );
    },
    income() {
      return this.operations &&
        this.operations.length &&
        this.categories &&
        this.categories.length
        ? this.operations
            .map(op => {
              op.category = this.categories.find(
                cat => cat.id === op.categoryId
              );
              return op;
            })
            .filter(op => op.category.isIncome)
            .map(op => {
              return {
                name: op.name,
                category: op.category.name,
                date: op.date,
                sum: Math.abs(op.sum)
              };
            })
        : [];
    },
    expenses() {
      return this.operations &&
        this.operations.length &&
        this.categories &&
        this.categories.length
        ? this.operations
            .map(op => {
              op.category = this.categories.find(
                cat => cat.id === op.categoryId
              );
              return op;
            })
            .filter(op => !op.category.isIncome)
            .map(op => {
              return {
                name: op.name,
                category: op.category.name,
                date: op.date,
                sum: Math.abs(op.sum)
              };
            })
        : [];
    }
  }
};
</script>

<style>
ul.unstyled {
  list-style-type: none;
  padding-left: 4pt;
}

.v-icon.fa,
.v-icon.fab,
.v-icon.fal,
.v-icon.far,
.v-icon.fas {
  display: inherit;
}
</style>
