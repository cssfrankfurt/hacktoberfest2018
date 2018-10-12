import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home";
const Leaderboard = () => import("./views/Leaderboard");
const Resources = () => import("./views/Resources");
const CodeConduct = () => import("./views/CodeConduct");
const ReportGuideline = () => import("./views/ReportGuideline");

Vue.use(Router);

export default new Router({
  mode: "history",
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
    },
    {
      path: "/coc",
      name: "coc",
      component: CodeConduct
    },
    {
      path: "/rg",
      name: "rg",
      component: ReportGuideline
    }
  ]
});
