<template>
  <div>
    <bar-chart :chart-data="datacollection" :options="options"/>
  </div>
</template>

<script>
import BarChart from './Charts/BarChart.js';
import Colors from '../../colors.js';

export default {
  components: {
    BarChart,
  },
  data() {
    return {
      datacollection: null,
      options: {
        legend: {
          display: false,
        },
        scales: {
          yAxes: [
            {
              ticks: {
                fontColor: Colors.grey.lighten2,
              },
              gridLines: {
                color: Colors.grey.darken2,
              },
            },
          ],
          xAxes: [
            {
              ticks: {
                fontColor: Colors.grey.lighten2,
              },
              gridLines: {
                color: Colors.grey.darken2,
              },
            },
          ],
        },
      },
    };
  },
  mounted() {
    this.fillData();
  },
  methods: {
    fillData() {
      this.datacollection = {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
          {
            label: 'February',
            data: [
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
            ],
            backgroundColor: Object.values(Colors).map(clr => clr.base),
          },
        ],
      };
    },
    getRandomInt() {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5;
    },
  },
};
</script>
