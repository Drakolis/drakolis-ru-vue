<template>
  <transition name="fade-transition">
    <div class="fake-wrapper">
      <v-layout
        column
        justify-space-around
        fill-height
        align-center
        class="app-loader mt-4"
      >
        <v-flex xs12 class="app-loader-spinner elevation-4 pa-4">
          <span class="headline text-uppercase text-center">
            <span class="drakolis-font">Drakolis</span>
            <span class="font-weight-light">.PW</span>
          </span>
          <SemipolarSpinner
            :animation-duration="2000"
            :size="120"
            color="#C62828"
            style="margin: auto"
          />
          <span class="mt-4 text-center title">{{ $t("global.loading") }}</span>
        </v-flex>
      </v-layout>
    </div>
  </transition>
</template>

<script>
import { SemipolarSpinner } from 'epic-spinners';

export default {
  components: {
    SemipolarSpinner,
  },
  props:
    {
      appReady: {
        type: Boolean,
        default: false,
      },
    },
};
</script>

<style>
.fake-wrapper {
  height: 0;
}

.fake-wrapper .app-loader .app-loader-spinner {
  display: -ms-flexbox;
  display: flex;
  flex-direction: column;
  width: 250px;
  height: 300px;
  position: absolute;
  top: 35%;
}

.fake-wrapper .app-loader .app-loader-login {
  display: -ms-flexbox;
  display: flex;
  flex-direction: column;
  width: 250px;
  position: absolute;
  top: 34%;
}
</style>
