<template>
  <span v-html="emojify(emoji)"></span>
</template>

<script>
import emojijs from "emoji-js";

const emoji = new emojijs();
emoji.img_set = 'google';
emoji.allow_native = false;
emoji.supports_css = false;
emoji.img_sets.google.path = 'https://unpkg.com/emoji-datasource-google@4.0.4/img/google/64/';
emoji.img_sets.google.sheet = 'https://unpkg.com/emoji-datasource-google@4.0.4/img/google/sheets-256/64.png';

export default {
  props: ['emoji'],
  methods: {
    emojify(string) {
      return emoji.replace_colons(string)
    }
  }
}
</script>

<style>
.emoji {
  width: 32px;
  height: 32px;
  display: block;
}
</style>
=
