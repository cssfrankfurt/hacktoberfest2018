import "@babel/polyfill";
import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import io from "socket.io-client";

const env = process.env.NODE_ENV || "dev";
const rootURL =
  // env === 'dev' ? 'http://localhost:5000' : 'https://hacktoberfestffm.de';
  env === "dev"
    ? "http://localhost:5000"
    : "https://hacktoberfest-frankfurt.herokuapp.com";

Vue.config.productionTip = false;

const socket = io(rootURL);

socket.on("database update", function(data) {
  console.log(data);
import VueMq from "vue-mq";

Vue.config.productionTip = false;

Vue.use(VueMq, {
  breakpoints: {
    xs: 700,
    lg: Infinity
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
