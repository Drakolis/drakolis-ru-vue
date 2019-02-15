<template>
  <v-card>
    <v-card-title>
      <h3>{{$t('global.auth.signIn')}}</h3>
    </v-card-title>
    <v-divider/>
    <v-card-text>
      <v-form>
        <v-text-field
          box
          v-model="login"
          browser-autocomplete="login"
          :label="$t('global.auth.login')"
        />
        <v-text-field
          box
          v-model="password"
          type="password"
          browser-autocomplete="password"
          :label="$t('global.auth.password')"
        />
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn flat @click="switchMethod">{{$t('global.cancel')}}</v-btn>
      <v-btn flat color="primary" @click="singInSubmit">{{$t('global.auth.signIn')}}</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      login: "",
      password: ""
    };
  },
  props: ['switchMethod'],
  methods: {
    singInSubmit() {
      this.$api.user.signIn(this.login, this.password);
      switchMethod();
    }
  }
};
</script>
