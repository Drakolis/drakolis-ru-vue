/* eslint-disable prettier/prettier */
import Vue from 'vue';
import Router from 'vue-router';
import Terminal from './components/HelloWorld.vue';
// import Family from "./views/Family";
import Budget from './views/Budget.vue';
import Error404 from './views/Error404.vue';
import Error403 from './views/Error403.vue';
import InfoNew from './views/InfoNew.vue';
import Messenger from './views/Messenger.vue';
import store from './store';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'drakolis',
      component: InfoNew,
    },
    {
      path: '/terminal',
      name: 'terminal',
      component: Terminal,
    },
    {
      path: '/messenger',
      name: 'messenger',
      component: Messenger,
    },
    {
      path: '/budget',
      name: 'budget',
      component: Budget,
      beforeEnter: (to, from, next) => {
        if (!store.getters.loggedIn) next('/403');
        else next();
      },
    },
    {
      path: '/403',
      name: '403',
      component: Error403,
    },
    {
      path: '/404',
      name: '404',
      component: Error404,
    },
    {
      path: '/*',
      name: 'lost',
      beforeEnter: (to, from, next) => {
        next('/404');
      },
    },
    // {
    //   path: "/about",
    //   name: "about",
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () =>
    //     import(/* webpackChunkName: "about" */ "./views/About.vue")
    // }
  ],
});
