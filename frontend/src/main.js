import "@babel/polyfill";
import Vue from "vue";
import io from "socket.io-client";
import VueMq from "vue-mq";
import "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import store from "./store/store";

Vue.config.productionTip = false;

const socket = io("https://hacktoberfestffm.de");

socket.on("database update", function(data) {
  store.dispatch("api/UPDATE_USERS", data);
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
