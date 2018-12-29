<template>
<v-timeline-item :color="entry.color || 'primary'">
  <span slot="opposite" class="subheading font-weight-medium">
    {{entry.dateFrom}} - {{entry.dateTo || 'Present'}}
  </span>
  <v-card :class="entry.color || 'primary'">
    <v-toolbar primary-title :class="entry.color || 'primary'">
      <div><span class="title">{{entry.name}}</span>&nbsp;@&nbsp;<small class="title font-weight-light">{{entry.company.name}}</small></div>
      <v-spacer></v-spacer>
      <v-btn icon @click="buttonClick">
        <v-icon>{{buttonIcon}}</v-icon>
      </v-btn>
    </v-toolbar>
      <v-card-text class="secondary" v-if="open">
        <ul class="body-2" v-if="open">
          <li v-for="point in entry.points">
            {{point}}
          </li>
        </ul>
      </v-card-text>
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
</style>

