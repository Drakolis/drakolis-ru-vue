<template>
  <v-timeline-item :color="entry.color || 'primary'">
    <span slot="opposite" class="subheading font-weight-medium">
      {{ dates }}
    </span>
    <v-card :class="entry.color || 'primary'">
      <v-card-title primary-title :class="`${entry.color || 'primary'} py-3`">
        <a class="text-xs-left white--text" @click="buttonClick">
          <span class="title">
            <v-icon>{{ buttonIcon }}</v-icon>
            {{ entry.name }}
            <span class="title font-weight-light">
              <v-icon>mdi-at</v-icon>
              {{ entry.company.name }}
              <small class="hidden-sm-and-up">({{ dates }})</small>
            </span>
          </span>
        </a>
      </v-card-title>
      <transition
        v-if="isExpandable"
        name="accordion"
        @before-enter="beforeEnter"
        @enter="enter"
        @before-leave="beforeLeave"
        @leave="leave"
      >
        <v-card-text v-if="open" class="secondary accordion-body">
          <ul class="body-2">
            <li v-for="point in entry.points" :key="point">
              {{ point }}
            </li>
          </ul>
        </v-card-text>
      </transition>
    </v-card>
  </v-timeline-item>
</template>

<script>
export default {
  props: {
    entry: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      open: false,
    };
  },
  computed: {
    buttonIcon() {
      if (!this.isExpandable) return false;
      return this.open ? 'remove' : 'add';
    },
    dates() {
      return `${this.entry.dateFrom} - ${this.entry.dateTo || 'Present'}`;
    },
    isExpandable() {
      return this.entry.points.length;
    },
  },
  methods: {
    buttonClick() {
      if (!this.isExpandable) return;
      this.open = !this.open;
    },
    // enter: function(el, done) {
    //   $(el).slideDown(150, done);
    // },
    // leave: function(el, done) {
    //   $(el).slideUp(150, done);
    // },
    beforeEnter(el) {
      // eslint-disable-next-line no-param-reassign
      el.style.height = '0';
    },
    enter(el) {
      // eslint-disable-next-line no-param-reassign
      el.style.height = `${el.scrollHeight + 20}px`;
    },
    beforeLeave(el) {
      // eslint-disable-next-line no-param-reassign
      el.style.height = `${el.scrollHeight + 20}px`;
    },
    leave(el) {
      // eslint-disable-next-line no-param-reassign
      el.style.height = '0';
    },
  },
};
</script>

<style>
.accordion-body {
  transition: 100ms ease-out;
  overflow: hidden;
}
</style>
