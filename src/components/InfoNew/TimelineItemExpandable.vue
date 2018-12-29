<template>
<v-timeline-item :color="entry.color || 'primary'">
  <span slot="opposite" class="subheading font-weight-medium">
    {{entry.dateFrom}} - {{entry.dateTo || 'Present'}}
  </span>
  <v-card :class="entry.color || 'primary'">
    <v-toolbar primary-title :class="entry.color || 'primary'">
      <div><span class="title">{{entry.name}} <span class="title font-weight-light"><v-icon>mdi-at</v-icon> {{entry.company.name}}</span></span></div>
      <v-spacer></v-spacer>
      <v-btn icon @click="buttonClick">
        <v-icon>{{buttonIcon}}</v-icon>
      </v-btn>
    </v-toolbar>
      <transition name="accordion"
        v-on:before-enter="beforeEnter" v-on:enter="enter"
        v-on:before-leave="beforeLeave" v-on:leave="leave"
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
      return this.open ? 'remove' : 'add';
    }
  }
}
</script>

<style>
.accordion-body {
  transition: 150ms ease-out;
  overflow: hidden;
}
</style>

