import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import i18n from "./i18n";
import "./resource";
import "./registerServiceWorker";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "material-design-icons-iconfont/dist/material-design-icons.css";

Vue.config.productionTip = false;

new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount("#app");
