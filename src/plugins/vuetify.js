import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";

Vue.use(Vuetify, {
  theme: {
    primary: "#FF5600",
    secondary1: "#EC2039",
    secondary2: "#FF9700",
    complimentary: "#00AA6E",

    dark: "#424242",
    darker: "#353535",
    darkest: "#212121",

    accent: "#82B1FF",
    error: "#FF5252",
    info: "#2196F3",
    success: "#4CAF50",
    warning: "#FFC107"
  },
  customProperties: true,
  iconfont: "md"
});
