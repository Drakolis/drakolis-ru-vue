import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home";
import Family from "./views/Family";
import Budget from "./views/Budget";
import InfoNew from "./views/InfoNew";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/drakolis",
      name: "drakolis",
      component: InfoNew
    },
    {
      path: "/family",
      name: "family",
      component: Family
    },
    {
      path: "/budget",
      name: "budget",
      component: Budget
    },
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    }
  ]
});
