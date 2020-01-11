import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const guard = (to, from, next) => {
  if (sessionStorage.getItem("token")) {
    next();
  } else {
    sessionStorage.setItem("setNavigateToAfterSignin", to.fullPath);
    next("/login");
  }
};

const routes = [
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
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/play/:roomid",
    name: "play",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Play.vue"),
    beforeEnter: guard
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Login.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
