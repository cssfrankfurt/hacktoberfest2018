import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home";
const Leaderboard = () => import("./views/Leaderboard");
const Resources = () => import("./views/Resources");

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/resources",
      name: "resources",
      component: Resources
    },
    {
      path: "/leaderboard",
      name: "leaderboard",
      component: Leaderboard
    }
  ]
});
