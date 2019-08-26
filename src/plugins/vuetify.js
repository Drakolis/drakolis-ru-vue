import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: true,
    options: {
      customProperties: true,
    },
    themes: {
      dark: {
        primaryOld: '#FF5600',
        secondary1Old: '#EC2039',
        secondary2Old: '#FF9700',
        complimentaryOld: '#00AA6E',

        dark: '#424242',
        darker: '#353535',
        darkest: '#212121',

        primary: '#C62828',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107',
      },
    },
  },
  icons: {
    iconfont: 'mdi',
  },
});
