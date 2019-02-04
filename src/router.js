import Vue from "vue";
import Router from "vue-router";
// import Home from "./views/Home";
// import Family from "./views/Family";
import Budget from "./views/Budget";
import Error404 from "./views/Error404";
import InfoNew from "./views/InfoNew";
import store from "./store.js";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "drakolis",
      component: InfoNew
    },
    {
      path: "/budget",
      name: "budget",
      component: () => {
        if (store.state.loggedIn) return import("./views/Budget");
        else return import("./views/Error404");
      }
    },
    {
      path: "/*",
      name: "404",
      component: InfoNew
    }
    // {
    //   path: "/about",
    //   name: "about",
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () =>
    //     import(/* webpackChunkName: "about" */ "./views/About.vue")
    // }
  ]
});
