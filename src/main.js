import Vue from 'vue';
import vuescroll from 'vue-scroll';
import vuetify from './plugins/vuetify';
import App from './App.vue';
import router from './router';
import store from './store';
import i18n from './i18n';
import Api from './api';
import './bus';
import './resource';
import './cookies';
import './registerServiceWorker';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import '@mdi/font/css/materialdesignicons.css';
import 'animate.css/animate.min.css';

// eslint-disable-next-line import/extensions
import 'typeface-share-tech-mono';
// eslint-disable-next-line import/extensions
import 'typeface-coda';
// eslint-disable-next-line import/extensions
import 'typeface-iceberg';
// eslint-disable-next-line import/extensions
import 'typeface-roboto-mono';

Vue.config.productionTip = false;

Vue.use(vuescroll, { debounce: 600 });
const app = new Vue({
  i18n,
  router,
  store,
  vuetify,
  render: h => h(App),
});

Vue.prototype.$api = Api(app);

app.$mount('#app');
