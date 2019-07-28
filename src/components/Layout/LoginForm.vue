<template>
  <v-card>
    <v-card-title>
      {{$t('global.auth.signIn')}}
    </v-card-title>
    <v-divider/>
    <v-card-text>
      <v-form>
        <v-text-field
          filled
          v-model="login"
          autocomplete="login"
          :label="$t('global.auth.login')"
        />
        <v-text-field
          filled
          v-model="password"
          type="password"
          autocomplete="password"
          :label="$t('global.auth.password')"
        />
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn text @click="switchMethod">{{$t('global.cancel')}}</v-btn>
      <v-btn text color="primary" @click="singInSubmit">{{$t('global.auth.signIn')}}</v-btn>
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
  props: ["switchMethod"],
  methods: {
    singInSubmit() {
      this.$api.user.signIn(this.login, this.password);
      this.switchMethod();
    }
  }
};
</script>
