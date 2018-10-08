import "@babel/polyfill";
import Vue from "vue";
import io from "socket.io-client";
import VueMq from "vue-mq";
import "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import store from "./store/store";

const env = process.env.NODE_ENV || "dev";
const rootURL =
  // env === 'dev' ? 'http://localhost:5000' : 'https://hacktoberfestffm.de';
  env === "dev"
    ? "http://localhost:5000"
    : "https://hacktoberfest-frankfurt.herokuapp.com";

Vue.config.productionTip = false;

const socket = io(rootURL);

socket.on("database update", function(data) {
  // eslint-disable-next-line
  console.log(data);
});

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
