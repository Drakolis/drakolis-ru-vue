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
            <v-card-actions>
            </v-card-actions>
              <v-card-title primary-title class="py-1">
                <h2>Current Budget</h2>
              </v-card-title>
              <v-card-text>
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
              </v-card-actions>
              <v-card-title primary-title class="py-1">
                <h2>Budget Table</h2>
              </v-card-title>

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
                    <td>{{ props.item.reason }}</td>
                    <td>{{ props.item.category }}</td>
                    <td>{{ props.item.owner }}</td>
                    <td>{{ props.item.currency }}</td>
                    <td>{{ props.item.date }}</td>
                    <td>{{ props.item.sum }}</td>
                  </template>
                </v-data-table>
              </v-card-text>

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
                    <td>{{ props.item.reason }}</td>
                    <td>{{ props.item.category }}</td>
                    <td>{{ props.item.owner }}</td>
                    <td>{{ props.item.currency }}</td>
                    <td>{{ props.item.date }}</td>
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
                <h2>Categories Graph</h2>
              </v-card-title>
              <v-card-text>
                <chart-demo/>
              </v-card-text>
            </v-card>
          </v-flex>
          <v-flex xs12 class="mb-2">
            <v-card>
              <v-card-actions>
              </v-card-actions>
              <v-card-title primary-title class="py-1">
                <h2>Income/Expenses Graph</h2>
              </v-card-title>
              <v-card-text>
              </v-card-text>
            </v-card>
          </v-flex>
          <v-flex xs12 class="mb-2">
            <v-card>
              <v-card-actions>
              </v-card-actions>
              <v-card-title primary-title class="py-1">
                <h2>Expenses Heatmap</h2>
              </v-card-title>
              <v-card-text>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
import {API_HOST} from "../config/index";
import { BreedingRhombusSpinner } from 'epic-spinners';
import ChartDemo from "../components/Budget/ChartDemo";

export default {
  components: {
    "breeding-rhombus-spinner": BreedingRhombusSpinner,
    "chart-demo": ChartDemo
  },
  data() {
    return {
      pageLoaded: false,
      pageError: null,
      headers: [
        {
          value: 'reason',
          text: 'Reason'
        },
        {
          value: 'category',
          text: 'Category'
        },
        {
          value: 'owner',
          text: 'Owner'
        },
        {
          value: 'currency',
          text: 'Currency'
        },
        {
          value: 'date',
          text: 'Date'
        },
        {
          value: 'sum',
          text: 'Sum'
        },
      ],
      income: [
        {
          reason: 'Testing',
          category: 'Test',
          owner: 'Tester',
          currency: 'EUR',
          date: 'Today',
          sum: 100,
        },
        {
          reason: 'Testing',
          category: 'Test',
          owner: 'Tester',
          currency: 'EUR',
          date: 'Today',
          sum: 100,
        }
      ],
      expenses: [
        {
          reason: 'Testing',
          category: 'Test',
          owner: 'Tester',
          currency: 'EUR',
          date: 'Today',
          sum: 100,
        },
        {
          reason: 'Testing',
          category: 'Test',
          owner: 'Tester',
          currency: 'EUR',
          date: 'Today',
          sum: 100,
        }
      ],
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
