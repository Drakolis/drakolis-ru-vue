<template>
  <vue-snotify />
</template>

<script>
import Vue from 'vue';
import Snotify, { SnotifyPosition } from 'vue-snotify';
import 'vue-snotify/styles/simple.css';

const options = {
  toast: {
    position: SnotifyPosition.leftTop,
  },
};

Vue.use(Snotify, options);

export default {};
</script>

<style>
.snotifyToast__title {
  font-size: 26px;
}
</style>
