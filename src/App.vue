<template>
  <v-app dark>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span class="drakolis-font">Drakolis</span>
        <span class="font-weight-light">.RU</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-tooltip bottom>
        <v-btn flat slot="activator">
          <span class="mr-2">Login</span>
          <v-icon>input</v-icon>
        </v-btn>
        <span>Dragons Only!</span>
      </v-tooltip>
    </v-toolbar>

    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
      //
    }
  }
}
</script>

<style lang="scss">
.drakolis-font {
  font-family: 'Coda','Roboto',sans-serif !important;
}
.mono-font {
  font-family: 'Roboto Mono','Courier New', Courier, monospace !important;
}
.v-icon.fa, .v-icon.fab, .v-icon.fal, .v-icon.far, .v-icon.fas {
  display: inherit;
}
</style>
