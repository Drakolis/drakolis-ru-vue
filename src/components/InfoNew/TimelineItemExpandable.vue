<template>
<v-timeline-item :color="entry.color || 'primary'">
  <span slot="opposite" class="subheading font-weight-medium">
    {{dates}}
  </span>
  <v-card :class="entry.color || 'primary'">
    <v-card-title primary-title :class="entry.color || 'primary'">
      <a
        class="text-xs-left white--text"
        @click="buttonClick"
      >
        <span class="title">
          <v-icon>{{buttonIcon}}</v-icon>
          {{entry.name}}
          <span class="title font-weight-light">
            <v-icon>mdi-at</v-icon>
            {{entry.company.name}}
            <small class="hidden-sm-and-up">({{dates}})</small>
          </span>
        </span>
      </a>
    </v-card-title>
    <transition name="accordion"
      v-on:before-enter="beforeEnter" v-on:enter="enter"
      v-on:before-leave="beforeLeave" v-on:leave="leave"
      v-if="isExpandable"
    >
      <v-card-text class="secondary accordion-body" v-if="open">
        <ul class="body-2" >
          <li v-for="point in entry.points">
            {{point}}
          </li>
        </ul>
      </v-card-text>
    </transition>
  </v-card>
</v-timeline-item>
</template>

<script>
export default {
  data() {
    return {
      open: false,
    }
  },
  props: ['entry'],
  methods: {
    buttonClick() {
      if(!this.isExpandable)
        return;
      this.open = !this.open;
    },
    // enter: function(el, done) {
    //   $(el).slideDown(150, done);
    // },
    // leave: function(el, done) {
    //   $(el).slideUp(150, done);
    // },
    beforeEnter: function(el) {
      el.style.height = '0';
    },
    enter: function(el) {
      el.style.height = (el.scrollHeight + 20) + 'px';
    },
    beforeLeave: function(el) {
      el.style.height = (el.scrollHeight + 20) + 'px';
    },
    leave: function(el) {
      el.style.height = '0';
    }
  },
  computed: {
    buttonIcon() {
      if(!this.isExpandable)
        return;
      return this.open ? 'remove' : 'add';
    },
    dates() {
      return `${this.entry.dateFrom} - ${this.entry.dateTo || 'Present'}`;
    },
    isExpandable() {
      return this.entry.points.length;
    }
  }
}
</script>

<style>
.accordion-body {
  transition: 100ms ease-out;
  overflow: hidden;
}
</style>

